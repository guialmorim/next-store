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
	Skeleton,
} from '@chakra-ui/react';
import CheckoutLayout from '@/components/CheckoutLayout';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import ClearCart from '@/components/ClearCart';

const ResultPage: NextPage = () => {
	const router = useRouter();

	// Fetch CheckoutSession from static page via
	const { data, error } = useSWR(
		router.query.session_id
			? `/api/checkout_sessions/${router.query.session_id}`
			: null,
		fetchGetJSON
	);

	if (error || data?.statusCode === 500) {
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
		<>
			{data?.payment_intent?.status ? (
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
						<AlertTitle mt={4} mb={1}>
							<Heading as="h1" size="lg">
								Whoa! Congrats!
							</Heading>
						</AlertTitle>
						<AlertDescription maxWidth="sm">
							{data?.payment_intent?.status === 'succeeded' && (
								<Box>
									<Heading as="h4" size="sm">
										Your payment has been confirmed.
									</Heading>
								</Box>
							)}

							<Text fontSize="md" mt={5}>
								Status: {data?.payment_intent?.status ?? <LoadingSpinner />}
							</Text>
							<Text fontSize="md" mt={2}>
								<ClearCart />
							</Text>
							<Link href="/">
								<Button size="md" mt="24px" rightIcon={<ArrowLeftIcon />}>
									Back to Home
								</Button>
							</Link>
						</AlertDescription>
					</Alert>
				</CheckoutLayout>
			) : (
				<CheckoutLayout>
					<Alert
						status="warning"
						variant="subtle"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						textAlign="center"
						height="auto"
					>
						<AlertIcon boxSize="40px" mr={0} />
						<AlertDescription maxWidth="sm" mt={2}>
							<Text fontSize="md" mt={5}>
								<LoadingSpinner />
							</Text>
						</AlertDescription>
					</Alert>
				</CheckoutLayout>
			)}
		</>
	);
};

export default ResultPage;
