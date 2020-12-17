import React from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import Address from './Address';

const AdressesLayout: React.FC = ({ children }) => (
	<Stack
		spacing={4}
		w={{ base: '80%', md: '40%' }}
		align={['center', 'center', 'flex-start', 'flex-start']}
	>
		<Heading
			as="h1"
			size="xl"
			fontWeight="bold"
			color="primary.800"
			textAlign={['center', 'center', 'left', 'left']}
		>
			Your Addresses
		</Heading>
		{children}
	</Stack>
);

export default AdressesLayout;
