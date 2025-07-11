'use client';

import { useState, useEffect } from 'react';
import './Calculator.css';
import { products } from '../config/products.config.js';

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div id="universal-calculator-sidebar" className={isOpen ? 'open' : ''}>
      <div id="calc-toggle-tab" onClick={() => setIsOpen(!isOpen)}>
        CALCULATOR
      </div>
      <div className="calc-content">
        <div className="calc-header">
          <h3>Volume Calculator</h3>
        </div>
        <div className="calc-shape-tabs">
          <button onClick={() => setActiveShape('rect')} className={activeShape === 'rect' ? 'active' : ''}>Rectangle</button>
          <button onClick={() => setActiveShape('tri')} className={activeShape === 'tri' ? 'active' : ''}>Triangle</button>
          <button onClick={() => setActiveShape('circ')} className={activeShape === 'circ' ? 'active' : ''}>Circle</button>
        </div>

        {activeShape === 'rect' && (
          <form id="rect-calc-form" className="calc-form active">
            <div className="form-group">
              <label htmlFor="rect-length">Length (m)</label>
              <input type="number" id="rect-length" placeholder="e.g., 5" step="0.01" value={inputs['rect-length']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="rect-width">Width (m)</label>
              <input type="number" id="rect-width" placeholder="e.g., 2.5" step="0.01" value={inputs['rect-width']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        {activeShape === 'tri' && (
          <form id="tri-calc-form" className="calc-form active">
            <div className="form-group">
              <label htmlFor="tri-base">Base (m)</label>
              <input type="number" id="tri-base" placeholder="e.g., 4" step="0.01" value={inputs['tri-base']} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="tri-height">Height (m)</label>
              <input type="number" id="tri-height" placeholder="e.g., 3" step="0.01" value={inputs['tri-height']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        {activeShape === 'circ' && (
          <form id="circ-calc-form" className="calc-form active">
            <div className="form-group">
              <label htmlFor="circ-diameter">Diameter (m)</label>
              <input type="number" id="circ-diameter" placeholder="e.g., 3" step="0.01" value={inputs['circ-diameter']} onChange={handleInputChange} />
            </div>
          </form>
        )}

        <div id="common-fields" className="calc-form">
          <div className="form-group">
            <label htmlFor="calc-depth">Depth (mm)</label>
            <input type="number" id="calc-depth" placeholder="e.g., 100" step="1" value={inputs['calc-depth']} onChange={handleInputChange} />
          </div>
          <div className="calc-buttons">
            <button type="button" className="calculate-btn" onClick={performCalculation}>Calculate</button>
            <button type="button" className="reset-btn" onClick={resetCalculator}>Reset</button>
          </div>
          {showResult && (
            <div className="calc-results" style={{ display: 'block' }}>
              <h4>Results</h4>
              <div className="calc-result-item">
                <span>Volume:</span>
                <strong id="calc-volume-result">{volume.toFixed(3)} m³</strong>
              </div>
              <hr />
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
              </div>
              {weight > 0 && selectedMaterial && selectedMaterial.unit === 'per tonne' && (
                <div className="calc-result-item">
                  <span>Estimated Weight:</span>
                  <strong id="calc-weight-result">{weight.toFixed(2)} tonnes</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator; 