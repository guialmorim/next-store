import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useFetch } from '@/lib/fetcher';

const Home: React.FC = () => {
	const [session, loading] = useSession();
	const { data } = useFetch(`/api/hello?id=1`);

	return (
		<div className="container">
			<Head>
				<title>Home - Next Store</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Home</h1>
				<Link href="/posts/first-post">Fisrt post</Link>
			</main>

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
			</div>

			<h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
				Next Store
			</h1>
		</div>
	);
};

export default Home;
