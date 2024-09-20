import React from 'react';
import { Form, Input, DatePicker, Radio, Button, message } from 'antd';
import { registerParticipant } from '../../api';
import styles from './RegisterContent.module.css';

const RegisterContent = ({ eventId }) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      await registerParticipant(eventId, values);
      form.resetFields();
      message.success('Registration successful!');
    } catch {
      message.error('Registration failed! Please try again.');
    }
  };

  return (
    <Form
      form={form}
      className={styles.formContainer}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Full name is required' }]}
      >
        <Input placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Date of birth is required' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Where did you hear about this event?"
        name="source"
        rules={[{ required: true, message: 'Source is required' }]}
      >
        <Radio.Group>
          <Radio value="Social Media">Social Media</Radio>
          <Radio value="Friends">Friends</Radio>
          <Radio value="Found By Myself">Found By Myself</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterContent;
