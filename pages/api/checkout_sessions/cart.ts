import { NextApiRequest, NextApiResponse } from 'next';
import { validateCartItems } from 'use-shopping-cart/src/serverUtil';
import Stripe from 'stripe';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_PRODUCTS } from '@/config/api/endpoints';

type TProduct = {
	sku: string;
	name: string;
	description: string;
	price: number;
	image: string;
	currency: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2020-08-27',
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const products: Array<TProduct> = await fetchGetJSON(
				process.env.BASE_URL + GET_PRODUCTS
			);

			if (!products || products.length <= 0) {
				res.status(500).json({
					statusCode: 500,
					message: 'Something went wrong with your request',
				});
				return;
			}

			// Validate the cart details that were sent from the client.
			const cartItems = req.body.cartDetails;
			const line_items = validateCartItems(products, cartItems);
			// Create Checkout Sessions from body params.
			const params: Stripe.Checkout.SessionCreateParams = {
				submit_type: 'pay',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				shipping_address_collection: {
					allowed_countries: ['BR', 'US', 'CA'],
				},
				mode: 'payment',
				line_items,
				success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}&order_id=${req.body.orderId}`,
				cancel_url: `${req.headers.origin}/cart`,
			};
			const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
				params
			);

			res.status(200).json(checkoutSession);
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
