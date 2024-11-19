import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './application/App';
import '@shared/styles/style.scss';



const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<App />
);

reportWebVitals();
