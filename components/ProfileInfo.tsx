import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const ProfileInfo: React.FC = () => (
	<Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
		<Image
			src='https://source.unsplash.com/collection/404339/800x600"'
			size="100%"
			rounded="1rem"
			shadow="2xl"
		/>
	</Box>
);

export default ProfileInfo;
