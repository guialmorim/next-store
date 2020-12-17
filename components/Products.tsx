import React from 'react';
import { products } from '@/data/prods';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Card from '@/components/Card';
import { Grid } from '@chakra-ui/react';
import { Toast } from '@/utils/toast';

type TProduct = {
	name: string;
	sku: string;
	price: number;
	image: string;
	currency: string;
	reviewCount: number;
	rating: number;
};

interface IProductProps {
	preview?: boolean;
}

const Products: React.FC<IProductProps> = ({ preview }) => {
	const { addItem, removeItem } = useShoppingCart();

	const filteredProducts = preview ? products.slice(0, 4) : products;

	return (
		<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="2rem">
			{filteredProducts.map((product: TProduct) => {
				const productCurrency = React.useMemo(
					() =>
						formatCurrencyString({
							value: product.price,
							currency: product.currency,
						}),
					[product.price, product.currency]
				);

				const AddItemToCart = React.useCallback(
					(product: TProduct) => {
						addItem(product);
						Toast({
							title: 'Thank you!',
							description: `${product.name} added in your cart`,
							status: 'success',
						});
					},
					[product]
				);
				const RemoveItemFromCart = React.useCallback(
					(sku: string) => {
						removeItem(sku);
						Toast({
							title: 'Removed',
							description: 'product removed from your cart',
							status: 'success',
						});
					},
					[product]
				);

				return (
					<Card
						key={product.sku}
						title={product.name}
						description={productCurrency}
						addItemToCart={() => AddItemToCart(product)}
						removeItemFromCart={() => RemoveItemFromCart(product.sku)}
						imageUrl={product.image}
						reviewCount={product.reviewCount}
						rating={product.rating}
					/>
				);
			})}
		</Grid>
	);
};

export default Products;
