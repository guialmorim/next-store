import React, { useState, useEffect } from 'react';
import { fetchPostJSON } from '@/utils/api-helpers';
import { useShoppingCart } from 'use-shopping-cart';
import {
	Container,
	Button,
	Heading,
	Box,
	List,
	Flex,
	ListItem,
	ListIcon,
	Spacer,
	Tag,
	Icon,
	Divider,
	Text,
} from '@chakra-ui/react';
import {
	CheckCircleIcon,
	DeleteIcon,
	ExternalLinkIcon,
} from '@chakra-ui/icons';
import { Toast } from '@/utils/toast';

const CartSummary = () => {
	const [loading, setLoading] = useState(false);
	const [cartEmpty, setCartEmpty] = useState(true);
	const {
		formattedTotalPrice,
		cartCount,
		clearCart,
		cartDetails,
		redirectToCheckout,
		removeItem,
	} = useShoppingCart();

	useEffect(() => setCartEmpty(!cartCount), [cartCount]);

	const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		setLoading(true);

		const response = await fetchPostJSON(
			'/api/checkout_sessions/cart',
			'POST',
			cartDetails
		);

		if (response.statusCode === 500) {
			Toast({
				title: 'Algo deu errado!',
				description: response.message,
				status: 'error',
			});
			return;
		}

		redirectToCheckout({ sessionId: response.id });
	};

	const onClearCart = () => {
		clearCart();
		Toast({
			title: 'Aww yeah!',
			description: 'Carrinho limpo!',
			status: 'success',
		});
	};

	const RemoveItemFromCart = React.useCallback((sku: string) => {
		removeItem(sku);
		Toast({
			title: 'Removido',
			description: 'produto removido do seu carrinho',
			status: 'info',
		});
	}, []);

	console.log(cartDetails);
	const allproducts = Object.keys(cartDetails).map((item) => cartDetails[item]);

	return (
		<Container marginTop="calc(10vh + 2rem)">
			<form onSubmit={handleCheckout}>
				<Heading
					as="h2"
					size="lg"
					fontWeight="bold"
					color="primary.800"
					textAlign={['center', 'center', 'left', 'left']}
				>
					Seu Carrinho
				</Heading>

				{/* This is where we'll render our cart */}

				{loading && <h2>CARREGANDO...</h2>}

				{allproducts.length > 0 ? (
					<List spacing={3}>
						{allproducts.map((product, index) => (
							<Box m="2rem 0" key={index}>
								<Flex>
									<Box flex="1">
										<Text fontSize="md" fontWeight="bold">
											{product.name}
										</Text>
									</Box>
									<Box>
										<Tag
											size="sm"
											variant="outline"
											colorScheme="purple"
											mr={3}
										>
											X{product.quantity}
										</Tag>
										<Tag
											size="sm"
											variant="outline"
											colorScheme="purple"
											mr={3}
										>
											{product.formattedValue}
										</Tag>
										<Icon
											cursor="pointer"
											as={DeleteIcon}
											color="red.400"
											position="relative"
											right="0"
											onClick={() => RemoveItemFromCart(product.sku)}
											mb={2}
										/>
									</Box>
								</Flex>
								<Box flex="1" mt="0.4rem">
									<Text fontSize="sm">{product.description}</Text>
								</Box>
								<Divider orientation="horizontal" />
							</Box>
						))}
						<Box m="1rem 0">
							<p suppressHydrationWarning>
								<strong>Numero de itens:</strong> {cartCount}
							</p>
							<p suppressHydrationWarning>
								<strong>Subtotal:</strong> {formattedTotalPrice}
							</p>
						</Box>
					</List>
				) : (
					<Text m="2rem 0">Seu carrinho está vazio.</Text>
				)}

				<Box w="100%" m="1.5rem 0" display="flex">
					<Button
						colorScheme="teal"
						type="submit"
						disabled={cartEmpty || loading}
						flex="1"
						m="0 0.2rem"
					>
						Finalizar Compra
					</Button>
					<Button
						flex="1"
						colorScheme="blue"
						type="button"
						onClick={onClearCart}
						m="0 0.2rem"
					>
						Limpar Carrinho
					</Button>
				</Box>
			</form>
		</Container>
	);
};

export default CartSummary;
