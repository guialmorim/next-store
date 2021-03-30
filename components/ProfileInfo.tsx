import React from 'react';
import {
	Stack,
	InputRightElement,
	InputGroup,
	Box,
	Tooltip,
	Center,
	Spinner,
} from '@chakra-ui/react';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Input } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';

const schema = yup.object({
	name: yup.string().required('Este campo é obrigatório.'),
	email: yup
		.string()
		.required('Este campo é obrigatório.')
		.email('Por favor, digite um e-mail válido'),
	password: yup.string().required('Este campo é obrigatório.'),
});

const ProfileInfo: React.FC = () => {
	const [session, loading] = useSession();

	return !loading ? (
		<Box>
			<Formik
				enableReinitialize
				initialValues={session?.user || { name: '', email: '' }}
				validationSchema={schema}
				validateOnChange
				validate={(values) => {
					const errors = {};
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						setSubmitting(false);
					}, 400);
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
								isDisabled={!errors.name && !touched.name}
								hasArrow
								label={errors.name}
								bg="red.500"
							>
								<InputGroup>
									<Field
										isDisabled={true}
										placeholder="name.."
										variant="filled"
										type="text"
										name="name"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.name}
										as={Input}
										isInvalid={errors.name && touched.name}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.name && touched.name && errors.name ? (
												<NotAllowedIcon color="red.500" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>

							<Tooltip
								placement="top"
								isDisabled={!errors.email && !touched.email}
								hasArrow
								label={errors.email}
								bg="red.500"
							>
								<InputGroup>
									<Field
										isDisabled={true}
										placeholder="email.."
										variant="filled"
										type="email"
										name="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
										as={Input}
										isInvalid={errors.email && touched.email}
										errorBorderColor="red.500"
									/>

									<InputRightElement
										children={
											errors.email && touched.email && errors.email ? (
												<NotAllowedIcon color="red.500" />
											) : (
												<CheckIcon color="green.500" />
											)
										}
									/>
								</InputGroup>
							</Tooltip>
						</Stack>
					</Form>
				)}
			</Formik>
		</Box>
	) : (
		<Center>
			<Spinner color="purple.500" />
		</Center>
	);
};

export default ProfileInfo;
