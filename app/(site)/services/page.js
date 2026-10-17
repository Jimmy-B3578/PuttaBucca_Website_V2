import Link from 'next/link';
import { siteConfig } from '../../config/site.config';
import { ChatIcon, PhoneIcon, SearchIcon, TruckIcon } from '../../components/Icons';

export default function ServicesPage() {
  return (
    <>
      <section className="photo-header services-hero">
        <img className="photo-header-img" src="/images/ServicesYard.jpg" alt="" aria-hidden="true" />
        <div className="container photo-header-inner">
          <h1>Our Services</h1>
          <p>Delivering comprehensive solutions to bring your landscaping vision to life, from bulk supplies to expert advice.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <ul className="service-list">
            <li className="service-item">
              <span className="service-icon"><TruckIcon size={28} /></span>
              <div>
                <h3>Bulk Haulage &amp; Delivery</h3>
                <p>We deliver all of our landscaping materials right to your door in town for a flat fee of $30. Simple, affordable, and reliable—no surprises, just great service. Call us for our delivery rates out of town.</p>
                <p className="service-callout">
                  <PhoneIcon size={18} />
                  <span>For bulk orders, call <a href={siteConfig.bulkPhoneHref}>{siteConfig.bulkPhone}</a></span>
                </p>
              </div>
            </li>
            <li className="service-item">
              <span className="service-icon"><ChatIcon size={28} /></span>
              <div>
                <h3>Expert Project Advice</h3>
                <p>With over 10+ years of experience, our team can offer invaluable advice on material selection, quantity estimation, and best practices for your specific project needs.</p>
              </div>
            </li>
            <li className="service-item">
              <span className="service-icon"><SearchIcon size={28} /></span>
              <div>
                <h3>Material Sourcing</h3>
                <p>Looking for a specific product we don't stock? We can leverage our extensive network of suppliers to source specialty materials for your unique landscaping requirements.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-stone">
        <div className="container">
          <h2 className="section-title">Our Simple Process</h2>
          <ol className="process-steps">
            <li>
              <span className="step-number" aria-hidden="true">1</span>
              <h3>Consult &amp; Advise</h3>
              <p>Contact us to discuss your project. We'll help you choose the right materials and calculate quantities.</p>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">2</span>
              <h3>Quote &amp; Schedule</h3>
              <p>We provide a clear, competitive quote and schedule a delivery time that works for you.</p>
            </li>
            <li>
              <span className="step-number" aria-hidden="true">3</span>
              <h3>Deliver &amp; Complete</h3>
              <p>Our professional team delivers your materials on-site, ready for you to complete your project.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Ready to Get Started?</h2>
            <p>Contact us today to discuss your project needs or to schedule a delivery.</p>
          </div>
          <div className="cta-actions">
            <a href={siteConfig.phoneHref} className="btn btn-light btn-lg"><PhoneIcon /><span>Call {siteConfig.phone}</span></a>
            <Link href="/contact" className="btn btn-ghost-light btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
