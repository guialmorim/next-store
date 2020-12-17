import React, { ReactElement, ReactNode } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export type TAddress = {
	street: string;
	number: number;
	city: string;
	state: string;
	zip: number;
};

type TProps = {
	adresses: Array<TAddress>;
	children?: ReactNode;
};

const Addresses: React.FC<TProps> = ({ adresses }) => {
	return adresses?.length > 0 ? (
		adresses.map((address) => (
			<Box
				key={address.zip}
				m="0 auto"
				rounded="1rem"
				shadow="2xl"
				maxW="sm"
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
							lorem ipsum dolor sit
						</Box>
					</Box>

					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						fasdasdas
					</Box>

					<Box>jhdasjkdjkas</Box>

					<Box mt="1" textAlign="left">
						<Button onClick={() => {}} rightIcon={<ChevronRightIcon />}>
							Edit
						</Button>
					</Box>
				</Box>
			</Box>
		))
	) : (
		<Box>You have no addresses</Box>
	);
};

export default Addresses;
