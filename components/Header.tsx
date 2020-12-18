import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import {
	Box,
	Flex,
	Text,
	Button,
	useColorMode,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Image,
	MenuGroup,
	MenuDivider,
	HStack,
	Icon,
} from '@chakra-ui/react';
import {
	CloseIcon,
	HamburgerIcon,
	SettingsIcon,
	MoonIcon,
	SunIcon,
} from '@chakra-ui/icons';
import {
	AiOutlineHome,
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineUserAdd,
	AiTwotoneShopping,
} from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import { CartNotification, CartButton } from '@/styled/Cart';
import { useShoppingCart } from 'use-shopping-cart';

import DrawerCart from '@/components/DrawerCart';

const MenuItems = (props: any) => {
	const { children, isLast, to = '/', isLink = true, ...rest } = props;
	return isLink ? (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display="block"
			{...rest}
		>
			<Link href={to}>
				<a>{children}</a>
			</Link>
		</Text>
	) : (
		<Text
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display="block"
			{...rest}
		>
			{children}
		</Text>
	);
};

const Header: React.FC = () => {
	const [isDrawerCartOpen, setIsDrawerCartOpen] = React.useState<boolean>(
		false
	);
	const [session, loading] = useSession();

	const { cartCount } = useShoppingCart();

	const { colorMode, toggleColorMode } = useColorMode();

	const backGroundColorForNavBar = useColorModeValue(
		'purple.200',
		'purple.800'
	);
	const colorForNavBar = useColorModeValue('purple.800', 'purple.200');

	const backGroundColorForItems = useColorModeValue('purple.300', 'purple.700');
	const colorForItems = useColorModeValue('purple.700', 'purple.300');

	const [show, setShow] = React.useState(false);
	const toggleMenu = () => setShow(!show);

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={8}
			p={8}
			bg={backGroundColorForNavBar}
			color={colorForNavBar}
		>
			<HStack cursor="pointer">
				<Box color={colorForItems} display="inline" fontSize="1.5rem">
					<Link href="/">
						<Text color={colorForItems}>
							Next
							<Icon as={AiTwotoneShopping} mx={2} mb={1} />
							Store
						</Text>
					</Link>
				</Box>
			</HStack>

			<Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
				{show ? <CloseIcon /> : <HamburgerIcon />}
			</Box>

			<Box
				display={{ base: show ? 'block' : 'none', md: 'block' }}
				flexBasis={{ base: '100%', md: 'auto' }}
			>
				<Flex
					align={['center', 'center', 'center', 'center']}
					justify={['center', 'space-between', 'flex-end', 'flex-end']}
					direction={['column', 'row', 'row', 'row']}
					pt={[4, 4, 0, 0]}
				>
					<MenuItems color={colorForItems} to="/">
						<Icon cursor="pointer" fontSize="1.5rem" as={AiOutlineHome} />
					</MenuItems>

					<MenuItems isLink={false} color={colorForItems}>
						<CartButton onClick={() => setIsDrawerCartOpen(!isDrawerCartOpen)}>
							<Icon
								as={AiOutlineShoppingCart}
								cursor="pointer"
								fontSize="1.5rem"
								color={colorForItems}
							/>

							{cartCount > 0 && (
								<CartNotification>{cartCount}</CartNotification>
							)}
						</CartButton>
					</MenuItems>
					<MenuItems isLink={false}>
						<Icon
							cursor="pointer"
							fontSize="1.5rem"
							color={colorForItems}
							onClick={toggleColorMode}
							as={colorMode === 'light' ? MoonIcon : SunIcon}
							mr={[0, 5]}
							mb={[5, 0]}
						/>
					</MenuItems>

					<MenuItems isLink={false}>
						{session && session.user ? (
							<>
								<Menu isLazy>
									<MenuButton
										colorScheme="purple"
										rounded="lg"
										py="15px"
										as={Button}
										rightIcon={
											<Image
												boxSize="2rem"
												borderRadius="full"
												src={session.user.image || ''}
												alt="User Profile Image"
											/>
										}
									>
										Welcome, {session.user.name}!
									</MenuButton>
									<MenuList colorScheme="purple">
										<MenuGroup title="Settings">
											<Link href="/settings">
												<MenuItem>
													<>
														<Text mr={2}>Preferences</Text>
														<SettingsIcon />
													</>
												</MenuItem>
											</Link>
										</MenuGroup>
										<MenuDivider />
										<MenuGroup title="Account">
											<Link href="/profile">
												<MenuItem>
													<>
														<Text mr={2}>Profile</Text>
														<AiOutlineUser />
													</>
												</MenuItem>
											</Link>
											<MenuItem onClick={() => signOut()}>
												<>
													<Text mr={2}>Sign Out</Text>
													<GoSignOut />
												</>
											</MenuItem>
										</MenuGroup>
									</MenuList>
								</Menu>
							</>
						) : (
							<Button
								rounded="lg"
								colorScheme="purple"
								onClick={() => signIn()}
							>
								<Text m={1}>Create Account</Text>
								<AiOutlineUserAdd />
							</Button>
						)}
					</MenuItems>
				</Flex>
			</Box>
			<DrawerCart
				isOpen={isDrawerCartOpen}
				onClose={() => setIsDrawerCartOpen(false)}
			/>
		</Flex>
	);
};

export default Header;
