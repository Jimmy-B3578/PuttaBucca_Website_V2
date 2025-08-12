export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Delivering comprehensive solutions to bring your landscaping vision to life, from bulk supplies to expert advice.</p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="icon">&#x1F69A;</div>
              <h3>Bulk Haulage & Delivery</h3>
              <p>We deliver all of our landscaping materials right to your door in town for a flat fee of $25. Simple, affordable, and reliable—no surprises, just great service. Call us for our delivery rates out of town.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#x1F331;</div>
              <h3>Expert Project Advice</h3>
              <p>With over 10+ years of experience, our team can offer invaluable advice on material selection, quantity estimation, and best practices for your specific project needs.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#x1F4DD;</div>
              <h3>Material Sourcing</h3>
              <p>Looking for a specific product we don't stock? We can leverage our extensive network of suppliers to source specialty materials for your unique landscaping requirements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Simple Process</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="icon">1</div>
              <h4>Consult & Advise</h4>
              <p>Contact us to discuss your project. We'll help you choose the right materials and calculate quantities.</p>
            </div>
            <div className="process-step">
              <div className="icon">2</div>
              <h4>Quote & Schedule</h4>
              <p>We provide a clear, competitive quote and schedule a delivery time that works for you.</p>
            </div>
            <div className="process-step">
              <div className="icon">3</div>
              <h4>Deliver & Complete</h4>
              <p>Our professional team delivers your materials on-site, ready for you to complete your project.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p>Contact us today to discuss your project needs or to schedule a delivery.</p>
          <a href="/contact" className="cta-button">Contact Us</a>
        </div>
      </section>
    </>
  );
} 