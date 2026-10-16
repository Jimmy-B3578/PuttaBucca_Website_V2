'use client';

// Persist open state across soft navigations to avoid flicker
let persistedIsOpen = false;

import { useState, useEffect } from 'react';
import './Calculator.css';
import { products } from '../config/products.config.js';
import { CloseIcon } from './Icons';

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(persistedIsOpen);
  const [activeShape, setActiveShape] = useState('rect');
  const [inputs, setInputs] = useState({
    'rect-length': '',
    'rect-width': '',
    'tri-base': '',
    'tri-height': '',
    'circ-diameter': '',
    'calc-depth': '',
    'calc-material-select': '',
  });
  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));

    if (id === 'calc-material-select') {
      const product = products.find(p => p.id === parseInt(value));
      setSelectedMaterial(product || null);
    }
  };

  const performCalculation = () => {
    const depth = parseFloat(inputs['calc-depth']) / 1000;
    let area = 0;

    if (activeShape === 'rect') {
      const length = parseFloat(inputs['rect-length']);
      const width = parseFloat(inputs['rect-width']);
      if (!isNaN(length) && !isNaN(width)) area = length * width;
    } else if (activeShape === 'tri') {
      const base = parseFloat(inputs['tri-base']);
      const height = parseFloat(inputs['tri-height']);
      if (!isNaN(base) && !isNaN(height)) area = 0.5 * base * height;
    } else if (activeShape === 'circ') {
      const diameter = parseFloat(inputs['circ-diameter']);
      if (!isNaN(diameter)) {
        const radius = diameter / 2;
        area = Math.PI * radius * radius;
      }
    }

    if (isNaN(depth) || isNaN(area) || area <= 0 || depth <= 0) {
      setShowResult(false);
      setVolume(0);
      return;
    }

    const calculatedVolume = area * depth;
    setVolume(calculatedVolume);
    setShowResult(true);
  };

  const resetCalculator = () => {
    setInputs({
      'rect-length': '',
      'rect-width': '',
      'tri-base': '',
      'tri-height': '',
      'circ-diameter': '',
      'calc-depth': '',
      'calc-material-select': '',
    });
    setVolume(0);
    setWeight(0);
    setSelectedMaterial(null);
    setShowResult(false);
  };

  useEffect(() => {
    // Open when hash is #calculator; do not auto-close on hash removal
    const syncFromHash = () => {
      if (typeof window === 'undefined') return;
      if (window.location.hash === '#calculator') {
        persistedIsOpen = true;
        setIsOpen(true);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    const onExplicitClose = () => handleClose();
    const onExplicitOpen = () => {
      persistedIsOpen = true;
      setIsOpen(true);
    };
    window.addEventListener('calculator:close', onExplicitClose);
    window.addEventListener('calculator:open', onExplicitOpen);
    return () => {
      window.removeEventListener('calculator:close', onExplicitClose);
      window.removeEventListener('calculator:open', onExplicitOpen);
    };
  }, []);

  useEffect(() => {
    // Escape closes the drawer; the page behind does not scroll while it is open
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    document.body.classList.add('calc-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('calc-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (volume > 0 && selectedMaterial && selectedMaterial.density) {
      setWeight(volume * selectedMaterial.density);
    } else {
      setWeight(0);
    }
  }, [volume, selectedMaterial]);

  useEffect(() => {
    // Hide results when switching tabs
    setShowResult(false);
  }, [activeShape]);

  const materialOptions = products;

  const handleClose = () => {
    persistedIsOpen = false;
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#calculator') {
      // Remove the hash without reloading
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    performCalculation();
  };

  const showWeight = weight > 0 && selectedMaterial && selectedMaterial.unit === 'per tonne';

  return (
    <>
      <div className={`calc-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose} aria-hidden="true" />
      <div
        id="universal-calculator-sidebar"
        className={isOpen ? 'open' : ''}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calc-title"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
      <div className="calc-content">
        <div className="calc-header">
          <div>
            <h3 id="calc-title">Volume Calculator</h3>
            <p className="calc-subtitle">Work out how much material you need.</p>
          </div>
          <button type="button" className="icon-btn calc-close-btn" onClick={handleClose} aria-label="Close calculator">
            <CloseIcon size={22} />
          </button>
        </div>

        <div className="calc-shape-tabs" role="tablist" aria-label="Area shape">
          <button type="button" role="tab" aria-selected={activeShape === 'rect'} onClick={() => setActiveShape('rect')} className={activeShape === 'rect' ? 'active' : ''}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="1" /></svg>
            Rectangle
          </button>
          <button type="button" role="tab" aria-selected={activeShape === 'tri'} onClick={() => setActiveShape('tri')} className={activeShape === 'tri' ? 'active' : ''}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><path d="M12 4 21 19H3Z" /></svg>
            Triangle
          </button>
          <button type="button" role="tab" aria-selected={activeShape === 'circ'} onClick={() => setActiveShape('circ')} className={activeShape === 'circ' ? 'active' : ''}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /></svg>
            Circle
          </button>
        </div>

        {activeShape === 'rect' && (
          <form id="rect-calc-form" className="calc-form calc-form-pair active" onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="rect-length">Length (m)</label>
              <input type="number" inputMode="decimal" id="rect-length" placeholder="e.g., 5" step="0.01" value={inputs['rect-length']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="rect-width">Width (m)</label>
              <input type="number" inputMode="decimal" id="rect-width" placeholder="e.g., 2.5" step="0.01" value={inputs['rect-width']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        {activeShape === 'tri' && (
          <form id="tri-calc-form" className="calc-form calc-form-pair active" onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="tri-base">Base (m)</label>
              <input type="number" inputMode="decimal" id="tri-base" placeholder="e.g., 4" step="0.01" value={inputs['tri-base']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="tri-height">Height (m)</label>
              <input type="number" inputMode="decimal" id="tri-height" placeholder="e.g., 3" step="0.01" value={inputs['tri-height']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        {activeShape === 'circ' && (
          <form id="circ-calc-form" className="calc-form active" onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="circ-diameter">Diameter (m)</label>
              <input type="number" inputMode="decimal" id="circ-diameter" placeholder="e.g., 3" step="0.01" value={inputs['circ-diameter']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        <div id="common-fields" className="calc-form">
          <div className="form-group">
            <label htmlFor="calc-depth">Depth (mm)</label>
            <input type="number" inputMode="numeric" id="calc-depth" placeholder="e.g., 100" step="1" value={inputs['calc-depth']} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === 'Enter') performCalculation(); }} />
          </div>
          <div className="calc-buttons">
            <button type="button" className="btn btn-primary btn-lg calculate-btn" onClick={performCalculation}>Calculate</button>
            <button type="button" className="btn btn-outline btn-lg reset-btn" onClick={resetCalculator}>Reset</button>
          </div>
          {showResult && (
            <div className="calc-results" aria-live="polite">
              <h4>Results</h4>
              <div className="calc-readouts">
                <div className="calc-result-item">
                  <span>Volume</span>
                  <strong id="calc-volume-result">{volume.toFixed(3)} m³</strong>
                </div>
                <div className={`calc-result-item weight-emphasis ${showWeight ? '' : 'is-empty'}`}>
                  <span>Estimated Weight</span>
                  {showWeight ? (
                    <strong id="calc-weight-result">{weight.toFixed(2)} tonnes</strong>
                  ) : (
                    <em>Pick a material sold by the tonne</em>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="calc-material-select">Material for Weight Est.</label>
                <select id="calc-material-select" value={inputs['calc-material-select']} onChange={handleInputChange}>
                  <option value="">-- Select --</option>
                  {materialOptions.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.unit.replace('per ', '')})
                    </option>
                  ))}
                </select>
                {selectedMaterial && selectedMaterial.unit === 'per tonne' && selectedMaterial.density != null && selectedMaterial.density !== '' && (
                  <p className="calc-density">Density: {selectedMaterial.density} tonnes/m³</p>
                )}
              </div>

              {selectedMaterial && (
                (() => {
                  const subject = `Quote request: ${selectedMaterial.name}`;
                  const lines = [];
                  lines.push(`Material: ${selectedMaterial.name}`);
                  lines.push(`Unit: ${selectedMaterial.unit}`);
                  lines.push(`Shape: ${activeShape}`);
                  if (activeShape === 'rect') {
                    lines.push(`Length: ${inputs['rect-length'] || '-'} m`);
                    lines.push(`Width: ${inputs['rect-width'] || '-'} m`);
                  } else if (activeShape === 'tri') {
                    lines.push(`Base: ${inputs['tri-base'] || '-'} m`);
                    lines.push(`Height: ${inputs['tri-height'] || '-'} m`);
                  } else if (activeShape === 'circ') {
                    lines.push(`Diameter: ${inputs['circ-diameter'] || '-'} m`);
                  }
                  lines.push(`Depth: ${inputs['calc-depth'] || '-'} mm`);
                  lines.push(`Calculated volume: ${volume.toFixed(3)} m³`);
                  if (weight > 0 && selectedMaterial.unit === 'per tonne') {
                    lines.push(`Estimated weight: ${weight.toFixed(2)} tonnes`);
                  }
                  lines.push('');
                  lines.push('Please provide a quote and availability.');
                  const message = lines.join('\n');
                  const href = `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
                  return (
                    <a href={href} className="btn btn-primary btn-lg btn-block calc-email">Email these details</a>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Calculator;
