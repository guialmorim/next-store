import React, { ReactNode } from 'react';
import { CartProvider as CartProviderShoppingCart } from 'use-shopping-cart';
import getStripe from '@/utils/get-stripe';
import { CURRENCY } from '@/config/stripe';

const CartProvider = ({ children }: { children: ReactNode }) => (
	<CartProviderShoppingCart
		mode="checkout-session"
		stripe={getStripe()}
		currency={CURRENCY}
	>
		<>{children}</>
	</CartProviderShoppingCart>
);

export default CartProvider;
