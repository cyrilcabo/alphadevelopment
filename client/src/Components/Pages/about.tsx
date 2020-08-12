//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Custom components
import AboutBanner from '../About/banner';
import AboutDetails from '../About/details';
import AboutConnect from '../About/connect';

const About = ():JSX.Element => {
	return (
		<Grid item xs={12}>
			<AboutBanner />
			<AboutDetails />
			<AboutConnect />
		</Grid>
	);
}

export default About;