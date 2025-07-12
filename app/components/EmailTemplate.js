import React from 'react';

export const EmailTemplate = ({ name, email, phone, quantity, unit, productName, message }) => (
  <div style={{ fontFamily: 'sans-serif', fontSize: '16px', color: '#333' }}>
    <h1 style={{ color: '#2e7d32' }}>New Quote Request for {productName}</h1>
    <p>You have received a new quote request from the website. Here are the details:</p>
    <hr />
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li style={{ marginBottom: '10px' }}><strong>Product:</strong> {productName}</li>
      <li style={{ marginBottom: '10px' }}><strong>Quantity:</strong> {quantity} {unit}</li>
      <li style={{ marginBottom: '10px' }}><strong>Customer Name:</strong> {name}</li>
      <li style={{ marginBottom: '10px' }}><strong>Customer Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
      {phone && <li style={{ marginBottom: '10px' }}><strong>Customer Phone:</strong> {phone}</li>}
    </ul>
    {message && (
      <>
        <h3>Message:</h3>
        <p style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
          {message}
        </p>
      </>
    )}
    <hr />
    <p style={{ fontSize: '12px', color: '#888' }}>This email was sent from the quote request form on your website.</p>
  </div>
); 