import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import Products from '@/components/Products';
import Land from '@/components/Land';
import { GetStaticProps } from 'next';
import { Box, Heading, Button, Flex, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Footer from '@/components/Footer';
// import connect from '@/utils/database';
// import Product from '@/Models/product';
import { products } from '@/config/products';

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
	// try {
	// 	connect();
	// 	const products = await Product.find();
	// 	console.log(products);
	// 	return {
	// 		props: { products: JSON.parse(JSON.stringify(products)) },
	// 	};
	// } catch (error) {
	// 	console.log(error);
	// 	return {
	// 		props: {},
	// 	};
	// }
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
		<Flex
			direction="column"
			align="center"
			maxW={{ xl: '1200px' }}
			m="10vh auto"
		>
			<Land />
		</Flex>
		<Box
			alignItems="center"
			justifyItems="center"
			mx="auto"
			p="5"
			bg="transparent"
			maxW="80rem"
			my="5rem"
		>
			<Heading
				as="h1"
				size="xl"
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
				mb={10}
			>
				Confira os produtos incríveis que temos!
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
						Mostre-me todos os produtos!
					</Button>
				</Link>
			</Box>
		</Box>
		<Footer />
	</>
);

export default Home;
