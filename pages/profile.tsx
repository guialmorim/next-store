import { Fragment } from 'react';
import Head from 'next/head';
import { NextPage, GetServerSideProps } from 'next';
import Address, { TAddress } from '@/components/Address';
import ProfileInfo from '@/components/ProfileInfo';
import { fetchGetJSON } from '@/utils/api-helpers';
import { GET_USER } from '@/config/api/endpoints';
import { getSession } from 'next-auth/client';
import { Heading, Stack, Box, SimpleGrid, Flex } from '@chakra-ui/react';

interface IUser {
	user: {
		adresses: Array<TAddress>;
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

	const endpoint = `${process.env.BASE_URL}${GET_USER}/${session?.user?.email}`;
	console.log(endpoint);
	const { statusCode, message, data, error } = await fetchGetJSON(endpoint);

	if (statusCode !== 200) {
		console.log('error', error);
		console.log('message', message);

		return {
			notFound: true,
		};
	}

	return {
		props: {
			user: data,
		},
	};
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
						<Address adresses={user.adresses} />
					</Stack>
				</Box>
			</SimpleGrid>
		</Flex>
	</Fragment>
);

export default Profile;
