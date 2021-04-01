import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { connect } from '@/utils/database';
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
	await connect();
	const { method, body } = request;

	switch (method) {
		case 'GET':
			try {
				const addresses = await mongoose.models.Address.find({
					user: body.userId,
				});
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
				const address = await mongoose.models.Address.create(body);
				if (address) {
					const addReftoUser = await mongoose.models.User.findByIdAndUpdate(
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
						await mongoose.models.Address.findByIdAndDelete(address._id);
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
			response.status(405).end('Method Not Allowed');
			break;
	}
};
