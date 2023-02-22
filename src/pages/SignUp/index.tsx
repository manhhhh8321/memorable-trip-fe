import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styles from './style.module.scss';
import { Card, Input, Button, Form, Row, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { signUp } from 'api/authentication';
import { handleErrorMessage } from 'helper';

export default function SignUp() {
  const history = useHistory();
  const { t } = useTranslation();

  const navigateToLogIn = () => history.push('/login');

  const handleSubmit = async (payload: any) => {
    const params = _.pick(payload, ['email', 'password', 'passwordConfirm', 'firstName', 'lastName', 'gender', 'phone']);

    try {
      const response = await signUp(params);

      if (response) {
        navigateToLogIn()
      }
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <Card bordered className={styles.signUpForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>Sign up</h2>
          </Row>
          <Form.Item
            label="Enter your email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Enter your first name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter your first name',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Enter your last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please enter your last name',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

         
          <Form.Item
            label='Select your gender'
            name="gender"
            rules={[
              {
                required: true,
                message: 'Select your gender',
              }
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Radio.Group>
              <Radio name='gender' value={ "male"}>Male</Radio>
              <Radio name='gender' value={"female"}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Enter your phone number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please enter your phone number',
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: t('validate.passwordRequired') }]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="passwordConfirm"
            rules={[{ required: true, message: t('validate.passwordRequired') }]}
            dependencies={['password']}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="dashed" htmlType="button" onClick={navigateToLogIn}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
