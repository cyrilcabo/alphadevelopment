import React from 'react';

//Grid
import Grid from '@material-ui/core/Grid';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 0,
		padding: 0,
	},
	title: {

	},
	innerContainer: {
		
	}
}));

const ServicesBanner = ():JSX.Element => {
	const classes = useStyle();
	return (
		<Grid item className={classes.root} xs={12} justify="center">
			<Grid item xs={11} md={10} container direction="column">
				<Grid item>
					<h1 className={classes.title}> What Alpha Development offers </h1>
				</Grid>
				<Grid item container className={classes.innerContainer}>

				</Grid>
			</Grid>
		</Grid>
	);
}

export default ServicesBanner;