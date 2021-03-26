import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address from '@/models/address';
import { NativeError } from 'mongoose';

interface ResponseType {
	statusCode: 200 | 500 | 400 | 404;
	message: string;
	data?: any;
	error?: string;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse<ResponseType>
): Promise<void> => {
	const {
		method,
		body,
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const address = await Address.findById(id)
					.populate({
						path: 'user',
						select: ['name', 'email'],
					})
					.exec();

				if (address) {
					response
						.status(200)
						.json({ message: 'successs', statusCode: 200, data: address });
				} else {
					response
						.status(404)
						.json({ statusCode: 404, data: [], message: 'no address found.' });
				}
			} catch (error) {
				response.status(404).json({
					statusCode: 400,
					data: [],
					message: 'no address found.',
					error: error.toStrig(),
				});
			}
			break;
		case 'PUT':
			try {
				console.log(body);
				const address = await Address.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true,
					useFindAndModify: false,
				});

				if (address) {
					response.status(201).json({
						statusCode: 200,
						message: 'Address Updated successfully',
						data: address,
					});
				} else {
					response.status(500).json({
						statusCode: 500,
						message: 'something went wrong creating the address',
					});
				}
			} catch (error) {
				response.status(500).json({
					statusCode: 500,
					message: 'something went wrong',
					error: error,
				});
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
