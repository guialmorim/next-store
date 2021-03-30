import React, { ReactNode } from 'react';
import { Box, Image, Badge, Button, Text, Flex } from '@chakra-ui/react';

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
	return (
		<Flex
			flexDirection="column"
			m="0 auto"
			rounded="1rem"
			shadow="2xl"
			borderRadius="lg"
		>
			<Image src={props.imageUrl} alt={props.imageUrl} w="20rem" h="17rem" />
			<Flex flexDirection="column" p="6" flex="1">
				<Flex justifyContent="space-between" alignItems="center">
					<Text letterSpacing="wide" fontSize="lg" fontWeight="bold">
						{props.title}
					</Text>
					<Text letterSpacing="wide" fontSize="md" textTransform="uppercase">
						{props.currency}
					</Text>
				</Flex>

				<Box flex="1" lineHeight="tight" fontSize="sm" my="1rem">
					{props.description}
				</Box>

				<Button colorScheme="purple" onClick={props.addItemToCart}>
					Adicionar ao carrinho
				</Button>
			</Flex>
		</Flex>
	);
};

export default Card;
