import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { FadeInStagger, fadeInItem } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';

export function Store() {
    const { category, id } = useParams<{ category: string; id: string }>();
    const currentCategory = category ? category.toLowerCase() : 'gypsum';

    // Find filtered products for the grid
    const filteredProducts = products.filter(
        (product) => product.category === currentCategory
    );

    // Find selected product for the modal
    const selectedProduct = id ? products.find(p => p.id === id) : null;

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-12 max-w-[1920px] mx-auto animate-in fade-in duration-700 bg-background relative">

            {/* Modal - Renders on top if a product is selected */}
            {selectedProduct && <ProductModal product={selectedProduct} />}

            <header className="mb-20 px-4 text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-display font-light mb-4 tracking-tight flex flex-wrap items-center justify-center lg:justify-start gap-x-4">
                    <span className="italic opacity-60 text-foreground/60">Store</span>
                    <span className="font-extralight opacity-20 text-3xl text-foreground">/</span>
                    <span className="text-foreground">{capitalize(currentCategory)} Collection</span>
                </h2>
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mt-4">
                    Curated pieces available for acquisition
                </p>
            </header>

            {filteredProducts.length > 0 ? (
                <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                    {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={fadeInItem}>
                            <Link to={`/store/${product.category}/product/${product.id}`}>
                                <ProductCard product={product} />
                            </Link>
                        </motion.div>
                    ))}
                </FadeInStagger>
            ) : (
                <div className="min-h-[40vh] flex flex-col items-center justify-center opacity-60">
                    <p className="text-xl font-display italic mb-4">Collection Coming Soon</p>
                    <p className="text-[10px] uppercase tracking-widest">Only Gypsum is currently available</p>
                </div>
            )}
        </div>
    );
}
