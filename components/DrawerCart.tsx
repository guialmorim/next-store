import React from 'react';
import Link from 'next/link';
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useColorModeValue,
	Button,
	Text,
	Box,
	List,
	ListItem,
	ListIcon,
	Divider,
	Badge,
	Icon,
	Flex,
	Spacer,
	Tag,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useShoppingCart } from 'use-shopping-cart';
import { fetchPostJSON } from '@/utils/api-helpers';
import { Toast } from '@/utils/toast';

interface IDrawerCartProps {
	isOpen: boolean;
	onClose: () => void;
}

const DrawerCart: React.FC<IDrawerCartProps> = ({ isOpen, onClose }) => {
	const [loading, setLoading] = React.useState(false);
	const [cartEmpty, setCartEmpty] = React.useState(true);
	const backGroundColorForItems = useColorModeValue('purple.300', 'purple.700');
	const colorForItems = useColorModeValue('purple.700', 'purple.300');

	const {
		formattedTotalPrice,
		cartCount,
		cartDetails,
		clearCart,
		redirectToCheckout,
		removeItem,
	} = useShoppingCart();

	React.useEffect(() => setCartEmpty(!cartCount), [cartCount]);

	const allproducts = Object.keys(cartDetails).map((item) => cartDetails[item]);

	const handleCheckout: (
		event: React.MouseEvent<HTMLButtonElement>
	) => void = async (event) => {
		event.preventDefault();
		setLoading(true);

		const response = await fetchPostJSON(
			'/api/checkout_sessions/cart',
			'POST',
			cartDetails
		);

		if (response.statusCode === 500) {
			Toast({ title: 'Oops!', description: response.message, status: 'error' });
			return;
		}

		redirectToCheckout({ sessionId: response.id });
	};

	const onClearCart = React.useCallback(() => {
		clearCart();
		Toast({
			title: 'Aww yeah!',
			description: 'Cart Cleared',
			status: 'success',
		});
	}, []);

	const RemoveItemFromCart = React.useCallback((sku: string) => {
		removeItem(sku);
		Toast({
			title: 'Removed',
			description: 'product removed from your cart',
			status: 'success',
		});
	}, []);

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Your Cart</DrawerHeader>

					<DrawerBody>
						<Box mb="3rem">
							{allproducts.length > 0 ? (
								<List spacing={3}>
									{allproducts.map((product) => (
										<>
											<Flex>
												<Box>
													<ListItem>
														<ListIcon as={CheckCircleIcon} color="green.200" />
														{product.name}
													</ListItem>
												</Box>
												<Spacer />
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
											<Divider orientation="horizontal" />
										</>
									))}
								</List>
							) : (
								<Text>Your cart is empty.</Text>
							)}
						</Box>

						<Box mb="3rem">
							<Link href="/cart">
								<Button bg={backGroundColorForItems} color={colorForItems}>
									See your cart with details
								</Button>
							</Link>
						</Box>
						<Box>
							<p suppressHydrationWarning>
								<strong>Number of Items:</strong> {cartCount}
							</p>
							<p suppressHydrationWarning>
								<strong>Total:</strong> {formattedTotalPrice}
							</p>
						</Box>
					</DrawerBody>

					<DrawerFooter>
						<Button
							bg={backGroundColorForItems}
							color={colorForItems}
							type="submit"
							disabled={cartEmpty || loading}
							mr={3}
							onClick={handleCheckout}
						>
							Checkout
						</Button>
						<Button
							bg={backGroundColorForItems}
							color={colorForItems}
							type="button"
							onClick={onClearCart}
						>
							Clear Cart
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
};

export default DrawerCart;
