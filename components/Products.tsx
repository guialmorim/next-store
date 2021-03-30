import React from 'react';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Card from '@/components/Card';
import { Grid } from '@chakra-ui/react';
import { Toast } from '@/utils/toast';
import { CURRENCY } from '@/config/stripe';
import { useSession } from 'next-auth/client';

type TProduct = {
	sku: string;
	name: string;
	description: string;
	price: number;
	image: string;
	currency: string;
};

interface IProductProps {
	products: Array<TProduct> | undefined;
	preview?: boolean;
}

const Products: React.FC<IProductProps> = ({ products, preview = false }) => {
	const [session, loading] = useSession();

	const { addItem, removeItem } = useShoppingCart();

	const filteredProducts =
		products && preview ? products?.slice(0, 4) : products;

	return (
		<Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="2rem">
			{filteredProducts?.map((product: TProduct) => {
				const productCurrency = React.useMemo(
					() =>
						formatCurrencyString({
							value: product.price,
							currency: CURRENCY,
						}),
					[product.price, CURRENCY]
				);

				const AddItemToCart = React.useCallback(
					(product: TProduct) => {
						if (!session?.user.email) {
							Toast({
								title: 'Atenção',
								description:
									'Você precisa estar logado para colocar produtos em seu carrinho!',
								status: 'warning',
							});
							return;
						}
						addItem(product);
						Toast({
							title: 'Obrigado!',
							description: `${product.name} foi adicionado no seu carrinho`,
							status: 'success',
						});
					},
					[product, session]
				);

				const RemoveItemFromCart = React.useCallback(
					(sku: string) => {
						removeItem(sku);
						Toast({
							title: 'Removido',
							description: 'produto removido do seu carrinho',
							status: 'info',
						});
					},
					[product]
				);

				return (
					<Card
						key={product.sku}
						title={product.name}
						description={product.description}
						currency={productCurrency}
						addItemToCart={() => AddItemToCart(product)}
						removeItemFromCart={() => RemoveItemFromCart(product.sku)}
						imageUrl={product.image}
					/>
				);
			})}
		</Grid>
	);
};

export default Products;
