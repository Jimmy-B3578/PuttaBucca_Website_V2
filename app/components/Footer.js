import Link from 'next/link';
import { siteConfig } from "../config/site.config";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from './Icons';
import MaterialStrip from './MaterialStrip';

const Footer = () => {
    return (
        <footer className="site-footer">
            <MaterialStrip />
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link href="/" prefetch={false} className="brand brand-inverse">
                        <img className="brand-mark" src="/images/favicon.png" alt="" aria-hidden="true" width="40" height="40" />
                        <span className="brand-name">Putta Bucca <span>Landscapes</span></span>
                    </Link>
                    <p>Your local supplier for garden, building, and landscape materials in Mudgee.</p>
                    <div className="social-links">
                        <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Putta Bucca on Facebook"><FacebookIcon /></a>
                        <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Putta Bucca on Instagram"><InstagramIcon /></a>
                    </div>
                </div>

                <div>
                    <h2 className="footer-heading">Visit the yard</h2>
                    <p className="footer-line"><PinIcon size={18} /> <span>{siteConfig.address}</span></p>
                    <a className="footer-link" href={siteConfig.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
                </div>

                <div>
                    <h2 className="footer-heading">Opening hours</h2>
                    <dl className="hours-list">
                        {siteConfig.hours.map((h) => (
                            <div key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></div>
                        ))}
                    </dl>
                </div>

                <div>
                    <h2 className="footer-heading">Get in touch</h2>
                    <p className="footer-line"><PhoneIcon size={18} /> <a href={siteConfig.phoneHref}>{siteConfig.phone}</a></p>
                    <p className="footer-line"><MailIcon size={18} /> <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                </div>
            </div>
            <div className="footer-base">
                <div className="container">
                    <p>&copy; 2026 Putta Bucca Landscapes. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
