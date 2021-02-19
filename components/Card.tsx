import React, { ReactNode } from 'react';
import { Box, Image, Badge, Button, useColorModeValue } from '@chakra-ui/react';

interface IProps {
	title: string;
	description: string;
	currency: string;
	imageUrl: string;
	badge?: boolean;
	children?: ReactNode;
	addItemToCart: () => void;
	removeItemFromCart: () => void;
}

const Card: React.FC<IProps> = (props: IProps) => {
	const backGroundColorForItems = useColorModeValue('purple.300', 'purple.700');
	const colorForItems = useColorModeValue('purple.700', 'purple.300');

	return (
		<Box
			m="0 auto"
			rounded="1rem"
			shadow="2xl"
			maxW="sm"
			maxH="xl"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
		>
			<Image src={props.imageUrl} alt={props.imageUrl} w="20rem" h="17rem" />
			{props.badge && (
				<Badge borderRadius="full" px="2" colorScheme="teal">
					New
				</Badge>
			)}
			<Box p="6">
				<Box d="flex" alignItems="baseline">
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="sm"
						textTransform="uppercase"
						ml="2"
					>
						{props.currency}
					</Box>
				</Box>

				<Box
					mt="1"
					fontWeight="semibold"
					as="h3"
					lineHeight="tight"
					fontSize="md"
				>
					{props.title}
				</Box>

				<Box lineHeight="tight" fontSize="xs" mt="0.5rem">
					{props.description}
				</Box>

				<Box mt="1rem" textAlign="left">
					<Button colorScheme="purple" onClick={props.addItemToCart}>
						Add to cart
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Card;
