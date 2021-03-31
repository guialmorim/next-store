import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import { IOrder } from '@/Models/order';
import Address, { TAddress } from '@/components/Address';
import Orders from '@/components/Orders';
import ProfileInfo from '@/components/ProfileInfo';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_ADRESS, GET_ORDERS, GET_USER } from '@/config/api/endpoints';
import { getSession } from 'next-auth/client';
import { Heading, Stack, Box, SimpleGrid, Flex } from '@chakra-ui/react';

interface IUser {
	user: {
		addresses: Array<TAddress>;
		orders: Array<IOrder>;
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
		const { data: adrs } = await fetchGetJSON(endpoint);
		user.addresses = adrs;

		endpoint = `${process.env.BASE_URL}${GET_ORDERS}${user._id}`;
		const { data: orders } = await fetchGetJSON(endpoint);
		user.orders = orders;

		return {
			props: {
				user: user,
			},
		};
	}
};

const Profile: NextPage<IUser> = ({ user }) => (
	<Fragment>
		<Head>
			<title>Next Store | Perfil</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Flex
			direction="column"
			align="center"
			maxW={{ xl: '1200px' }}
			m="0 auto"
			mb={6}
		>
			<SimpleGrid columns={{ sm: 1, md: 2 }} spacingX="7rem" spacingY="4rem">
				<Box marginTop="calc(10vh + 2rem)">
					<Stack spacing={4}>
						<Heading
							as="h2"
							size="lg"
							fontWeight="bold"
							color="primary.800"
							textAlign={['center', 'center', 'left', 'left']}
						>
							Suas Informações
						</Heading>
						<ProfileInfo />
						<Heading
							as="h2"
							size="lg"
							fontWeight="bold"
							color="primary.800"
							textAlign={['center', 'center', 'left', 'left']}
						>
							Seus Pedidos
						</Heading>
						<Orders orders={user.orders} />
					</Stack>
				</Box>
				<Box marginTop="calc(10vh + 2rem)">
					<Stack
						spacing={4}
						align={['center', 'center', 'flex-start', 'flex-start']}
					>
						<Heading
							as="h2"
							size="lg"
							fontWeight="bold"
							color="primary.800"
							textAlign={['center', 'center', 'left', 'left']}
						>
							Seus Endereços
						</Heading>
						<Address addresses={user.addresses} />
					</Stack>
				</Box>
			</SimpleGrid>
		</Flex>
	</Fragment>
);

export default Profile;
