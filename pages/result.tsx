import { NextPage } from 'next';
import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
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

	const { data: updatedOrder, error: updatedOrderError } = useSWR(
		router.query.order_id
			? `/api/checkout_sessions/order/${router.query.order_id}`
			: null,
		fetchGetJSON
	);

	if (error || data?.statusCode === 500) {
		return (
			<Fragment>
				<Head>
					<title>Next Store | Pagamento</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Container mt="calc(10vh + 2rem)">
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
							Falha ao carregar!
						</AlertTitle>
						<AlertDescription maxWidth="sm">
							Houve um erro ao processar seu pedido.
						</AlertDescription>
						<AlertDescription maxWidth="sm">
							Por favor volte e tente novamente.
						</AlertDescription>
						<Link href="/">
							<Button size="sm" mt="1rem" rightIcon={<ArrowLeftIcon />}>
								Voltar ao inicio
							</Button>
						</Link>
					</Alert>
				</Container>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>Next Store | Pagamento</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{data?.payment_intent?.status ? (
				<Container mt="calc(10vh + 2rem)">
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
								Whoa! Parabéns!
							</Heading>
						</AlertTitle>
						<AlertDescription maxWidth="sm">
							{data?.payment_intent?.status === 'succeeded' && (
								<Box>
									<Heading as="h4" size="sm">
										Seu pagamento foi confirmado.
									</Heading>
								</Box>
							)}

							<Text fontSize="md" mt={5}>
								Status:{' '}
								{data?.payment_intent?.status ?? <LoadingSpinner size="md" />}
							</Text>
							<Text fontSize="md" mt={2}>
								<ClearCart />
							</Text>
							{updatedOrder.data.paid ? (
								<Text mt={2}>ID do seu pedido: {updatedOrder.data._id}</Text>
							) : null}
							<Link href="/">
								<Button size="md" mt="24px" rightIcon={<ArrowLeftIcon />}>
									Voltar ao inicio
								</Button>
							</Link>
						</AlertDescription>
					</Alert>
				</Container>
			) : (
				<Container mt="calc(10vh + 2rem)">
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
								<LoadingSpinner size="md" />
							</Text>
						</AlertDescription>
					</Alert>
				</Container>
			)}
		</Fragment>
	);
};

export default ResultPage;
