import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address from '@/models/address';
import User, { IUser } from '@/models/user';

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
				const adressess = await Address.find({ user: body.userId });
				if (adressess.length > 0) {
					response.status(200).json(adressess);
				} else {
					response
						.status(404)
						.json({ message: 'nenhum endereço encontrado encontrado.' });
				}
			} catch (error) {
				response.status(500).json({ message: 'algo deu errado', error: error });
			}
			break;
		case 'POST':
			try {
				const address = await Address.create(body);

				if (address) {
					const addReftoUser = await User.findByIdAndUpdate(
						body.user,
						{
							$push: { adresses: address._id },
						},
						{
							useFindAndModify: false,
						}
					);

					if (addReftoUser) {
						response
							.status(200)
							.json({ message: 'Endereço criado', data: address });
					} else {
						await Address.findByIdAndDelete(address._id);
						response
							.status(501)
							.json({ message: 'algo deu errado ao criar o endereço' });
					}
				} else {
					response.status(400).json({ message: 'algo deu errado' });
				}
			} catch (error) {
				response
					.status(500)
					.json({ message: 'algo deu errado ao criar endereço' });
			}
			break;

		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
