'use client';

import { useState } from 'react';

const QuoteForm = ({ product, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
  const [submissionMessage, setSubmissionMessage] = useState('');

  if (!product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setSubmissionMessage('');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      quantity: formData.get('quantity'),
      unit: formData.get('unit'),
      productName: product.name,
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong on the server.');
      }
      
      setSubmissionStatus('success');
      setSubmissionMessage('Your quote request has been sent successfully! We will get back to you shortly.');

    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
        <div className="quote-form-overlay" onClick={onClose}>
            <div className="quote-form-container" onClick={(e) => e.stopPropagation()}>
                <div className="quote-form-header">
                    <h2>Success!</h2>
                    <button className="quote-close-btn" onClick={onClose}>&times;</button>
                </div>
                <p className="success-message">{submissionMessage}</p>
                <button onClick={onClose} className="cta-button">Close</button>
            </div>
        </div>
    );
  }

  return (
    <div className="quote-form-overlay" onClick={onClose}>
      <div className="quote-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="quote-form-header">
          <h2>Request a Quote: {product.name}</h2>
          <button className="quote-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="quote-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required disabled={isSubmitting} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input type="tel" id="phone" name="phone" disabled={isSubmitting} />
          </div>
          <div className="form-group-inline">
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="text" id="quantity" name="quantity" required disabled={isSubmitting} />
            </div>
            <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" value={product.unit.replace('per ', '')} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea id="message" name="message" rows="4" disabled={isSubmitting}></textarea>
          </div>
          <button type="submit" className="cta-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
          </button>
          {submissionStatus === 'error' && (
            <p className="error-message">{submissionMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteForm; 