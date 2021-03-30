import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import User from '@/models/user';
import Address from '@/models/address';

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
		query: { email },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const user = await User.findOne({ email: email as string })
					.populate({ path: 'adresses' })
					.exec();

				if (user) {
					response
						.status(200)
						.json({ message: 'success', statusCode: 200, data: user });
				} else {
					response
						.status(404)
						.json({ message: 'no user found.', statusCode: 404 });
				}
			} catch (error) {
				console.log(error);
				response.status(500).json({
					message: 'something went wrong',
					error: error,
					statusCode: 500,
				});
			}
			break;
		case 'PUT':
			try {
			} catch (error) {
				response
					.status(500)
					.json({ message: 'algo deu errado', error: error, statusCode: 500 });
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};