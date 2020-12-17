import React from 'react';
import { Flex, Heading, useColorModeValue, Link, Icon } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AiOutlineHeart } from 'react-icons/ai';

const Footer: React.FC = () => {
	const backGroundColorForNavBar = useColorModeValue(
		'purple.200',
		'purple.800'
	);
	const colorForNavBar = useColorModeValue('purple.800', 'purple.200');

	return (
		<Flex
			as="footer"
			align="center"
			justify="center"
			wrap="wrap"
			padding="1.5rem"
			bg={backGroundColorForNavBar}
			color={colorForNavBar}
		>
			<Flex align="center" mr={5}>
				<Heading as="h5" size="md" fontWeight="400">
					Made with <Icon as={AiOutlineHeart} /> by{' '}
					<Link
						href="https://github.com/guialmorim?tab=repositories"
						isExternal
					>
						Guilherme Almorim <ExternalLinkIcon mx="2px" />
					</Link>
				</Heading>
			</Flex>
		</Flex>
	);
};

export default Footer;
