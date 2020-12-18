import React from 'react';
import {
	Button,
	Stack,
	InputRightElement,
	InputGroup,
	Box,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Input } from '@chakra-ui/react';

const schema = yup.object({
	email: yup
		.string()
		.required('Este campo é obrigatório.')
		.email('Por favor, digite um e-mail válido'),
	password: yup.string().required('Este campo é obrigatório.'),
});

const ProfileInfo: React.FC = () => (
	<Box>
		<Formik
			enableReinitialize
			initialValues={{ email: '', password: '' }}
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

				/* and other goodies */
			}) => (
				<Form onSubmit={handleSubmit}>
					<Stack spacing={5}>
						<Tooltip
							placement="top"
							isDisabled={!errors.email && !touched.email}
							hasArrow
							label={errors.email}
							bg="red.500"
						>
							<InputGroup>
								<Field
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
						{/* {errors.email && touched.email && (
							<Text fontSize="xs">{errors.email}</Text>
						)} */}
						<Tooltip
							placement="top"
							isDisabled={!errors.password && !touched.password}
							hasArrow
							label={errors.password}
							bg="red.500"
						>
							<InputGroup>
								<Field
									variant="filled"
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									as={Input}
									isInvalid={errors.password && touched.password}
									errorBorderColor="red.500"
								/>
								<InputRightElement
									children={
										errors.password && touched.password && errors.password ? (
											<NotAllowedIcon color="red.500" />
										) : (
											<CheckIcon color="green.500" />
										)
									}
								/>
							</InputGroup>
						</Tooltip>
						{/* {errors.password && touched.password && (
							<Text fontSize="xs">{errors.password}</Text>
						)} */}
						<Button type="submit" disabled={isSubmitting} colorScheme="purple">
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

export default ProfileInfo;
