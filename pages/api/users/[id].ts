import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import User, { IUser } from '@/models/user';
import { NativeError } from 'mongoose';

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
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const user = await User.findById(id).populate('adresses').exec();

				if (user) {
					response.status(200).json(user);
				} else {
					response.status(404).json({ message: 'nenhum usuario encontrado.' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'PUT':
			try {
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
