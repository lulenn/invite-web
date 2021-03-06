import { APP_TITLE } from '../../constant';
import { Modal, Button } from 'antd';
import './index.less';

export interface ISuccessModalProps {
  visible: boolean;
  onOk: () => void;
}

function SuccessModal(props: ISuccessModalProps): JSX.Element {
  const { visible, onOk } = props;

  return (
    <Modal visible={visible} footer={null} closable={false} getContainer={false}>
      <div className="modal-title">All done!</div>
      <div className="success-message">
        You will be one of the first to experience <br />
        {APP_TITLE} when we launch.
      </div>
      <Button className="btn" onClick={onOk}>
        Ok
      </Button>
    </Modal>
  );
}

export default SuccessModal;
