import Link from "next/link";
import Image from "next/image";
import HeroButtons from "../components/HeroButtons";
import CalculatorButton from "../components/CalculatorButton";
import { getProducts } from "../lib/products";
import { siteConfig } from "../config/site.config";
import { ArrowRightIcon, ChatIcon, ClockIcon, FamilyIcon, LeafIcon, PinIcon, TruckIcon } from "../components/Icons";

// Tiles whose first product photo is too low-resolution to show large: use this product's photo instead
const tileImageOverrides = {
  Sand: 'yellow-brickie-sand',
};

// One tile per product category, pictured with the first product in that category.
const getCategories = (products) => products.reduce((acc, product) => {
  if (!product.category) return acc;
  const existing = acc.find((c) => c.name === product.category);
  if (existing) existing.count += 1;
  else {
    const override = products.find((p) => p.slug === tileImageOverrides[product.category]);
    acc.push({ name: product.category, image: override?.image || product.image, count: 1 });
  }
  return acc;
}, []);

export default async function HomePage() {
  const categories = getCategories(await getProducts());
  return (
    <>
      <section className="hero">
        <img className="hero-photo" src="/images/LandingPage.jpg" alt="The Putta Bucca Landscapes sign on a sandstone block at the Mudgee yard" />
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>Your Trusted Partner for Quality Landscape Supplies</h1>
            <p className="hero-lede">From decorative stones and quality soils to ShapeScaper steel edging, we have everything you need for your next landscaping project.</p>
            <HeroButtons />
          </div>
        </div>
      </section>

      <section className="facts-band" aria-label="Yard details">
        <div className="container facts-grid">
          <div className="fact">
            <ClockIcon size={24} />
            <div>
              <h2>Opening hours</h2>
              {siteConfig.hours.map((h) => (
                <p key={h.days}><span>{h.days}</span> {h.time}</p>
              ))}
            </div>
          </div>
          <div className="fact">
            <PinIcon size={24} />
            <div>
              <h2>Visit the yard</h2>
              <p>{siteConfig.address}</p>
              <a href={siteConfig.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-link">Get directions <ArrowRightIcon size={16} /></a>
            </div>
          </div>
          <div className="fact">
            <TruckIcon size={24} />
            <div>
              <h2>Delivery</h2>
              <p>Flat $30 fee in town. Call us for out-of-town rates.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-stone" aria-labelledby="shapescaper-title">
        <div className="container feature-layout">
          <div className="feature-photo">
            <Image
              src="/images/shapescaper-feature.jpg"
              alt="Weathering steel edging curving around a paved fire pit, with a raised steel wall and a timber seat"
              width={1080}
              height={1080}
              sizes="(max-width: 960px) 100vw, 640px"
            />
          </div>
          <div>
            <h2 id="shapescaper-title" className="section-title">ShapeScaper steel edging</h2>
            <p className="feature-copy">Modular steel garden edging, made in Australia from BlueScope steel and stocked at the yard. Lengths are 2.4m, with connector plates and fixings, and the lower profiles bend on site into curves or corners. Weathering steel is REDCOR, galvanised is GALVABOND, and ZINMAG is the self-healing coating.</p>
            <ul className="feature-range">
              <li>
                <Link href="/products/shapescaper-steel-garden-edging">
                  <span>
                    <strong>Steel garden edging</strong>
                    <span className="feature-range-meta">2.4m lengths, 75mm to 185mm, REDCOR</span>
                  </span>
                  <ArrowRightIcon size={20} />
                </Link>
              </li>
              <li>
                <Link href="/products/shapescaper-stakes">
                  <span>
                    <strong>Stakes</strong>
                    <span className="feature-range-meta">300mm to 500mm long</span>
                  </span>
                  <ArrowRightIcon size={20} />
                </Link>
              </li>
            </ul>
            <p className="feature-call">See the full range on the <a href="https://idealedging.com.au/shapescaper/" target="_blank" rel="noopener noreferrer">ShapeScaper website</a>.</p>
            <p className="feature-call">Call the yard on <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> to check which heights and finishes are in.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="materials-title">
        <div className="container">
          <div className="section-head">
            <h2 id="materials-title" className="section-title">Browse by material</h2>
            <Link href="/products" className="text-link">All products <ArrowRightIcon size={16} /></Link>
          </div>
          <ul className="category-tiles">
            {categories.map((c) => (
              <li key={c.name}>
                <Link href={`/products?category=${encodeURIComponent(c.name)}`} className="category-tile">
                  <Image src={c.image} alt="" width={480} height={360} sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 280px" />
                  <span className="category-tile-label">
                    <span className="category-tile-name">{c.name}</span>
                    <span className="category-tile-count">{c.count} {c.count === 1 ? 'product' : 'products'}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="why-choose-us" className="section section-stone">
        <div className="container why-layout">
          <div className="why-photo">
            <img src="/images/ServicesYard.jpg" alt="A Putta Bucca tipper truck at the yard" loading="lazy" />
          </div>
          <div className="why-content">
            <h2 className="section-title">Why Choose Us?</h2>
            <ul className="why-list">
              <li>
                <span className="why-icon"><FamilyIcon size={24} /></span>
                <div>
                  <h3>Family Owned &amp; Operated</h3>
                  <p>We are a family-owned business with over 10+ years of experience, dedicated to serving the Mudgee region.</p>
                </div>
              </li>
              <li>
                <span className="why-icon"><LeafIcon size={24} /></span>
                <div>
                  <h3>Quality Products</h3>
                  <p>We source and supply an extensive range of high-quality landscaping and building materials for any project size.</p>
                </div>
              </li>
              <li>
                <span className="why-icon"><ChatIcon size={24} /></span>
                <div>
                  <h3>Expert Advice</h3>
                  <p>Our knowledgeable team is always ready to provide professional advice to help you select the right materials.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Ready to Start Your Project?</h2>
            <p>Use our handy online calculator to estimate the materials and costs for your landscaping needs.</p>
          </div>
          <div className="cta-actions">
            <CalculatorButton className="btn btn-light btn-lg" />
            <Link href="/products" className="btn btn-ghost-light btn-lg">View Our Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
