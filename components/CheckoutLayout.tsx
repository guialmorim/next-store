import React, { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

interface ICheckoutLayoutProps {
	children?: ReactNode;
}

const CheckoutLayout: React.FC<ICheckoutLayoutProps> = ({ children }) => (
	<Container>{children}</Container>
);

export default CheckoutLayout;
