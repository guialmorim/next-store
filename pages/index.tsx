import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import LandingLayout from '@/components/LandingLayout';
import Products from '@/components/Products';
import ProductsLayout from '@/components/ProductsLayout';
import Land from '@/components/Land';
import Footer from '@/components/Footer';
import { GetStaticProps } from 'next';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_PRODUCTS } from '@/config/api/endpoints';
import { Box, Heading, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

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
		process.env.BASE_URL + GET_PRODUCTS,
		'GET'
	);
	return {
		props: { products },
	};
};

const Home: NextPage<IProductProps> = ({ products }) => (
	<>
		<Head>
			<title>Next Store</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<LandingLayout>
			<Land />
		</LandingLayout>
		<ProductsLayout>
			<Heading
				as="h1"
				size="xl"
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
				mb={10}
			>
				Check out the amazing products that we have
			</Heading>
			<Products products={products} preview={true} />
			<Box my="2rem">
				<Link href="/products">
					<Button
						colorScheme="purple"
						borderRadius="8px"
						py="4"
						px="4"
						lineHeight="1"
						size="md"
						rightIcon={<ChevronRightIcon />}
					>
						Show me all your products!
					</Button>
				</Link>
			</Box>
		</ProductsLayout>
		<Footer />
	</>
);

export default Home;
