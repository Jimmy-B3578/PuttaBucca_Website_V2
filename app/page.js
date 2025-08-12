import HeroButtons from "./components/HeroButtons";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
                  <div className="hero-content">
          <h1 className="animate-fade-in-down">Your Trusted Partner for Quality Landscape Supplies</h1>
          <p className="animate-fade-in-up">From decorative stones to quality soils, we have everything you need for your next landscaping project.</p>
          <HeroButtons />
        </div>
          <div className="hero-image">
            <img src="/images/LandingPage.jpg" alt="Landscape supplies and materials" />
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">&#x1F46A;</div>
            <h3>Family Owned & Operated</h3>
            <p>We are a family-owned business with over 10+ years of experience, dedicated to serving the Mudgee region.</p>
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