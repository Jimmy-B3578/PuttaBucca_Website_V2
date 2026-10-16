import { siteConfig } from '../config/site.config';
import CalculatorButton from './CalculatorButton';
import { PhoneIcon, PinIcon } from './Icons';

// Phone-only bar pinned to the bottom of the screen: the three things people come for.
export default function MobileActionBar() {
  return (
    <div className="mobile-action-bar">
      <a href={siteConfig.phoneHref} className="action-call" aria-label={`Call ${siteConfig.phone}`}>
        <PhoneIcon size={20} />
        <span>Call</span>
      </a>
      <a href={siteConfig.directionsUrl} target="_blank" rel="noopener noreferrer">
        <PinIcon size={20} />
        <span>Directions</span>
      </a>
      <CalculatorButton className="action-calc">Calculator</CalculatorButton>
    </div>
  );
}
