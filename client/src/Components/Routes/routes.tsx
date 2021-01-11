//Router
import {Switch, Route} from 'react-router-dom';

//Utils
import React, {lazy, Suspense} from 'react';
import LoadingScreen from '../LoadingScreen/loadingscreen';

const lazier = (cb:any) => {
	return lazy(async() => {
		await new Promise(resolve => setTimeout(resolve, 300));
		return cb();
	});
}

//Components
const Index = lazier(() => import('../Pages/index'));
const Products = lazier(() => import('../Pages/products'));
const ViewProduct = lazier(() => import('../Pages/viewproduct'));
const About = lazier(() => import('../Pages/about'));
const Services = lazier(() => import('../Pages/services'));
const Blogs = lazier(() => import('../Pages/blogs'));
const Read = lazier(() => import('../Pages/read'));

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
				<Route path="/blogs" exact>
					<Blogs />
				</Route>
				<Route path="/blogs/read" exact>
					<Read />
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