import Head from 'next/head';
import { NextPage } from 'next';
import LandingLayout from '@/components/LandingLayout';
import Products from '@/components/Products';
import ProductsLayout from '@/components/ProductsLayout';
import Land from '@/components/Land';

const Home: NextPage = () => (
	<>
		<Head>
			<title>Next Store</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<LandingLayout>
			<Land />
		</LandingLayout>
		<ProductsLayout>
			<Products />
		</ProductsLayout>
	</>
);

export default Home;
