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
	Icon,
	Flex,
	Spacer,
	Tag,
} from '@chakra-ui/react';
import {
	CheckCircleIcon,
	DeleteIcon,
	ExternalLinkIcon,
} from '@chakra-ui/icons';
import { useShoppingCart } from 'use-shopping-cart';
import { Toast } from '@/utils/toast';
import { fetchPostJSON } from '@/utils/api-helpers';

interface IDrawerCartProps {
	isOpen: boolean;
	onClose: () => void;
}

const DrawerCart: React.FC<IDrawerCartProps> = ({ isOpen, onClose }) => {
	const [loading, setLoading] = React.useState(false);
	const [cartEmpty, setCartEmpty] = React.useState(true);

	const {
		formattedTotalPrice,
		cartCount,
		cartDetails,
		clearCart,
		removeItem,
	} = useShoppingCart();

	React.useEffect(() => setCartEmpty(!cartCount), [cartCount]);

	const allproducts = Object.keys(cartDetails).map((item) => cartDetails[item]);

	const onClearCart = React.useCallback(() => {
		clearCart();
		Toast({
			title: 'Aww yeah!',
			description: 'Carrinho limpo',
			status: 'success',
		});
	}, []);

	const RemoveItemFromCart = React.useCallback((sku: string) => {
		removeItem(sku);
		Toast({
			title: 'Removido',
			description: 'produto removido do seu carrinho',
			status: 'info',
		});
	}, []);

	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Seu Carrinho</DrawerHeader>

					<DrawerBody>
						<Box mb="3rem">
							{allproducts.length > 0 ? (
								<List spacing={3}>
									{allproducts.map((product, index) => (
										<React.Fragment key={index}>
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
										</React.Fragment>
									))}
								</List>
							) : (
								<Text>Seu carrinho está vazio.</Text>
							)}
						</Box>

						<Box mb="3rem">
							<Link href="/cart">
								<Button
									size="sm"
									colorScheme="purple"
									onClick={onClose}
									rightIcon={<ExternalLinkIcon />}
								>
									Veja todos os detalhes aqui.
								</Button>
							</Link>
						</Box>
						<Box>
							<p suppressHydrationWarning>
								<strong>Quantidade de itens:</strong> {cartCount}
							</p>
							<p suppressHydrationWarning>
								<strong>Subtotal:</strong> {formattedTotalPrice}
							</p>
						</Box>
					</DrawerBody>

					<DrawerFooter>
						<Link href="/cart">
							<Button
								colorScheme="teal"
								type="submit"
								disabled={cartEmpty || loading}
								mr={3}
								onClick={onClose}
							>
								Finalizar Compra
							</Button>
						</Link>
						<Button colorScheme="blue" type="button" onClick={onClearCart}>
							Limpar Carrinho
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	);
};

export default DrawerCart;
