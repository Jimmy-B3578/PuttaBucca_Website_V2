export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-fade-in-down">Your Trusted Partner for Quality Landscape Supplies</h1>
          <p className="animate-fade-in-up">From decorative stones to quality soils, we have everything you need for your next landscaping project.</p>
          <a href="/products" className="cta-button animate-fade-in-up">Calculate Your Project Needs</a>
        </div>
      </section>

      <section id="why-choose-us" className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">&#x1F46A;</div>
            <h3>Family Owned & Operated</h3>
            <p>We are a family-owned business with over 20 years of experience, dedicated to serving the Mudgee region.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">&#x1F33F;</div>
            <h3>Quality Products</h3>
            <p>We source and supply an extensive range of high-quality landscaping and building materials for any project size.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">&#x1F4AC;</div>
            <h3>Expert Advice</h3>
            <p>Our knowledgeable team is always ready to provide professional advice to help you select the right materials.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonial-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonial-card">
            <p>"The team at Putta Bucca Landscapes were incredibly helpful. Their advice on which gravel to use for my driveway was spot-on, and the delivery was fast and professional. Highly recommend!"</p>
            <cite>- John D., Mudgee</cite>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Use our handy online calculator to estimate the materials and costs for your landscaping needs.</p>
          <a href="/products" className="cta-button">View Our Products</a>
        </div>
      </section>
    </>
  );
} 