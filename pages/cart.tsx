import { Fragment, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import CartSummary from '@/components/CartSummary';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { GET_ADRESS, GET_USER } from '@/config/api/endpoints';
import { fetchGetJSON } from '@/utils/api-helpers';
import { TAddress } from '@/components/Address';
import AddressSelector from '@/components/AddressSelector';
import { Container } from '@chakra-ui/react';

export interface IUser {
	user: {
		addresses: Array<TAddress>;
		_id: string;
		name: string;
		email: string;
		image: string;
		createdAt: string;
		updatedAt: string;
	};
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	let endpoint = `${process.env.BASE_URL}${GET_USER}/${session?.user?.email}`;
	const { statusCode, message, data: user, error } = await fetchGetJSON(
		endpoint
	);

	if (statusCode !== 200) {
		console.log('error', error);
		console.log('message', message);
		return {
			notFound: true,
		};
	} else {
		endpoint = `${process.env.BASE_URL}${GET_ADRESS}${user._id}`;
		const { data } = await fetchGetJSON(endpoint);
		user.addresses = data;
		return {
			props: {
				user: user,
			},
		};
	}
};

const Cart: NextPage<IUser> = (props) => {
	const [selectedAdr, setSelectedAdr] = useState('');
	return (
		<Fragment>
			<Head>
				<title>Next Store | Carrinho</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container marginTop="calc(10vh + 2rem)">
				<AddressSelector
					selectedAdr={selectedAdr}
					setSelectedAdr={setSelectedAdr}
					addresses={props.user.addresses}
				/>
				<CartSummary selectedAdr={selectedAdr} user={props} />
			</Container>
		</Fragment>
	);
};

export default Cart;
