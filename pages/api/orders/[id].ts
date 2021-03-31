import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Order from '@/Models/order';
import { IUserMongooseModel } from '@/Models/user';

interface ResponseType {
	statusCode: 200 | 404 | 400 | 500;
	data?: any;
	message: string;
	error?: any;
}

connect();

export default async (
	request: NextApiRequest,
	response: NextApiResponse<ResponseType>
): Promise<void> => {
	const { method, query, body } = request;

	switch (method) {
		case 'GET':
			if (query?.id) {
				try {
					//@ts-ignore
					const order = await Order.find({ user: query.id })
						.populate('address')
						.populate('products')
						.exec();

					if (order) {
						response
							.status(200)
							.json({ statusCode: 200, message: 'Sucesso', data: order });
					} else {
						response
							.status(404)
							.json({ statusCode: 404, message: 'Pedido não encontrado.' });
					}
				} catch (error) {
					response.status(500).json({
						statusCode: 500,
						message: 'Algo deu errado',
						error: error,
					});
				}
			}
			break;
		case 'PUT':
			try {
				const order = await Order.findByIdAndUpdate(
					query.id,
					{
						$set: body,
					},
					{
						new: true,
						runValidators: true,
						useFindAndModify: false,
					}
				);
				console.log(order);

				if (order) {
					response.status(201).json({
						statusCode: 200,
						message: 'Pedido Atualizado com sucesso',
						data: order,
					});
				} else {
					response.status(500).json({
						statusCode: 500,
						message: 'Algo deu errado ao atualizar o pedido',
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
