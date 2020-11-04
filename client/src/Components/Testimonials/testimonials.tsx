import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import TestimonialList from './testimoniallist';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 600,
		marginBottom: 100,
		[theme.breakpoints.down('sm')]: {
			minHeight: 500,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 420,
		}
	},
	title: {
		margin: '70px 0px 50px 0px',
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '1.7rem',
		textAlign: 'center',
		color: '#313131',
		'& > h2': {
			margin: 0,
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
			margin: "60px 0px 40px 0px",
		},
		[theme.breakpoints.down('xs')]: {
			margin: "50px 0px 20px 0px",
			fontSize: '1.1rem'
		}
	},
}));

const Testimonals = ():JSX.Element => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container className={classes.root} justify="center">
			<Grid item xs={11} md={10} container direction="column">
				<Grid item className={classes.title}>
					<h2> What our customers are saying </h2>
				</Grid>
				<Grid item container justify="center" alignItems="center">
					<TestimonialList />
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Testimonals;