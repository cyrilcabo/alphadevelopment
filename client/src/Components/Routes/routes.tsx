//Router
import {Switch, Route} from 'react-router-dom';

//Utils
import React, {lazy, Suspense} from 'react';
import LoadingScreen from '../LoadingScreen/loadingscreen';

//Components
const Index = lazy(() => import('../Pages/index'));
const Products = lazy(() => import('../Pages/products'));
const ViewProduct = lazy(() => import('../Pages/viewproduct'));
const About = lazy(() => import('../Pages/about'));
const Services = lazy(() => import('../Pages/services'));

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