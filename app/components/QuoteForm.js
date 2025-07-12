'use client';

const QuoteForm = ({ product, onClose }) => {
  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here,
    // e.g., send the data to an API endpoint.
    console.log('Form submitted for', product.name);
    onClose(); // Close the form after submission
  };

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
          <div className="form-group-inline">
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input type="text" id="quantity" name="quantity" required />
            </div>
            <div className="form-group">
                <label htmlFor="unit">Unit</label>
                <input type="text" id="unit" name="unit" value={product.unit.replace('per ', '')} readOnly />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>
          <button type="submit" className="cta-button">Submit Quote Request</button>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm; 