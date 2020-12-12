import React from 'react';
import { products } from '@/data/prods';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Card from '@/components/Card';
import { Grid } from '@chakra-ui/react';

const Products = () => {
	const { addItem, removeItem } = useShoppingCart();

	return (
		<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="2rem">
			{products.map((product) => {
				const productCurrency = React.useMemo(
					() =>
						formatCurrencyString({
							value: product.price,
							currency: product.currency,
						}),
					[product.price, product.currency]
				);

				const AddItemToCart = React.useCallback(() => addItem(product), [
					product,
				]);
				const RemoveItemFromCart = React.useCallback(
					() => removeItem(product.sku),
					[product]
				);

				return (
					<Card
						key={product.sku}
						title={product.name}
						description={productCurrency}
						addItemToCart={AddItemToCart}
						removeItemToCart={RemoveItemFromCart}
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
