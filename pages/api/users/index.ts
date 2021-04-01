import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/utils/database';
import mongoose from 'mongoose';
import { registerModels } from '@/utils/database';

registerModels();

interface ResponseType {
	message: string;
}

export default async (
	request: NextApiRequest,
	response: NextApiResponse //<ResponseType>
): Promise<void> => {
	await connect();
	const { method, query, body } = request;

	switch (method) {
		case 'GET':
			if (query?.email) {
				try {
					const user = await mongoose.models.User.findOne({
						email: query.email as string,
					})
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
					const users = await mongoose.models.User.find();
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
				const user = await mongoose.models.User.create(body);
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
			response.status(405).end('Method Not Allowed');
			break;
	}
};
