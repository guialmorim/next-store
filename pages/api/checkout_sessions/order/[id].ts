import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Order from '@/models/order';
import { IUserMongooseModel } from '@/models/user';

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
	const { method, query } = request;

	switch (method) {
		case 'GET':
			if (query?.id) {
				try {
					const order = await Order.findByIdAndUpdate(
						query.id,
						{
							$set: { paid: true },
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
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
