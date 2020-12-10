import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const Home: React.FC = () => {
	const [session, loading] = useSession();
	console.log(session);
	return (
		<div className="container">
			<Head>
				<title>Home - Next Store</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				{!session && (
					<>
						Not signed in <br />
						<button onClick={() => signIn()}>Sign in</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.email} <br />
						<button onClick={() => signOut()}>Sign out</button>
					</>
				)}
				{loading && <h3>LOADING...</h3>}
			</div>

			<h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
				Next Store
			</h1>
		</div>
	);
};

export default Home;
