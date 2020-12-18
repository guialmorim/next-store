import React, { ReactNode } from 'react';
import { SimpleGrid, Flex } from '@chakra-ui/react';

type TProps = { children: ReactNode };

const ProfileLayout: React.FC<TProps> = ({ children }) => (
	<Flex direction="column" align="center" maxW={{ xl: '1200px' }} m="0 auto">
		<SimpleGrid columns={{ sm: 1, md: 2 }} spacingX="7rem" spacingY="4rem">
			{children}
		</SimpleGrid>
	</Flex>
);
export default ProfileLayout;
