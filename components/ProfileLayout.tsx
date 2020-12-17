import React, { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

type TProps = { children: ReactNode };

const ProfileLayout: React.FC<TProps> = ({ children }) => (
	<Box mx="10rem">
		<Flex
			align="center"
			justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
			direction={{ base: 'column-reverse', md: 'row' }}
			minH="70vh"
			px={8}
			mb={16}
		>
			{children}
		</Flex>
	</Box>
);
export default ProfileLayout;
