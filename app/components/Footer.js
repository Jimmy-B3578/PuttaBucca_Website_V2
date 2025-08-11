import { siteConfig } from "../config/site.config";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2025 Putta Bucca Landscapes. All Rights Reserved.</p>
                <p className="footer-contact">19 Industrial Ave, Mudgee NSW 2850 | 0419 669 003 | sales@puttabucca.com.au | Mon - Fri: 7am - 5pm, Sat: 8am - 1pm</p>
                <div className="social-links">
                    <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 