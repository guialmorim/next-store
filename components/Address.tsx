import React, { ReactNode } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { ConfirmationAlert } from '@/components/Alert';
import { Toast } from '@/utils/toast';
import Link from 'next/link';
import { fetchPostJSON } from '@/utils/api-helpers';
import { DELETE_ADDRESS } from '@/config/api/endpoints';
import { useRouter } from 'next/router';

export type TAddress = {
	_id?: string;
	street: string;
	number: number;
	city: string;
	state: string;
	zip: number;
	user: string | undefined;
};

type TProps = {
	addresses: Array<TAddress>;
	children?: ReactNode;
};

const Addresses: React.FC<TProps> = ({ addresses }) => {
	const router = useRouter();

	const OnDeleteAddress = async (id: string) => {
		const sure = await ConfirmationAlert(
			'Atenção',
			'Tem certeza que deseja apagar este endereço?'
		);
		if (sure) {
			const { message, statusCode, data } = await fetchPostJSON(
				`${DELETE_ADDRESS}/${id}`,
				'DELETE'
			);
			if (statusCode === 200) {
				Toast({
					title: 'aww yeah!',
					description: message,
					status: 'success',
				});
				router.push('/profile');
			} else {
				Toast({
					title: 'Oops!',
					description: message,
					status: 'error',
				});
			}
		}
	};

	return (
		<>
			{addresses?.length > 0 ? (
				addresses.map((address) => (
					<Box
						key={address._id}
						m="0 auto"
						rounded="1rem"
						shadow="2xl"
						w="20rem"
						maxW="20rem"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
					>
						<Box p="6">
							<Box d="flex" alignItems="baseline">
								<Box
									color="gray.500"
									fontWeight="semibold"
									letterSpacing="wide"
									fontSize="xs"
									textTransform="uppercase"
									ml="2"
								>
									Cep: {address.zip}
								</Box>
							</Box>

							<Box
								mt="1"
								fontWeight="semibold"
								as="h4"
								lineHeight="tight"
								isTruncated
							>
								{address.street} - {address.number}
							</Box>

							<Box>
								{address.city} - {address.state}
							</Box>

							<Box display="flex" justifyContent="space-between" mt="3">
								<Link href={`address/${address._id}`}>
									<Button
										size="sm"
										colorScheme="purple"
										rightIcon={<EditIcon />}
									>
										Editar
									</Button>
								</Link>

								<Button
									size="sm"
									colorScheme="red"
									color="white"
									onClick={() => OnDeleteAddress(address._id!)}
								>
									<DeleteIcon />
								</Button>
							</Box>
						</Box>
					</Box>
				))
			) : (
				<Box>Você não possui endereços cadastrados</Box>
			)}
			<Box
				m="0 auto"
				rounded="1rem"
				shadow="2xl"
				w="20rem"
				maxW="20rem"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
			>
				<Box p="6">
					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						Criar novo endereço
					</Box>

					<Box fontSize="sm">
						registre um novo endereço para que possamos entregar seu produto!
					</Box>

					<Box mt="3" textAlign="left">
						<Link href="/address/new">
							<Button size="sm" colorScheme="purple" rightIcon={<AddIcon />}>
								Criar novo endereço
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Addresses;
