import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/ContactForm.css';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted:', data);
    alert('Message sent successfully!');
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Contact Us</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <p className="error">{errors.message.message}</p>}
      </div>

      <button type="submit">Send</button>

      {isSubmitSuccessful && <p className="success">Thank you for contacting us!</p>}
    </form>
  );
};

export default ContactForm;
