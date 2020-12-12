import React, { ReactNode } from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface IProps {
	title: string;
	description: string;
	imageUrl: string;
	badge?: boolean;
	children?: ReactNode;
	addItemToCart: () => void;
	removeItemToCart: () => void;
	reviewCount: number;
	rating: number;
}

const Card: React.FC<IProps> = (props: IProps) => {
	return (
		<Box
			m="0 auto"
			rounded="1rem"
			shadow="2xl"
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			bg="white"
		>
			<Image src={props.imageUrl} alt={props.imageUrl} />
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
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						lorem ipsum dolor sit
					</Box>
				</Box>

				<Box
					mt="1"
					fontWeight="semibold"
					as="h4"
					lineHeight="tight"
					isTruncated
				>
					{props.title}
				</Box>

				<Box>{props.description}</Box>

				<Box d="flex" mt="2" alignItems="center">
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < props.rating ? 'teal.500' : 'gray.300'}
							/>
						))}
					<Box as="span" ml="2" color="gray.600" fontSize="sm">
						{props.reviewCount} reviews
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Card;
