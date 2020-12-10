import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import NProgress from 'nprogress';

import '@/styles/nprogress.css';
import '@/styles/global.css';

Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<nav>
				<style jsx>{`
					a {
						margin: 0 10px 0 0;
					}
				`}</style>
				<Link href="/posts/first-post">
					<a>first posts</a>
				</Link>
				<Link href="/forever">
					<a>Forever</a>
				</Link>
			</nav>
			<Provider session={pageProps.session}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}
