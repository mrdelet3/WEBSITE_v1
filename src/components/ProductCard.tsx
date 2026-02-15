import type { Product } from '@/data/products';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div
            className="group block relative focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 rounded-none"
        >
            <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
            </div>
            <div className="py-4 px-4 text-center space-y-2">
                <h3 className="text-xl font-display text-foreground group-hover:text-primary transition-colors duration-500">
                    {product.title}
                </h3>
            </div>
        </div>
    );
}
