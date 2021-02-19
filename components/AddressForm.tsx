import React from 'react';
import {
	Stack,
	InputRightElement,
	InputGroup,
	Box,
	Tooltip,
	Center,
	Button,
	Container,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	InputLeftAddon,
	Text,
} from '@chakra-ui/react';
import { TAddress } from '@/components/Address';
import { CheckIcon, NotAllowedIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Input } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchGetJSON, fetchPostJSON } from '@/utils/api-helpers';
import { PUT_ADDRESS } from '@/config/api/endpoints';
import useSWR from 'swr';

const schema = yup.object({
	street: yup.string().required('Este campo é obrigatório.'),
	number: yup.number().required('Este campo é obrigatório.'),
	city: yup.string().required('Este campo é obrigatório.'),
	state: yup.string().required('Este campo é obrigatório.'),
	zip: yup.number().required('Este campo é obrigatório.'),
});

const AddressForm: React.FC = () => {
	const [session, loading] = useSession();

	const router = useRouter();

	// Fetch CheckoutSession from static page via
	const { data: addressResponse, error, isValidating } = useSWR(
		router.query.id && router.query.id !== 'new'
			? `/api/adresses/${router.query.id}`
			: null,
		fetchGetJSON,
		{
			revalidateOnFocus: true,
			revalidateOnReconnect: true,
		}
	);

	const {
		data: userData,
		error: errorUser,
		isValidating: isValidatingUser,
	} = useSWR(
		session?.user?.email ? `/api/users/${session?.user?.email}` : null,
		fetchGetJSON
	);

	if (loading)
		return (
			<Center>
				<Text>Loading</Text>
				<LoadingSpinner size="md" />
			</Center>
		);

	if (error || addressResponse?.addresses?.length <= 0 || !userData?.data) {
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
						{addressResponse?.message} <br />
						{userData?.message}
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
		<Box>
			<Formik
				enableReinitialize
				initialValues={
					addressResponse?.addresses || {
						street: '',
						number: '',
						city: '',
						state: '',
						zip: '',
					}
				}
				validationSchema={schema}
				validateOnChange
				validate={(values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={async (
					values: TAddress,
					{ setSubmitting }: FormikHelpers<TAddress>
				) => {
					setSubmitting(true);

					console.log(values);

					const response = await fetchPostJSON(
						`${PUT_ADDRESS}/${values._id}`,
						'PUT',
						values
					);
					console.log(response);

					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<Form onSubmit={handleSubmit}>
						<Stack spacing={5}>
							<Tooltip
								placement="top"
								isDisabled={!errors.street && !touched.street}
								hasArrow
								label={errors.street}
								bg="red.500"
							>
								<InputGroup>
									<InputLeftAddon children="Street" />
									<Field
										isDisabled={isSubmitting}
										variant="outline"
										type="text"
										name="street"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.street}
										as={Input}
										isInvalid={errors.street && touched.street}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.street && touched.street && errors.street ? (
												<NotAllowedIcon color="red.500" />
											) : !addressResponse || isValidating ? (
												<LoadingSpinner size="sm" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Tooltip
								placement="top"
								isDisabled={!errors.number && !touched.number}
								hasArrow
								label={errors.number}
								bg="red.500"
							>
								<InputGroup>
									<InputLeftAddon children="Number" />
									<Field
										isDisabled={isSubmitting}
										variant="outline"
										type="text"
										name="number"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.number}
										as={Input}
										isInvalid={errors.number && touched.number}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.number && touched.number && errors.number ? (
												<NotAllowedIcon color="red.500" />
											) : !addressResponse || isValidating ? (
												<LoadingSpinner size="sm" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Tooltip
								placement="top"
								isDisabled={!errors.zip && !touched.zip}
								hasArrow
								label={errors.zip}
								bg="red.500"
							>
								<InputGroup>
									<InputLeftAddon children="Zip Code" />
									<Field
										isDisabled={isSubmitting}
										variant="outline"
										type="text"
										name="zip"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.zip}
										as={Input}
										isInvalid={errors.zip && touched.zip}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.zip && touched.zip && errors.zip ? (
												<NotAllowedIcon color="red.500" />
											) : !addressResponse || isValidating ? (
												<LoadingSpinner size="sm" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Tooltip
								placement="top"
								isDisabled={!errors.city && !touched.city}
								hasArrow
								label={errors.city}
								bg="red.500"
							>
								<InputGroup>
									<InputLeftAddon children="City" />
									<Field
										isDisabled={isSubmitting}
										variant="outline"
										type="text"
										name="city"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.city}
										as={Input}
										isInvalid={errors.city && touched.city}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.city && touched.city && errors.city ? (
												<NotAllowedIcon color="red.500" />
											) : !addressResponse || isValidating ? (
												<LoadingSpinner size="sm" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Tooltip
								placement="top"
								isDisabled={!errors.state && !touched.state}
								hasArrow
								label={errors.state}
								bg="red.500"
							>
								<InputGroup>
									<InputLeftAddon children="State" />
									<Field
										isDisabled={isSubmitting}
										variant="outline"
										type="text"
										name="state"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.state}
										as={Input}
										isInvalid={errors.state && touched.state}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.state && touched.state && errors.state ? (
												<NotAllowedIcon color="red.500" />
											) : !addressResponse || isValidating ? (
												<LoadingSpinner size="sm" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Button
								type="submit"
								disabled={isSubmitting}
								colorScheme="purple"
							>
								Save
							</Button>

							{/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
							{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default AddressForm;
