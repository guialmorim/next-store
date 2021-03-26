import React, { ReactNode } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';

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
	adresses: Array<TAddress>;
	children?: ReactNode;
};

const Addresses: React.FC<TProps> = ({ adresses }) => {
	return (
		<>
			{adresses?.length > 0 ? (
				adresses.map((address) => (
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
									Zip: {address.zip}
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

							<Box mt="1" textAlign="left">
								<Link href={`address/${address._id}`}>
									<Button
										size="sm"
										colorScheme="purple"
										rightIcon={<ChevronRightIcon />}
									>
										Edit
									</Button>
								</Link>
							</Box>
						</Box>
					</Box>
				))
			) : (
				<Box>You have no addresses</Box>
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
						Create a new address
					</Box>

					<Box fontSize="sm">
						register an address so we can deliver your amazing product
					</Box>

					<Box mt="1" textAlign="left">
						<Link href="/address/new">
							<Button size="sm" colorScheme="purple" rightIcon={<AddIcon />}>
								Create new address
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Addresses;
