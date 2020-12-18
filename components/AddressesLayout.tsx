import React from 'react';
import { Heading, Stack, Box } from '@chakra-ui/react';

const AdressesLayout: React.FC = ({ children }) => (
	<Box>
		<Stack spacing={4} align={['center', 'center', 'flex-start', 'flex-start']}>
			<Heading
				as="h2"
				size="lg"
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
			>
				Your Addresses
			</Heading>
			{children}
		</Stack>
	</Box>
);

export default AdressesLayout;
