import { useState, useCallback } from 'react';
import { Button } from 'antd';
import UserModal from '../../components/UserModal';
import './index.less';
import SuccessModal from '../../components/SuccessModal';

function Home(): JSX.Element {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const openUserModal = useCallback(() => {
    setUserModalVisible(true);
  }, []);
  const handleOk = useCallback(() => {
    setUserModalVisible(false);
    setSuccessModalVisible(true);
  }, []);
  const handleCancel = useCallback(() => {
    setUserModalVisible(false);
  }, []);
  const handleSuccess = useCallback(() => {
    setSuccessModalVisible(false);
  }, []);

  return (
    <div className="Home">
      <div className="Content">
        <p className="text-main">
          A better way <br /> to enjoy every day.
        </p>
        <p className="text-hint">Be the first to know when we launch.</p>
        <Button onClick={openUserModal}>Request an invite</Button>
      </div>

      <UserModal data-testid="user-madal" visible={userModalVisible} onOk={handleOk} onCancel={handleCancel} />
      <SuccessModal data-testid="success-madal" visible={successModalVisible} onOk={handleSuccess} />
    </div>
  );
}

export default Home;
