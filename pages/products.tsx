import { NextPage } from 'next';
import Cart from '@/components/Cart';
import CartSummary from '@/components/CartSummary';
import ProductsPage from '@/components/Products';

const Products: NextPage = () => (
	<div className="page-container">
		<h1>Shopping Cart</h1>
		<p>
			Powered by the <a href="https://useshoppingcart.com">use-shopping-cart</a>{' '}
			React hooks library.
		</p>
		<Cart>
			<CartSummary />
			<ProductsPage />
		</Cart>
	</div>
);

export default Products;
