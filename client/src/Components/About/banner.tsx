//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 444,
		backgroundColor: '#191919',
		color: 'white',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			minHeight: 394,
		}
	},
	title: {
		fontSize: '6rem',
		margin: '0px 0px 30px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '4rem',
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2.5rem',
			marginBottom: 10,
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '2.5rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '2rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
		}
	}
}));

const AboutBanner = ():JSX.Element => {
	const classes:any = useStyle();
	return (
		<Grid item className={classes.root} xs={12} container justify="center" alignItems="center">
			<Grid item xs={11} md={10} container direction="column" alignItems="center">
				<Grid item>
					<h1 className={classes.title}> <span style={{color: '#00CBFF'}}>Alpha</span> Development </h1>
				</Grid>
				<Grid item>
					<p className={classes.subTitle}> 
						<span style={{color: '#00CBFF'}}>Explore</span>.
						Innovate.
						<span style={{color: '#FFA114'}}>Evolve</span>.
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AboutBanner;