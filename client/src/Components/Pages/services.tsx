import React from 'react';

//Material component
import Grid from '@material-ui/core/Grid';

//Custom
import ServicesBanner from '../Services/servicesbanner';
import ServiceTestimonials from '../Services/servicetestimonials';

const Services = ():JSX.Element => {
	return (
		<Grid item xs={12} container justify="center">
			<ServicesBanner />
			<ServiceTestimonials />
		</Grid>
	);
}

export default Services;