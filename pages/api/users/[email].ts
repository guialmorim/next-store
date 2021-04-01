import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/utils/database';
import mongoose from 'mongoose';
import { registerModels } from '@/utils/database';

registerModels();

interface ResponseType {
	statusCode: 200 | 500 | 400 | 404;
	message: string;
	data?: any;
	error?: string;
}

export default async (
	request: NextApiRequest,
	response: NextApiResponse<ResponseType>
): Promise<void> => {
	console.log('cheguei ao endpoint');

	await connect();

	console.log('executei função do db');
	const {
		method,
		query: { email },
	} = request;
	console.log('entrei no endpoint', email);

	switch (method) {
		case 'GET':
			try {
				const user = await mongoose.models.User.findOne({
					email: email as string,
				});
				console.log('peguei usuario', user);

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
