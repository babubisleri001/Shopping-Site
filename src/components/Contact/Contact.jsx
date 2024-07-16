import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.scss';

const Contact = () => {
  const [form, setForm] = useState({
    from_name: '',
    user_email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form data:', form); 

    emailjs.send('service_ab0ncrk', 'template_wrhighr', form, 'user_token')
      .then((result) => {
        alert('Message sent successfully!');
        setForm({
          from_name: '',
          user_email: '',
          phoneNumber: '',
          message: '',
        });
      }, (error) => {
        console.error(error.text);
        alert('Oops! Something went wrong. Please try again later.');
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <div className='title'>Get in Touch</div>
        <h1>Convey Your Ideas to Us</h1>
        <p>
          Contact us for questions,hiring , technical assistance, or collaboration
          opportunities via the contact information provided.
        </p>
        <div className="contact-details">
          <div className="contact-detail">
            <span role="img" aria-label="phone">📞</span>
            <a href="tel:+919660673731">+91 96606 73731</a>
          </div>
          <div className="contact-detail">
            <span role="img" aria-label="email">✉️</span>
            <a href="mailto:hello@reallygreatsite.com">nikhil@rookus.in</a>
          </div>
          <div className="contact-detail">
          </div>
        </div>
        <div className="social-media-buttons">
          <a
            href="https://api.whatsapp.com/send?phone=919660673731"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
           WhatsApp
          </a>
          <a
            href="https://www.instagram.com/rookus.in"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/rookus-in/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-button"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="from_name"
              value={form.from_name}
              onChange={handleChange}
              required
            />
            <span className="input-border"></span>
          </label>
          <label>
            Email
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              required
            />
            <span className="input-border"></span>
          </label>
          <label>
            Phone Number
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <span className="input-border"></span>
          </label>
          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="6"
            />
            <span className="input-border"></span>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
