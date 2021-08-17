export interface IUserModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export interface IUserFormProps {
  onOk: () => void;
}
export interface IUserForm {
  name: string;
  email: string;
  confirmEmail: string;
}

export interface IUserFormParams {
  name: string;
  email: string;
}

export interface ISuccessModalProps {
  visible: boolean;
  onOk: () => void;
}
