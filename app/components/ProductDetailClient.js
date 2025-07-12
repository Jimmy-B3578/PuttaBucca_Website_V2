'use client';

import { useState } from 'react';
import QuoteForm from './QuoteForm';

const ProductDetailClient = ({ product }) => {
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsQuoteFormOpen(true)} className="cta-button inquiry-button">
                Request a Quote
            </button>
            {isQuoteFormOpen && <QuoteForm product={product} onClose={() => setIsQuoteFormOpen(false)} />}
        </>
    );
};

export default ProductDetailClient; 