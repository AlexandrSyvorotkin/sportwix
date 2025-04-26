import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {Provider} from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import { LanguageProvider } from './context/LanguageContext/LanguageContext'
import { HelmetProvider } from 'react-helmet-async';

const rootElem = document.getElementById('root')

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);
	root.render(
		// <React.StrictMode>
		<HelmetProvider>
				<Provider store={store}>
					<ThemeProvider>
						<LanguageProvider>
							<App/>
						</LanguageProvider>
					</ThemeProvider>
				</Provider>
		</HelmetProvider>
		// </React.StrictMode>
	);
}

reportWebVitals();
