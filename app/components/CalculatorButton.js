'use client';

import { CalculatorIcon } from './Icons';

// Opens the site-wide volume calculator drawer from anywhere on the page.
export default function CalculatorButton({ className = 'btn btn-secondary', children = 'Calculate Your Project', showIcon = true, onClick }) {
  const open = (e) => {
    onClick?.(e);
    window.dispatchEvent(new Event('calculator:open'));
  };

  return (
    <button type="button" className={className} onClick={open}>
      {showIcon && <CalculatorIcon />}
      <span>{children}</span>
    </button>
  );
}
