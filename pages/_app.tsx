import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '@/components/Header';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

import '@/styles/nprogress.css';
import '@/styles/global.css';

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

const App = ({ Component, pageProps }: AppProps) => (
	<ChakraProvider theme={customTheme}>
		<Provider session={pageProps.session}>
			<Header />
			<CSSReset />
			<Component {...pageProps} />
		</Provider>
	</ChakraProvider>
);

export default App;
