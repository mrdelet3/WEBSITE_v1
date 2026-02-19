import type { Product } from '@/data/products';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div
            className="group block relative rounded-none"
        >
            <div className="aspect-square overflow-hidden bg-charcoal/5 dark:bg-white/5 relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
            </div>
            <div className="py-4 px-4 text-center space-y-2">
                <h3 className="text-xl font-display text-charcoal dark:text-off-white group-hover:text-primary dark:group-hover:text-gold-beige transition-colors duration-500">
                    {product.title}
                </h3>
            </div>
        </div>
    );
}
