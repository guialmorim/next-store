import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchGetJSON } from '@/utils/api-helpers';
import useSWR from 'swr';
import {
	Box,
	Heading,
	Button,
	Text,
	Alert,
	AlertDescription,
	AlertTitle,
	AlertIcon,
	Container,
} from '@chakra-ui/react';
import CheckoutLayout from '@/components/CheckoutLayout';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const ResultPage: NextPage = () => {
	const router = useRouter();

	// Fetch CheckoutSession from static page via
	const { data, error } = useSWR(
		router.query.session_id
			? `/api/checkout_sessions/${router.query.session_id}`
			: null,
		fetchGetJSON
	);

	if (error) {
		return (
			<Container>
				<Alert
					status="error"
					variant="subtle"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					height="auto"
				>
					<AlertIcon boxSize="40px" mr={0} />
					<AlertTitle mt={4} mb={1} fontSize="lg">
						Failed to load!
					</AlertTitle>
					<AlertDescription maxWidth="sm">
						There was an error processing your request
					</AlertDescription>
					<AlertDescription maxWidth="sm">
						Please, go back and try again
					</AlertDescription>
					<Link href="/">
						<Button size="sm" mt="1rem" rightIcon={<ArrowLeftIcon />}>
							Back to Home
						</Button>
					</Link>
				</Alert>
			</Container>
		);
	}

	return (
		<CheckoutLayout>
			<Alert
				status="success"
				variant="subtle"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				height="auto"
			>
				<AlertIcon boxSize="40px" mr={0} />
				<AlertTitle mt={4} mb={1} fontSize="lg">
					Checkout Payment Result
				</AlertTitle>
				<AlertDescription maxWidth="sm">
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
						<Button size="md" mt="24px" rightIcon={<ArrowLeftIcon />}>
							Back to Home
						</Button>
					</Link>
				</AlertDescription>
			</Alert>
		</CheckoutLayout>
	);
};

export default ResultPage;
