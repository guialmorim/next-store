import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import AddressForm from '@/components/AddressForm';
import Link from 'next/link';
import {
	Flex,
	SimpleGrid,
	Box,
	Stack,
	Heading,
	Tag,
	TagLeftIcon,
	TagLabel,
} from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { GET_ADRESS, GET_USER } from '@/config/api/endpoints';
import { TAddress } from '@/components/Address';
import { getSession } from 'next-auth/client';
import { fetchGetJSON } from '@/utils/api-helpers';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	const id = ctx.params?.id;

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
	}

	if (id !== 'new') {
		endpoint = `${process.env.BASE_URL}${GET_ADRESS}${user._id}`;
		const { statusCode, message, data: adrs, error } = await fetchGetJSON(
			endpoint
		);

		if (statusCode !== 200) {
			console.log('error', error);
			console.log('message', message);

			return {
				notFound: true,
			};
		}

		if (!adrs || adrs?.length <= 0) {
			return {
				notFound: true,
			};
		}

		const address: TAddress = adrs.find((adr: TAddress) => adr._id === id);
		address.user = user._id;

		return {
			props: {
				address: address,
			},
		};
	} else {
		return {
			props: {
				address: {
					street: '',
					number: null,
					city: '',
					state: '',
					zip: null,
					user: user._id,
				},
			},
		};
	}
};

interface IProps {
	address: TAddress;
}

const Profile: NextPage<IProps> = ({ address }) => {
	return (
		<React.Fragment>
			<Head>
				<title>
					Next Store | {address._id ? 'Editar Endereço' : 'Criar Endereço'}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				direction="column"
				align="center"
				maxW={{ xl: '1200px' }}
				m="calc(10vh + 2rem) auto"
			>
				<SimpleGrid columns={1} spacingX="7rem" spacingY="4rem">
					<Box>
						<Stack spacing={2}>
							<Heading
								as="h2"
								size="lg"
								fontWeight="bold"
								color="primary.800"
								textAlign={['center', 'center', 'left', 'left']}
							>
								{address._id ? 'Edite seu endereço' : 'Crie um novo endereço'}
							</Heading>
							<Link href="/profile">
								<Tag
									size="md"
									variant="subtle"
									colorScheme="purple"
									mb={4}
									w={20}
									cursor="pointer"
								>
									<TagLeftIcon as={ArrowLeftIcon} />
									<TagLabel>Voltar</TagLabel>
								</Tag>
							</Link>
							<AddressForm address={address} />
						</Stack>
					</Box>
				</SimpleGrid>
			</Flex>
		</React.Fragment>
	);
};

export default Profile;
