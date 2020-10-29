import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import RateProduct from './rateproduct';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
	},
	title: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '2rem',
		margin: '15px 0px 3px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.6rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.2rem'
		}
	},
	divider: {
		height: '1px',
		width: '100%'
	}
}));

const RateFeature = ():JSX.Element => {
	const classes = useStyle();
	return (
		<Grid item xs={12} className={classes.root} container justify="center">
			<Grid item container xs={11} md={10} direction="column">
				<Grid item>
					<h2 className={classes.title}> Bookmate Reviews (200) </h2>
				</Grid>
				<Grid item>
					<hr className={classes.divider} />
				</Grid>
				<Grid item>
					<RateProduct />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default RateFeature;