import { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/utils/database';
import Order from '@/Models/order';
import User from '@/Models/user';

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
	const { method, body } = request;
	switch (method) {
		case 'POST':
			try {
				const order = await Order.create(body);
				if (order) {
					const addReftoUser = await User.findByIdAndUpdate(
						body.user,
						{
							$push: { orders: order._id },
						},
						{
							useFindAndModify: false,
						}
					);
					if (addReftoUser) {
						response.status(200).json({
							statusCode: 200,
							message: 'Pedido criado',
							data: order,
						});
					} else {
						await Order.findByIdAndDelete(order._id);
						response.status(501).json({
							statusCode: 500,
							message: 'Algo deu errado ao criar o pedido',
						});
					}
				} else {
					response
						.status(400)
						.json({ statusCode: 400, message: 'Algo deu errado' });
				}
			} catch (error) {
				response
					.status(500)
					.json({ statusCode: 500, message: 'Algo deu errado', error: error });
			}
			break;
		default:
			response.setHeader('Allow', 'POST');
			response.status(405).end('Method Not Allowed');
			break;
	}
};
