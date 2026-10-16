'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuoteForm from './QuoteForm';

const ProductDetailClient = ({ product }) => {
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

    return (
        <>
            <div className="product-actions">
                <button type="button" onClick={() => setIsQuoteFormOpen(true)} className="btn btn-primary btn-lg">
                    Request a Quote
                </button>
                <Link href="/contact" className="btn btn-outline btn-lg">
                    Contact Now
                </Link>
            </div>
            {isQuoteFormOpen && <QuoteForm product={product} onClose={() => setIsQuoteFormOpen(false)} />}
        </>
    );
};

export default ProductDetailClient;
