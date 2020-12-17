import { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Products from '@/components/Products';

const ProductsPage: NextPage = () => (
	<Container>
		<Products />
	</Container>
);

export default ProductsPage;
