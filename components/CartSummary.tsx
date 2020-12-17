import React, { useState, useEffect } from 'react';
import { fetchPostJSON } from '@/utils/api-helpers';
import { useShoppingCart } from 'use-shopping-cart';
import { Container, Button } from '@chakra-ui/react';
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
	} = useShoppingCart();

	useEffect(() => setCartEmpty(!cartCount), [cartCount]);

	const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		setLoading(true);

		console.log('cartDetails', cartDetails);

		const response = await fetchPostJSON(
			'/api/checkout_sessions/cart',
			'POST',
			cartDetails
		);

		if (response.statusCode === 500) {
			console.error(response.message);
			return;
		}

		redirectToCheckout({ sessionId: response.id });
	};

	const onClearCart = () => {
		clearCart();
		Toast({
			title: 'Aww yeah!',
			description: 'Cart Cleared',
			status: 'success',
		});
	};

	return (
		<Container>
			<form onSubmit={handleCheckout}>
				<h2>Cart summary</h2>
				{/* This is where we'll render our cart */}
				<p suppressHydrationWarning>
					<strong>Number of Items:</strong> {cartCount}
				</p>
				<p suppressHydrationWarning>
					<strong>Total:</strong> {formattedTotalPrice}
				</p>

				{loading && <h2>LOADING...</h2>}
				<Button type="submit" disabled={cartEmpty || loading}>
					Checkout
				</Button>
				<Button type="button" onClick={onClearCart}>
					Clear Cart
				</Button>
			</form>
		</Container>
	);
};

export default CartSummary;
