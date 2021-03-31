import { TAddress } from '@/components/Address';
import React, { Fragment, ReactNode } from 'react';
import { Button, Box, Flex, Icon, Heading } from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

import Link from 'next/link';

interface IProps {
	addresses: TAddress[];
	children?: ReactNode;
	setSelectedAdr: (id: string) => void;
	selectedAdr: string;
}

const AddressSelector: React.FC<IProps> = ({
	addresses,
	selectedAdr,
	setSelectedAdr,
}) => {
	return (
		<Fragment>
			<Heading
				as="h2"
				size="lg"
				mb={5}
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
			>
				Selecione o endereço:
			</Heading>
			<Flex wrap="wrap" mb={5} flexDirection="column" alignItems="start">
				{addresses.length > 0 ? (
					addresses.map((ad) => (
						<Box
							key={ad._id}
							mb="2rem"
							rounded="1rem"
							shadow="lg"
							borderRadius="lg"
							overflow="hidden"
							onClick={() => setSelectedAdr(ad._id!)}
							bgColor={selectedAdr === ad._id ? 'lightgray' : ''}
							w="100%"
						>
							<Box p="4">
								<Box d="flex" alignItems="baseline">
									<Box
										color="gray.500"
										fontWeight="semibold"
										letterSpacing="wide"
										fontSize="xs"
										textTransform="uppercase"
										ml="2"
									>
										{selectedAdr === ad._id && (
											<Icon cursor="pointer" as={CheckIcon} color="green.400" />
										)}{' '}
										Cep: {ad.zip}
									</Box>
								</Box>
								<Box mt="1" fontWeight="semibold" lineHeight="tight">
									{ad.street} - {ad.number}
								</Box>
								<Box>
									{ad.city} - {ad.state}
								</Box>
							</Box>
						</Box>
					))
				) : (
					<>
						<Box>Você não possui endereços cadastrados</Box>

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
									registre um novo endereço para que possamos entregar seu
									produto!
								</Box>

								<Box mt="3" textAlign="left">
									<Link href="/address/new">
										<Button
											size="sm"
											colorScheme="purple"
											rightIcon={<AddIcon />}
										>
											Criar novo endereço
										</Button>
									</Link>
								</Box>
							</Box>
						</Box>
					</>
				)}
			</Flex>
		</Fragment>
	);
};

export default AddressSelector;
