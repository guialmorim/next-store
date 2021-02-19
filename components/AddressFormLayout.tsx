import React from 'react';
import Link from 'next/link';
import {
	Flex,
	SimpleGrid,
	Box,
	Stack,
	Heading,
	Tag,
	TagLeftIcon,
	TagLabel,
} from '@chakra-ui/react';

import { ArrowLeftIcon } from '@chakra-ui/icons';

const AddressFormLayout: React.FC = ({ children }) => (
	<Flex direction="column" align="center" maxW={{ xl: '1200px' }} m="0 auto">
		<SimpleGrid columns={1} spacingX="7rem" spacingY="4rem">
			<Box>
				<Stack spacing={2}>
					<Heading
						as="h2"
						size="lg"
						fontWeight="bold"
						color="primary.800"
						textAlign={['center', 'center', 'left', 'left']}
					>
						Change your address and save
					</Heading>
					<Link href="/profile">
						<Tag
							size="md"
							variant="subtle"
							colorScheme="purple"
							mb={4}
							w={20}
							cursor="pointer"
						>
							<TagLeftIcon as={ArrowLeftIcon} />
							<TagLabel>Back</TagLabel>
						</Tag>
					</Link>
					{children}
				</Stack>
			</Box>
		</SimpleGrid>
	</Flex>
);

export default AddressFormLayout;
