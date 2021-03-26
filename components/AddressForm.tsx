import React, { ReactNode } from 'react';
import {
	Stack,
	InputRightElement,
	InputGroup,
	Box,
	Tooltip,
	Center,
	Button,
	InputLeftAddon,
	Text,
} from '@chakra-ui/react';
import { TAddress } from '@/components/Address';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Input } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchPostJSON } from '@/utils/api-helpers';
import { POST_ADDRESS, PUT_ADDRESS } from '@/config/api/endpoints';
import { Toast } from '@/utils/toast';

const schema = yup.object({
	street: yup.string().required('Este campo é obrigatório.'),
	number: yup.number().required('Este campo é obrigatório.'),
	city: yup.string().required('Este campo é obrigatório.'),
	state: yup.string().required('Este campo é obrigatório.'),
	zip: yup.number().required('Este campo é obrigatório.'),
});

interface IProps {
	children?: ReactNode;
	address: TAddress;
}

const AddressForm: React.FC<IProps> = ({ address }) => {
	console.log(address);
	return (
		<Box>
			<Formik
				enableReinitialize
				initialValues={
					address || {
						street: '',
						number: '',
						city: '',
						state: '',
						zip: '',
						user: '',
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

					try {
						if (values._id) {
							const { message, statusCode, data } = await fetchPostJSON(
								`${PUT_ADDRESS}/${values._id}`,
								'PUT',
								values
							);
							if (statusCode === 200) {
								Toast({
									title: 'aww yeah!',
									description: message,
									status: 'success',
								});
							} else {
								Toast({
									title: 'Oops!',
									description: message,
									status: 'error',
								});
							}
						} else {
							delete values._id;
							const { message, statusCode, data } = await fetchPostJSON(
								`${POST_ADDRESS}`,
								'POST',
								values
							);
							if (statusCode === 200) {
								Toast({
									title: 'aww yeah!',
									description: message,
									status: 'success',
								});
							} else {
								Toast({
									title: 'Oops!',
									description: message,
									status: 'error',
								});
							}
						}
					} catch (error) {
						console.error(error);
					}

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
					isValidating,
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
											) : isValidating ? (
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
											) : isValidating ? (
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
											) : isValidating ? (
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
											) : isValidating ? (
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
											) : isValidating ? (
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
