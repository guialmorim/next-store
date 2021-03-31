import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address from '@/models/address';
import User from '@/models/user';

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
	const { method, body } = request;

	switch (method) {
		case 'GET':
			try {
				const addresses = await Address.find({ user: body.userId });
				if (addresses.length > 0) {
					response
						.status(200)
						.json({ message: 'Sucesso', statusCode: 200, data: addresses });
				} else {
					response
						.status(404)
						.json({ message: 'Endereço não encontrado.', statusCode: 404 });
				}
			} catch (error) {
				response
					.status(500)
					.json({ statusCode: 500, message: 'algo deu errado', error: error });
			}
			break;
		case 'POST':
			try {
				const address = await Address.create(body);
				if (address) {
					const addReftoUser = await User.findByIdAndUpdate(
						body.user,
						{
							$push: { addresses: address._id },
						},
						{
							useFindAndModify: false,
						}
					);
					if (addReftoUser) {
						response.status(200).json({
							statusCode: 200,
							message: 'Endereço criado',
							data: address,
						});
					} else {
						await Address.findByIdAndDelete(address._id);
						response.status(501).json({
							statusCode: 500,
							message: 'algo deu errado ao criar o endereço',
						});
					}

					response
						.status(400)
						.json({ statusCode: 400, message: 'algo deu errado' });
				} else {
					response
						.status(400)
						.json({ statusCode: 400, message: 'algo deu errado' });
				}
			} catch (error) {
				response.status(500).json({
					statusCode: 500,
					message: 'algo deu errado ao criar endereço',
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
