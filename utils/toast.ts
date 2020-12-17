import { createStandaloneToast } from '@chakra-ui/react';

interface IToastProps {
	title: string;
	description: string;
	status: 'info' | 'warning' | 'success' | 'error';
}

const toast = createStandaloneToast();

export const Toast = (props: IToastProps) => {
	toast({
		title: props.title,
		description: props.description,
		status: props.status,
		duration: 5000,
		isClosable: true,
		position: 'top-left',
	});
};
