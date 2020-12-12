import React, { ReactNode } from 'react';
import Link from 'next/link';
//import Image from 'next/image';
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
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';

// import {  AiOutlineShoppingCart } from '';

type TProps = {
	children?: ReactNode;
	to?: string;
	isLast?: boolean;
	isLink?: boolean;
};

const MenuItems: React.FC<TProps> = (props) => {
	const { children, isLast, to = '/', isLink = true, ...rest } = props;
	return isLink ? (
		<Text
			color="black"
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
		<Box
			mb={{ base: isLast ? 0 : 8, sm: 0 }}
			mr={{ base: 0, sm: isLast ? 0 : 8 }}
			display="block"
			color="black"
		>
			{children}
		</Box>
	);
};

const Header: React.FC = () => {
	const [session, loading] = useSession();

	const { colorMode, toggleColorMode } = useColorMode();

	const backGroundColorForNavBar = useColorModeValue(
		'purple.200',
		'purple.800'
	);
	const colorForNavBar = useColorModeValue('purple.800', 'purple.200');

	const backGroundColorForItems = useColorModeValue('purple.300', 'purple.700');
	const colorForItems = useColorModeValue('purple.700', 'purple.300');

	{
		loading && <h3>LOADING...</h3>;
	}

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
			bg={['purple.500', 'purple.500', 'transparent', 'transparent']}
			color="white"
		>
			<Flex color={colorForItems} align="center">
				BRAND ICON HERE
			</Flex>

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
					<MenuItems to="/">Home</MenuItems>
					<MenuItems to="/profile">Profile</MenuItems>
					<MenuItems to="/cart">Cart</MenuItems>
					<MenuItems isLink={false}>
						<Button
							onClick={toggleColorMode}
							rounded="lg"
							bg={backGroundColorForItems}
							color={colorForItems}
							_hover={{
								bg: ['purple.100', 'purple.100', 'purple.600', 'purple.600'],
							}}
						>
							Toggle Mode {colorMode}
						</Button>
					</MenuItems>

					<MenuItems isLink={false}>
						{session && session.user ? (
							<>
								<Menu isLazy>
									<MenuButton
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
									<MenuList>
										<MenuGroup title="Settings">
											<MenuItem>Preferences</MenuItem>
										</MenuGroup>
										<MenuDivider />
										<MenuGroup title="Account">
											<MenuItem>
												<Link href="/profile">
													<a>Profile</a>
												</Link>
											</MenuItem>
											<MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
										</MenuGroup>
									</MenuList>
								</Menu>
							</>
						) : (
							<Button
								rounded="lg"
								bg={backGroundColorForItems}
								color={colorForItems}
								_hover={{
									bg: ['purple.100', 'purple.100', 'purple.600', 'purple.600'],
								}}
								onClick={() => signIn()}
							>
								Create Account
							</Button>
						)}
					</MenuItems>
				</Flex>
			</Box>
		</Flex>
	);
};

export default Header;
