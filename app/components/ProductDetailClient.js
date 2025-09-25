'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuoteForm from './QuoteForm';

const ProductDetailClient = ({ product }) => {
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

    return (
        <>
            <div className="product-actions">
                <button onClick={() => setIsQuoteFormOpen(true)} className="cta-button inquiry-button">
                    Request a Quote
                </button>
                <Link href="/contact" className="cta-button contact-button">
                    Contact Now
                </Link>
            </div>
            {isQuoteFormOpen && <QuoteForm product={product} onClose={() => setIsQuoteFormOpen(false)} />}
        </>
    );
};

export default ProductDetailClient; 