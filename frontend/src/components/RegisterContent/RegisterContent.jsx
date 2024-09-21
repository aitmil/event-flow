import { Form, Input, DatePicker, Radio, Button, message } from 'antd';
import moment from 'moment';
import { registerParticipant } from '../../api';
import styles from './RegisterContent.module.css';

const RegisterContent = ({ eventId }) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      await registerParticipant(eventId, values);
      form.resetFields();
      message.success('Registration successful!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error(error.response.data.data);
      } else {
        message.error('Registration failed! Please try again.');
      }
    }
  };

  const validateDateOfBirth = date => {
    if (!date || date.isAfter(moment().subtract(18, 'years'))) {
      return Promise.reject(new Error('You must be at least 18 years old'));
    }
    if (date.isAfter(moment())) {
      return Promise.reject(new Error('Date of birth cannot be in the future'));
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      className={styles.formContainer}
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          { required: true, message: 'Full name is required' },
          { min: 3, message: 'Full name must be at least 3 characters long' },
          { max: 50, message: 'Full name cannot exceed 50 characters' },
        ]}
      >
        <Input placeholder="Enter full name" size="large" />
      </Form.Item>

      <Form.Item
        className={styles.input}
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input placeholder="Enter valid email" size="large" />
      </Form.Item>

      <Form.Item
        className={styles.input}
        label="Date of Birth"
        name="dateOfBirth"
        rules={[
          { required: true, message: 'Date of birth is required' },
          { validator: (_, value) => validateDateOfBirth(value) },
        ]}
      >
        <DatePicker style={{ width: '100%' }} size="large" />
      </Form.Item>

      <Form.Item
        className={styles.input}
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

      <Form.Item className={styles.btn}>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterContent;
