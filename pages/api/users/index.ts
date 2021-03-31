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
	const { method, query, body } = request;

	switch (method) {
		case 'GET':
			if (query?.email) {
				try {
					const user = await User.findOne({ email: query.email as string })
						.populate('addresses')
						.exec();

					if (user) {
						response.status(200).json(user);
					} else {
						response.status(404).json({ message: 'no user found.' });
					}
				} catch (error) {
					response
						.status(500)
						.json({ message: 'something went wrong', error: error });
				}
			} else {
				try {
					const users = await User.find();
					if (users.length > 0) {
						response.status(200).json(users);
					} else {
						response.status(404).json({ message: 'no users found.' });
					}
				} catch (error) {
					response
						.status(500)
						.json({ message: 'something went wrong', error: error });
				}
			}

			break;
		case 'POST':
			try {
				const user = await User.create(body);
				if (user) {
					response.status(201).json({ message: 'User created' });
				} else {
					response.status(400).json({ message: 'something went wrong' });
				}
			} catch (error) {
				response
					.status(500)
					.json({ message: 'something went wrong', error: error });
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
