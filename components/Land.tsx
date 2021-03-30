import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
	Box,
	Button,
	Flex,
	Image,
	Heading,
	Stack,
	Text,
} from '@chakra-ui/react';

import { ChevronRightIcon } from '@chakra-ui/icons';

type TProps = {
	title?: string;
	subtitle?: string;
	image?: string;
	ctaLink?: string;
	ctaText?: string;
	children?: ReactNode;
};

const Land: React.FC<TProps> = ({
	title,
	subtitle,
	image,
	ctaLink,
	ctaText,
}) => {
	return (
		<Flex
			align="center"
			justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
			direction={{ base: 'column-reverse', md: 'row' }}
			minH="70vh"
			px={8}
			mb={16}
		>
			<Stack
				spacing={4}
				w={{ base: '80%', md: '40%' }}
				align={['center', 'center', 'flex-start', 'flex-start']}
			>
				<Heading
					as="h1"
					size="xl"
					fontWeight="bold"
					color="primary.800"
					textAlign={['center', 'center', 'left', 'left']}
				>
					{title}
				</Heading>
				<Heading
					as="h2"
					size="md"
					color="primary.800"
					opacity={0.8}
					fontWeight="normal"
					lineHeight={1.5}
					textAlign={['center', 'center', 'left', 'left']}
				>
					{subtitle}
				</Heading>
				<Link href={ctaLink!}>
					<Button
						colorScheme="purple"
						borderRadius="8px"
						py="4"
						px="4"
						lineHeight="1"
						size="md"
						rightIcon={<ChevronRightIcon />}
					>
						{ctaText}
					</Button>
				</Link>
				<Text
					fontSize="xs"
					mt={2}
					textAlign="center"
					color="primary.800"
					opacity={0.6}
				>
					Não é necessário cartão de crédito.
				</Text>
			</Stack>
			<Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
				<Image src={image} size="100%" rounded="1rem" shadow="2xl" />
			</Box>
		</Flex>
	);
};

Land.defaultProps = {
	title: 'Um E-Commerce feito com Next Js, Chakra UI e Styled Components',
	subtitle:
		'Esta é a seção do subtítulo, onde você descreve os benefícios básicos do seu produto',
	image: '/landimage.webp',
	ctaText: 'Veja todos os nossos produtos!',
	ctaLink: '/products',
};

export default Land;
