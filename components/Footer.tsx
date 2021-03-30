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
			color="#722fb7"
			bg="#ffffff"
			boxShadow="3px 0 10px 3px #888888"
		>
			<Flex align="center" mr={5}>
				<Heading as="h6" size="sm" fontWeight="300">
					Feito com <Icon as={AiOutlineHeart} /> por{' '}
					<Link href="https://github.com/guialmorim" isExternal>
						Guilherme Almorim <ExternalLinkIcon mx="2px" />
					</Link>
				</Heading>
			</Flex>
		</Flex>
	);
};

export default Footer;
