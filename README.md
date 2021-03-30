[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next Store :convenience_store: </h1>

See an [LIVE EXAMPLE!](https://next-store.vercel.app) :sparkles:

An complete e-commerce web application using [**Next.js**](https://github.com/zeit/next.js/) and [**MongoDB**](https://www.mongodb.com/), designed with simplicity for learning and real-world applicability in mind.

### This project uses only [Typescript](https://www.typescriptlang.org)

## Dependencies

This project uses the following dependencies:

- `next.js` - v9.3 or above required for **API Routes** and data fetching method.
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `stripe` - to process payments.
- `mongodb` and `mongoose` - for database.
- `chakra-ui` and `styled-components` - for styling.
- `formik` and `yup` - for forms and validation.
- `swr` - for state management.

## Environmental variables

The environment variables [will be configured during build time](https://nextjs.org/docs#build-time-configuration)

Environmental variables in this project:

- `MONGODB_URI` Your MongoDB connection string (with credentials).
- `MONGODB_DB` Name of your database.
- `NEXTAUTH_URL` URL of your application, for authentication and callback.
- `AUTH0_CLIENT_ID` Client ID received from Auth0, you can get one [here](https://auth0.com/signup?&signUpData=%7B%22category%22%3A%22button%22%7D&email=undefined)
- `AUTH0_CLIENT_SECRET` (only if you use `express-session`) The secret to be used in `express-session`.
- `AUTH0_DOMAIN` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).

## Development

Start the development server by running `yarn dev` or `npm run dev`. The project supports using `.env`. Start by creating a `.env` or `.env.local` file with the above variables.

### `.env`

I include my own environment variables in [.env.example](.env.example) for experimentation purposes. Please replace them with your owns. You can try them in development by renaming it into `.env`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not commit `.env`**.

## Deployment

This project can be deployed with [Vercel](https://vercel.com/) or [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your hosting providers.

After building using `npm run build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.

## License

[MIT](LICENSE)
