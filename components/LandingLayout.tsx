import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

type TProps = { children: ReactNode };

const LandingLayout: React.FC<TProps> = (props) => (
	<Flex
		direction="column"
		align="center"
		maxW={{ xl: '1200px' }}
		m="0 auto"
		{...props}
	>
		{props.children}
	</Flex>
);

export default LandingLayout;
