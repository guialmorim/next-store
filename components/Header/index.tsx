import Link from 'next/link';
import { useState, FC, ReactNode } from 'react';
import * as Styled from './styles';
import { useSession, signIn, signOut } from 'next-auth/client';
import { useShoppingCart } from 'use-shopping-cart';
import {
	AiOutlineShoppingCart,
	AiOutlineUser,
	AiOutlineLogout,
	AiOutlineLogin,
} from 'react-icons/ai';
import { CartNotification } from '@/styled/Cart';

interface IProps {
	children?: ReactNode;
	OpenCartDrawer: () => void;
}

const Header: FC<IProps> = ({ OpenCartDrawer }) => {
	const [session, loading] = useSession();
	const { cartCount } = useShoppingCart();
	const [mobileOpen, setMobileOpen] = useState(false);
	return (
		<Styled.Nav>
			<Styled.Navlogo>
				<Link href="/">
					<a>
						<h4>Next Store</h4>
					</a>
				</Link>
			</Styled.Navlogo>
			<Styled.NavLinks Open={mobileOpen}>
				<Styled.Link Open={mobileOpen} animationTiming={1 + 0.5}>
					{/* {session && session.user && ( */}
					{true && (
						<a onClick={OpenCartDrawer}>
							Carrinho <AiOutlineShoppingCart style={{ display: 'inline' }} />
							{cartCount > 0 && (
								<CartNotification>{cartCount}</CartNotification>
							)}
						</a>
					)}
				</Styled.Link>
				<Styled.Link Open={mobileOpen} animationTiming={3 + 0.5}>
					{session && session.user ? (
						<Link href="/profile">
							<a>
								{session.user.name}{' '}
								<AiOutlineUser style={{ display: 'inline' }} />
							</a>
						</Link>
					) : (
						<a onClick={() => signIn()}>
							Criar Conta / Login{' '}
							<AiOutlineLogin style={{ display: 'inline' }} />
						</a>
					)}
				</Styled.Link>
				{session && session.user && (
					<Styled.Link Open={mobileOpen} animationTiming={4 + 0.5}>
						<a onClick={() => signOut()}>
							Sair <AiOutlineLogout style={{ display: 'inline' }} />
						</a>
					</Styled.Link>
				)}
			</Styled.NavLinks>
			<Styled.Burguer
				Open={mobileOpen}
				onClick={() => setMobileOpen(!mobileOpen)}
			>
				<div className="line1"></div>
				<div className="line2"></div>
				<div className="line3"></div>
			</Styled.Burguer>
		</Styled.Nav>
	);
};

export default Header;
