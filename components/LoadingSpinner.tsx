import React from 'react';
import { Spinner } from '@chakra-ui/react';

type TProps = {
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const LoadingSpinner: React.FC<TProps> = (props) => (
	<Spinner color="purple.500" {...props} />
);

export default LoadingSpinner;
