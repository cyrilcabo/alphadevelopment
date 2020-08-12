//Router
import {Switch, Route} from 'react-router-dom';

//Utils
import React from 'react';

//Components
import Index from '../Pages/index';
import Products from '../Pages/products';
import ViewProduct from '../Pages/viewproduct';
import About from '../Pages/about';

const Routes = ():JSX.Element => {
	return (
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
		</Switch>
	);
}

export default Routes;