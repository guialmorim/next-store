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
	const {
		method,
		body,
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				//@ts-ignore
				const address = await mongoose.models.Address.find({ user: id });

				if (address) {
					response
						.status(200)
						.json({ message: 'Sucesso', statusCode: 200, data: address });
				} else {
					response.status(404).json({
						statusCode: 404,
						data: [],
						message: 'Nenhum endereço encontrado.',
					});
				}
			} catch (error) {
				response.status(404).json({
					statusCode: 400,
					data: [],
					message: 'Nenhum endereço encontrado.',
					error: error,
				});
			}
			break;
		case 'PUT':
			try {
				const address = await mongoose.models.Address.findByIdAndUpdate(
					id,
					body,
					{
						new: true,
						runValidators: true,
						useFindAndModify: false,
					}
				);

				if (address) {
					response.status(201).json({
						statusCode: 200,
						message: 'Endereço Atualizado com sucesso',
						data: address,
					});
				} else {
					response.status(500).json({
						statusCode: 500,
						message: 'Algo deu errado ao atualizar o endereço',
					});
				}
			} catch (error) {
				response.status(500).json({
					statusCode: 500,
					message: 'Algo deu errado',
					error: error,
				});
			}
			break;
		case 'DELETE':
			try {
				const address = await mongoose.models.Address.findByIdAndDelete(id);
				if (address) {
					const removeReFromUser = await mongoose.models.User.findByIdAndUpdate(
						address.user,
						{
							$pull: { addresses: address._id },
						},
						{
							useFindAndModify: false,
						}
					);

					response.status(200).json({
						statusCode: 200,
						message: 'Endereço apagado com sucesso',
						data: address,
					});
				} else {
					response.status(500).json({
						statusCode: 500,
						message: 'Algo deu errado ao criar o endereço',
					});
				}
			} catch (error) {
				response.status(500).json({
					statusCode: 500,
					message: 'Algo deu errado',
					error: error,
				});
			}
			break;
		default:
			response.status(405).end('Method Not Allowed');
			break;
	}
};
