import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';

const options: InitOptions = {
	// Configure one or more authentication providers
	providers: [
		Providers.Auth0({
			clientId: process.env.AUTH0_CLIENT_ID!,
			clientSecret: process.env.AUTH0_CLIENT_SECRET!,
			domain: process.env.AUTH0_DOMAIN!,
		}),
		// ...add more providers here
	],

	// A database is optional, but required to persist accounts in a database
	database: {
		type: 'mongodb',
		url: process.env.MONGODB_URI,
		w: 'majority',
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},

	//  is optional, but strongly recommended!
	// A random string used to hash tokens, sign cookies and generate crytographic keys.
	secret: process.env.NEXTAUTH_SECRETKEY,
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
	NextAuth(req, res, options);
