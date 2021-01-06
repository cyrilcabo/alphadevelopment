//Router
import {Switch, Route} from 'react-router-dom';

//Utils
import React, {lazy, Suspense} from 'react';
import LoadingScreen from '../LoadingScreen/loadingscreen';

//Components
const Index = lazy(async() => {
	await new Promise(resolve => setTimeout(resolve, 300));
	return import('../Pages/index');
});
const Products = lazy(async() => {
	await new Promise(resolve => setTimeout(resolve, 300));
	return import('../Pages/products');
});
const ViewProduct = lazy(async() => {
	await new Promise(resolve => setTimeout(resolve, 300));
	return import('../Pages/viewproduct');
});
const About = lazy(async() => {
	await new Promise(resolve => setTimeout(resolve, 300));
	return import('../Pages/about');
});
const Services = lazy(async() => {
	await new Promise(resolve => setTimeout(resolve, 300));
	return import('../Pages/services');
});

const Routes = ():JSX.Element => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Switch>
				<Route path="/" exact>
					<Index />
				</Route>
				<Route path="/products" exact>
					<Products />
				</Route>
				<Route path="/products/view" exact>
					<ViewProduct />
				</Route>
				<Route path="/about" exact>
					<About />
				</Route>
				<Route path="/services" exact>
					<Services />
				</Route>
				<Route path="">
					<Index />
				</Route>
				<Route path="/*">
					<Index />
				</Route>
			</Switch>
		</Suspense>
	);
}

export default Routes;