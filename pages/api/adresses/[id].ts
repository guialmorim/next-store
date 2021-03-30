import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Address from '@/models/address';
import { NativeError } from 'mongoose';

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
		body,
		query: { id },
	} = request;

	switch (method) {
		case 'GET':
			try {
				const address = await Address.findById(id)
					.populate({
						path: 'user',
						select: ['name', 'email'],
					})
					.exec();

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
					error: error.toStrig(),
				});
			}
			break;
		case 'PUT':
			try {
				const address = await Address.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true,
					useFindAndModify: false,
				});

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
				const address = await Address.findByIdAndDelete(id);

				if (address) {
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
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
