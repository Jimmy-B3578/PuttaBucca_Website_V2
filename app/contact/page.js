'use client';

import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [showPrefillHint, setShowPrefillHint] = useState(false);

  useEffect(() => {
    // --- Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const handleFormSubmit = (event) => {
      event.preventDefault();
      // Here you would typically send the form data to a server
      alert('Thank you for your message! We will get back to you shortly.');
      contactForm.reset();
    };
    contactForm.addEventListener('submit', handleFormSubmit);

    // Cleanup function to remove event listeners
    return () => {
      contactForm.removeEventListener('submit', handleFormSubmit);
    };
  }, []);

  useEffect(() => {
    // Prefill from query params (no useSearchParams to avoid Suspense requirement)
    if (typeof window === 'undefined') return;
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    const nameField = document.getElementById('name');
    const sp = new URLSearchParams(window.location.search);
    const subject = sp.get('subject');
    const message = sp.get('message');
    if (subjectField && subject) subjectField.value = subject;
    if (messageField && message) messageField.value = message;
    if (subject || message) {
      setShowPrefillHint(true);
      if (nameField) nameField.focus();
    }
  }, []);

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We're here to help with all your landscaping supply needs.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-details-map">
              <h3>Contact Information</h3>
              <ul className="contact-list">
                <li><span className="icon">&#x1F4CD;</span><div><strong>Address:</strong><br />19 Industrial Ave, Mudgee NSW 2850</div></li>
                <li><span className="icon">&#x260E;</span><div><strong>Phone:</strong><br />0419 669 003</div></li>
                <li><span className="icon">&#x2709;</span><div><strong>Email:</strong><br />sales@puttabucca.com.au</div></li>
                <li><span className="icon">&#x1F551;</span><div><strong>Hours:</strong><br />Mon - Fri: 7am - 4pm<br />Sat: 8am - 1pm</div></li>
              </ul>
              <h3>Our Location</h3>
              <div className="google-map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.234567890123!2d149.5859!3d-32.5998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b0e1f3b2c3d4e3d%3A0x1c0609b7b2d5a3e0!2s19%20Industrial%20Ave%2C%20Mudgee%20NSW%202850!5e0!3m2!1sen!2sau!4v1620000000000!5m2!1sen!2sau" allowFullScreen loading="lazy"></iframe>
              </div>
            </div>
            <div className="contact-form-container">
              <h3>Send Us a Message</h3>
              {showPrefillHint && (
                <div className="prefill-hint">
                  We’ve prefilled your quote details below. Please enter your name, email, and phone number so we can get back to you.
                </div>
              )}
              <form id="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="6" required></textarea>
                </div>
                <button type="submit" className="cta-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 