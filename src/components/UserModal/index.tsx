import { useCallback, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { IUserForm, IUserModalProps } from '../../interface';
import './index.less';
import { postUserForm } from '../../api';

const FormItem = Form.Item;

function UserModal(props: IUserModalProps): JSX.Element {
  const { visible, onOk, onCancel } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [form] = Form.useForm<IUserForm>();

  const onFinish = () => {
    const data = form.getFieldsValue();
    const { name, email } = data;
    setLoading(true);
    // request api
    postUserForm({ name, email })
      .then(x => {
        form.resetFields();
        onOk();
      })
      .catch((e: Error) => {
        console.log(e);
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
        setError('');
      });
  };

  const onValuesChange = useCallback(() => {
    setError('');
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onCancel();
  }, [onCancel]);

  return (
    <Modal visible={visible} onCancel={handleCancel} footer={null} closable={false}>
      <div className="modal-title">Request an invite</div>

      <Form name="userForm" form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
        <FormItem
          name="name"
          rules={[
            {
              required: true,
              message: 'Full name is required!'
            },
            {
              min: 3,
              message: 'Full name needs to be at least 3 characters long!'
            }
          ]}
        >
          <Input placeholder="Full name" />
        </FormItem>

        <FormItem
          name="email"
          validateFirst={false}
          rules={[
            { required: true, message: 'Email is required!' },
            {
              type: 'email',
              message: 'Email is not in a validation email format!'
            }
          ]}
        >
          <Input placeholder="Email" />
        </FormItem>

        <FormItem
          name="confirmEmail"
          validateFirst={false}
          rules={[
            { required: true, message: 'Confirm email is required!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('email') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The confirm email does not match the email!');
              }
            })
          ]}
        >
          <Input placeholder="Confirm email" />
        </FormItem>

        <FormItem>
          <Button className="submit-btn" htmlType="submit" disabled={loading}>
            {loading ? 'Sending, please wait...' : 'Send'}
          </Button>
          <div className="error">{error || ''}</div>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default UserModal;
