import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchGetJSON } from '../utils/api-helpers';
import useSWR from 'swr';
import { Box, Heading, Button, Text } from '@chakra-ui/react';
import CheckoutLayout from '@/components/CheckoutLayout';
import { ChevronLeftIcon } from '@chakra-ui/icons';

const ResultPage: NextPage = () => {
	const router = useRouter();

	// Fetch CheckoutSession from static page via
	const { data, error } = useSWR(
		router.query.session_id
			? `/api/checkout_sessions/${router.query.session_id}`
			: null,
		fetchGetJSON
	);

	if (error) return <div>failed to load</div>;

	return (
		<CheckoutLayout>
			<Box maxW="32rem">
				<Heading as="h1" mb={8}>
					Checkout Payment Result
				</Heading>

				{data?.payment_intent?.status === 'succeeded' && (
					<Box>
						<Heading as="h2" size="md">
							Whoa! Congrats!
						</Heading>
						<Heading as="h4" size="sm">
							Your payment has been confirmed.
						</Heading>
					</Box>
				)}

				<Text fontSize="md" mt={5}>
					Status: {data?.payment_intent?.status ?? <LoadingSpinner />}
				</Text>

				<Link href="/">
					<Button
						size="lg"
						colorScheme="purple"
						mt="24px"
						rightIcon={<ChevronLeftIcon />}
					>
						Back to Home
					</Button>
				</Link>
			</Box>
		</CheckoutLayout>
	);
};

export default ResultPage;
