import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import User from '@/Models/user';

interface ResponseType {
	message: string;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	const { method, body } = request;

	switch (method) {
		case 'GET':
			try {
				const users = await User.find();
				if (users.length > 0) {
					response.status(200).json(users);
				} else {
					response.status(404).json({ message: 'nenhum usuario encontrado.' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'POST':
			try {
				const user = await User.create(body);
				if (user) {
					response.status(200).json({ message: 'Usuario criado' });
				} else {
					response.status(400).json({ message: 'algo deu errado' });
				}
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
