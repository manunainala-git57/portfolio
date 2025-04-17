import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../css/Contact.css';

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    const name = form.current.user_name.value;
    const message = form.current.message.value;
    const time = new Date().toLocaleString();
    
    // Sending the email using EmailJS
    emailjs.sendForm(
      'service_ifu2ywo',     // Replace with your Service ID
      'template_2k61ozg',    // Replace with your Template ID
      form.current,          // The form data
      'qXScERzUWXrJ-bO1L'      // Replace with your Public Key
    )
    .then(() => {
      setSuccess(true); // Show success message if the email is sent
      form.current.reset(); // Reset the form after sending
    }, (error) => {
      console.log('FAILED...', error.text);
      setSuccess(false);
    });
  };

  return (
    <div className="contact-container" id="contact">
      <h2>Contact With Me</h2>
      <p>If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.</p>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
        ></textarea>
        <button type="submit">Send Message</button>
        {success && <p className="success-message">Thanks! Message sent ✅</p>}
      </form>
    </div>
  );
};

export default Contact;
