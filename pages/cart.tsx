import { Fragment } from 'react';
import { NextPage } from 'next';
import CartSummary from '@/components/CartSummary';
import Head from 'next/head';

const Cart: NextPage = () => (
	<Fragment>
		<Head>
			<title>Next Store | Carrinho</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<CartSummary />
	</Fragment>
);

export default Cart;
