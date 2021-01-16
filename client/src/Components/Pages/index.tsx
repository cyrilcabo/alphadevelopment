//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import HomeBanner from '../Home/banner';
import HomeProducts from '../Home/products';
import HomeExpertise from '../Home/expertise';
import HomeTechs from '../Home/techs';
import HomeAvail from '../Home/avail';
import Testimonials from '../Testimonials/testimonials';
import BlogTeaser from '../Home/blogteaser';

//Utils
import React from 'react';

const Index = ():JSX.Element => {
	return (
		<Grid item xs={12}>
			<HomeBanner />
			<HomeProducts />
			<HomeExpertise />
			<HomeTechs />
			<HomeAvail />
			<BlogTeaser />
			<Testimonials />
		</Grid>
	);
}

export default Index;