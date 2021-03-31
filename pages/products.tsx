import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Products from '@/components/Products';
import { GetStaticProps } from 'next';
import connect from '@/utils/database';
import Product from '@/Models/product';

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
	try {
		connect();
		const products = await Product.find();
		console.log(products);
		return {
			props: { products: JSON.parse(JSON.stringify(products)) },
		};
	} catch (error) {
		console.log(error);
		return {
			props: {},
		};
	}
};

const ProductsPage: NextPage<IProductProps> = ({ products }) => (
	<Fragment>
		<Head>
			<title>Next Store | Produtos</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Box
			alignItems="center"
			justifyItems="center"
			mx="auto"
			p="5"
			bg="transparent"
			maxW="80rem"
			mt="calc(10vh + 2rem)"
			mb="5rem"
		>
			<Heading
				as="h1"
				size="xl"
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
				mb={7}
			>
				Nossos Produtos
			</Heading>
			<Products products={products} />
		</Box>
	</Fragment>
);

export default ProductsPage;
