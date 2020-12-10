import React, { ReactNode } from 'react';
import { CartProvider } from 'use-shopping-cart';
import getStripe from '@/utils/get-stripe';
import { CURRENCY } from '@/config';

const Cart = ({ children }: { children: ReactNode }) => (
	<CartProvider
		mode="checkout-session"
		stripe={getStripe()}
		currency={CURRENCY}
	>
		<>{children}</>
	</CartProvider>
);

export default Cart;
