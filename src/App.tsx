import React from 'react';

import { useNotifier } from 'hooks'
import { HomePage } from 'pages/home';


export const App = () => {
	useNotifier();
	return (
		<HomePage />
	);
};