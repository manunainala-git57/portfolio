import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { ThemeContext } from 'styled-components';
import '../css/Contact.css'; // Still usable for extra classes if needed

const Contact = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const theme = useContext(ThemeContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ifu2ywo',
      'template_2k61ozg',
      form.current,
      'qXScERzUWXrJ-bO1L'
    ).then(() => {
      setSuccess(true);
      form.current.reset();
    }, (error) => {
      console.error('FAILED...', error.text);
      setSuccess(false);
    });
  };

  return (
    <section
      id="contact"
      className="section contact-section"
      style={{
        backgroundColor: theme.bodyBackground,
        color: theme.textColor,
        padding: '80px 20px',
      }}
    >
      <div className="container" data-aos="fade-up" data-aos-duration="800">
        <h2 className="text-center mb-4">Contact With Me</h2>
        <p className="text-center mb-5" style={{ maxWidth: '700px', margin: 'auto' }}>
          If you have any questions or collaboration ideas, feel free to reach out! I'm open to internships or full-time opportunities.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="contact-form mx-auto"
          style={{ maxWidth: 600 }}
        >
          <div className="mb-3" data-aos="fade-right" data-aos-delay="200">
            <input
              type="text"
              name="user_name"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-3" data-aos="fade-left" data-aos-delay="300">
            <input
              type="email"
              name="user_email"
              className="form-control"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-3" data-aos="fade-up" data-aos-delay="400">
            <textarea
              name="message"
              rows="5"
              className="form-control"
              placeholder="Your Message"
              required
            />
          </div>

          <div className="text-center" data-aos="zoom-in" data-aos-delay="500">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: theme.textColor,
                border: `2px solid ${theme.textColor}`,
                padding: '10px 30px',
                borderRadius: '6px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.textColor;
                e.target.style.color = theme.bodyBackground;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = theme.textColor;
              }}
            >
              Send Message
            </button>
          </div>

          {success && (
            <p className="text-success text-center mt-3" data-aos="fade-in">
              ✅ Thanks! Message sent successfully.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
