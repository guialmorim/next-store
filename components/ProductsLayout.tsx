import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type TProps = {
	children: ReactNode;
};

const ProductsLayout: React.FC<TProps> = ({ children }) => {
	//const bg = useColorModeValue('purple.100', 'purple.900');
	//const color = useColorModeValue('purple.900', 'purple.100');

	return (
		<Box
			alignItems="center"
			justifyItems="center"
			mx="auto"
			p="5"
			bg="transparent"
			maxW="80rem"
			my="5rem"
		>
			{children}
		</Box>
	);
};

export default ProductsLayout;
