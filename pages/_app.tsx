import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '@/components/Header';
import CartProvider from '@/components/CartProvider';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

import '@/styles/nprogress.css';
import '@/styles/global.css';
import 'reflect-metadata';

const customTheme = {
	...theme,
	colors: {
		...theme.colors,
		purple: {
			50: '#f5e9ff',
			100: '#dac1f3',
			200: '#c098e7',
			300: '#a571dc',
			400: '#8c48d0',
			500: '#722fb7',
			600: '#59238f',
			700: '#3f1968',
			800: '#260f40',
			900: '#10031a',
		},
	},
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={customTheme}>
			<Provider session={pageProps.session}>
				<CSSReset />
				<CartProvider>
					<Header />
					<Component {...pageProps} />
				</CartProvider>
			</Provider>
		</ChakraProvider>
	);
};

export default App;
