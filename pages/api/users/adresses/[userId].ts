import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address from '@/models/address';

interface ResponseType {
	message: string;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	const {
		method,
		body,
		query: { userId },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const address = await Address.find({ user: userId as any })
					.populate({
						path: 'user',
						select: ['name', 'email'],
					})
					.exec();

				if (address) {
					response.status(200).json({ addresses: address });
				} else {
					response
						.status(404)
						.json({ addresses: [], message: 'no address found.' });
				}
			} catch (error) {
				response.status(404).json({
					addresses: [],
					message: 'no address found.',
					error: error,
				});
			}
			break;
		case 'PUT':
			try {
				const address = await Address.findByIdAndUpdate(userId, body, {
					new: true,
					runValidators: true,
				});

				if (address) {
					response.status(201).json(address);
				} else {
					response.status(500).json({
						message: 'something went wrong creating the address',
					});
				}
			} catch (error) {
				response.status(500).json({
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
