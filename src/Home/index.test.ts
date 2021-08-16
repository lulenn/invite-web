// import 'jest';
// import React from 'react';
// import { act } from 'react-dom/test-utils';
// import { render, mount } from 'enzyme';
// import { Button, Form, Modal } from 'antd';
// import UserModal from './components/UserModal/index';

// const sleep = async (timeout = 0) => await act(() => new Promise(resolve => setTimeout(resolve, timeout)));

// jest.mock('../api', () => {
//   function postUserForm(data: { name: string; email: string }): Promise<string> {
//     if (data.email === 'usedemail@airwallex.com') {
//       return Promise.reject({
//         status: 400,
//         message: 'Bad request'
//       });
//     }

//     return Promise.resolve('success');
//   }
//   return {
//     postUserForm
//   };
// });

// describe('Page: invite', () => {
//   Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: jest.fn().mockImplementation(query => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // deprecated
//       removeListener: jest.fn(), // deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn()
//     }))
//   });

//   it('renders correctly', () => {
//     const container = render(<Index />);
//     expect(container).toMatchSnapshot();
//   });

//   it('should show a modal form that contains name and email when click invite button ', () => {
//     const container = mount(<Index />);

//     const preModal = container.find(UserModal).at(0);
//     expect(preModal.props().visible).toBe(false);
//     expect(preModal.find(Form.Item).length).toBe(0);

//     container.find(Button).simulate('click');

//     const afterModal = container.find(UserModal).at(0);
//     const formItems = afterModal.find(Form.Item);
//     expect(afterModal.props().visible).toBe(true);
//     expect(formItems.length).toBe(4);
//     expect(formItems.at(0).props().name).toBe('name');
//     expect(formItems.at(1).props().name).toBe('email');
//     expect(formItems.at(2).props().name).toBe('confirmEmail');
//   });

//   it('client should validate correctly', async () => {
//     const container = mount(<Index />);
//     container.find(Button).simulate('click');

//     const asyncJudge = async (exec: Function) =>
//       await act(
//         () =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               container.update();
//               exec();
//               resolve();
//             }, 50);
//           })
//       );

//     const getErrorDom = () => container.find(UserModal).at(0).find('.ant-form-item-explain');

//     // name长度需大于3
//     const nameInput = container.find(UserModal).at(0).find('input').at(0);
//     nameInput.simulate('change', { target: { value: 'x' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().text()).toBe('The length must be greater than 3!');
//     });
//     nameInput.simulate('change', { target: { value: 'xxx' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().length).toBe(0);
//     });

//     // email必须为邮箱格式
//     const emailInput = container.find(UserModal).at(0).find('input').at(1);
//     emailInput.simulate('change', { target: { value: 'xxwade' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().text()).toBe("'email' is not a valid email");
//     });
//     emailInput.simulate('change', { target: { value: 'xxwade@163.com' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().length).toBe(0);
//     });

//     // confirmEmail 必须和email相同
//     const confirmEmailInput = container.find(UserModal).at(0).find('input').at(2);
//     confirmEmailInput.simulate('change', { target: { value: 'xxwade2@163.com' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().text()).toBe('The two emails do not match!');
//     });
//     confirmEmailInput.simulate('change', { target: { value: 'xxwade@163.com' } });
//     await asyncJudge(() => {
//       expect(getErrorDom().length).toBe(0);
//     });
//   });

//   it('submit data', async () => {
//     const container = mount(<UserModal visible={true} onOk={() => {}} onCancel={() => {}} />);

//     container
//       .find('input')
//       .at(0)
//       .simulate('change', { target: { value: 'xuxin' } });
//     container
//       .find('input')
//       .at(1)
//       .simulate('change', { target: { value: 'usedemail@airwallex.com' } });
//     container
//       .find('input')
//       .at(2)
//       .simulate('change', { target: { value: 'usedemail@airwallex.com' } });
//     expect(container.find('.ant-form-item-explain').length).toBe(0);
//     container.find(Button).simulate('submit');
//     await sleep(50);
//     expect(container.find('.error-message').text()).toBe('unAuthed');

//     container
//       .find('input')
//       .at(1)
//       .simulate('change', { target: { value: 'xxwade@163.com' } });
//     container
//       .find('input')
//       .at(2)
//       .simulate('change', { target: { value: 'xxwade@163.com' } });
//     container.find(Button).simulate('submit');
//     await sleep(50);
//     container.update();
//     expect(container.find('.error-message').text()).toBe('');
//     expect(container.find(Modal).at(1).props().visible).toBe(true);
//     container.find(Modal).at(1).find(Button).simulate('click');
//     expect(container.find(Modal).at(1).props().visible).toBe(false);
//   });
// });
