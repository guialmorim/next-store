[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ❤️ MongoDB</h1>

<div align="center">
  
[LIVE EXAMPLE!]()

An e-commerce using [**Next.js**](https://github.com/zeit/next.js/) and [**MongoDB**](https://www.mongodb.com/), designed with simplicity for learning and real-world applicability in mind.

<h3 align="center">Dependencies</h3>

This project uses the following dependencies:

- `next.js` - v9.3 or above required for **API Routes** and data fetching method.
- `react` - v16.8 or above required for **react hooks**.
- `react-dom` - v16.8 or above.
- `swr` - required for state management
- `mongodb` and `mongoose` - for database.
- `tailwindcss` - for styling.

<h3 align="center">Environmental variables</h3>

The environment variables [will be inlined during build time](https://nextjs.org/docs#build-time-configuration)

Environmental variables in this project include:

- `MONGODB_URI` A string de conexão do seu MongoDB (com credenciais).
- `MONGODB_DB` Nome do seu banco de dados utilizado.
- `NEXTAUTH_URL` URL da sua aplicação, para autenticação e callback.
- `AUTH0_CLIENT_ID` ID do cliente recebido do Auth0, você pode conseguir um [aqui](https://auth0.com/signup?&signUpData=%7B%22category%22%3A%22button%22%7D&email=undefined)
- `AUTH0_CLIENT_SECRET` (only if you use `express-session`) The secret to be used in `express-session`.
- `AUTH0_DOMAIN` (optional, Cloudinary **only**) Cloudinary environment variable for configuration. See [this](https://cloudinary.com/documentation/node_integration#configuration).

<h3 align="center">Development</h3>

Start the development server by running `yarn dev` or `npm run dev`. The project supports using `.env`. Start by creating a `.env` or `.env.local` file with the above variables.

#### `.env`

I include my own environment variables in [.env.example](.env.example) for experimentation purposes. Please replace them with your owns. You can try them in development by renaming it into `.env`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not commit `.env`**.

<h2 align="center">Deployment</h2>

This project can be deployed [anywhere Next.js can be deployed](https://nextjs.org/docs/deployment). Make sure to set the environment variables using the options provided by your cloud/hosting providers.

After building using `npm run build`, simply start the server using `npm run start`.

You can also deploy this with serverless providers given the correct setup.

<h2 align="center">
  License
</h2>

<div align="center">
  
  [MIT](LICENSE)
  
</div>
