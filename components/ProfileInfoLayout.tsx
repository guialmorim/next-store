import React from 'react';
import { Heading, Stack, Box } from '@chakra-ui/react';

const ProfileInfoLayout: React.FC = ({ children }) => (
	<Box>
		<Stack spacing={4}>
			<Heading
				as="h2"
				size="lg"
				fontWeight="bold"
				color="primary.800"
				textAlign={['center', 'center', 'left', 'left']}
			>
				Your Information
			</Heading>
			{children}
		</Stack>
	</Box>
);

export default ProfileInfoLayout;
