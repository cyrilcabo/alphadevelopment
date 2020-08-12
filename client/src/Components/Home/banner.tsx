//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//SVG
import {ReactComponent as Growth} from '../../images/SVG/growth.svg';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 636,
		backgroundColor: '#191919',
		textAlign: 'center',
		color: 'white',
		[theme.breakpoints.down('sm')]: {
			minHeight: 580,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 520,
		}
	},
	growthIcon: {
		[theme.breakpoints.down('md')]: {
			width: 70, 
		},
		[theme.breakpoints.down('xs')]: {
			width: 50,
		}
	},
	title: {
		fontSize: '5rem',
		margin: '20px 0px 20px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '4.5rem',
			margin: '0px 0px 15px 0px'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '3.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2.5rem',
		}
	},
	subTitle: {
		fontSize:'1.5rem',
		margin: '0px 0px 80px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.4rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			marginBottom: 60,
		}
	},
	CTA: {
		backgroundColor: '#FFA114',
		color: 'black',
		fontWeight: 600,
		fontSize: '2rem',
		padding: '5px 30px',
		borderRadius: 40,
		'&:hover': {
			color: '#FFA114'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.3rem',
			padding: '3px 20px',
		}
	}
}));

const HomeBanner = ():JSX.Element => {
	const classes:any = useStyle();
	return (
		<Grid item className={classes.root} container justify="center" alignItems="center">
			<Grid item xs={11} md={10} container direction="column" alignItems="center">
				<Grid item>
					<Growth className={classes.growthIcon} viewBox="0 0 91 96.759"/>
				</Grid>
				<Grid item>
					<h1 className={classes.title}> Expanding your business? </h1>
				</Grid>
				<Grid item>
					<p className={classes.subTitle}> Reach more clients with a website! </p>
				</Grid>
				<Grid item>
					<a href="#products" style={{textDecoration: 'none'}}>
						<Button className={classes.CTA}> EXPLORE </Button>
					</a>
				</Grid>
			</Grid>
		</Grid>
	);
} 

export default HomeBanner;