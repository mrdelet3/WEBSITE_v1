import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { products as staticProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { FadeInStagger } from '@/components/animations/FadeIn';
import { fadeInItem } from '@/components/animations/fadeInVariants';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';

export function Store() {
    const { category, id } = useParams<{ category: string; id: string }>();
    const currentCategory = category ? category.toLowerCase() : 'gypsum';

    // Fetch products from Shopify (falls back to static data)
    const { products: fetchedProducts, isLoading } = useProducts(currentCategory);

    // For the product modal, find the selected product
    // Support both Shopify handles (e.g. "classical-male-bust-i") and numeric IDs
    const selectedProduct = id
        ? fetchedProducts.find(p => p.id === id) ||
          staticProducts.find(p => p.id === id)
        : null;

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-12 max-w-[1920px] mx-auto animate-in fade-in duration-700 bg-bg-warm dark:bg-bg-dark text-charcoal dark:text-off-white transition-colors duration-500 relative">
            <SEO
                title={`${capitalize(currentCategory)} Collection`}
                description={`Browse the ${capitalize(currentCategory)} sculpture collection by Alexey Kukhtin — handcrafted in Toronto.`}
                path={`/store/${currentCategory}`}
            />

            {/* Modal - Renders on top if a product is selected */}
            {selectedProduct && <ProductModal product={selectedProduct} />}

            <header className="mb-20 px-4 text-center lg:text-left">
                <h2 className="text-4xl lg:text-5xl font-display font-light mb-4 tracking-tight flex flex-wrap items-center justify-center lg:justify-start gap-x-4">
                    <span className="italic opacity-60 text-charcoal/60 dark:text-off-white/60">Store</span>
                    <span className="font-extralight opacity-20 text-3xl text-charcoal dark:text-off-white">/</span>
                    <span className="text-charcoal dark:text-off-white">{capitalize(currentCategory)} Collection</span>
                </h2>
                <p className="text-[11px] uppercase tracking-[0.4em] text-charcoal/40 dark:text-off-white/30 mt-4">
                    Curated pieces available for acquisition
                </p>
            </header>

            {isLoading ? (
                /* Skeleton grid matching the gallery aesthetic */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-square bg-charcoal/5 dark:bg-white/5" />
                            <div className="py-4 px-4 text-center space-y-2">
                                <div className="h-5 bg-charcoal/5 dark:bg-white/5 rounded-full w-3/4 mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : fetchedProducts.length > 0 ? (
                <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                    {fetchedProducts.map((product) => (
                        <motion.div key={product.id} variants={fadeInItem}>
                            <Link to={`/store/${currentCategory}/product/${product.id}`}>
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
