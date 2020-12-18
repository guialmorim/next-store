import { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import Products from '@/components/Products';
import ProductsLayout from '@/components/ProductsLayout';
import { GetStaticProps } from 'next';
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

interface IProductProps {
	products?: Array<TProduct>;
	preview?: boolean;
}

export const getStaticProps: GetStaticProps = async () => {
	const products: Array<TProduct> = await fetchGetJSON(
		process.env.BASE_URL + GET_PRODUCTS
	);
	return {
		props: { products },
	};
};

const ProductsPage: NextPage<IProductProps> = ({ products }) => (
	<ProductsLayout>
		<Heading
			as="h1"
			size="xl"
			fontWeight="bold"
			color="primary.800"
			textAlign={['center', 'center', 'left', 'left']}
			mb={7}
		>
			Our Products
		</Heading>
		<Products products={products} />
	</ProductsLayout>
);

export default ProductsPage;
