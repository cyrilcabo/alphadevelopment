//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 514,
		padding: '30px 0px',
		backgroundColor: '#191919',
		color: 'white',
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			minHeight: 444,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 344,
		}
	},
	container: {
		marginTop: 50,
		[theme.breakpoints.down('sm')]: {
			marginTop: 60,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: 40,
		}
	},
	brandLogo: {
		height: 128,
		width: 128,
		[theme.breakpoints.down('md')]: {
			height: 116,
			width: 116
		},
		[theme.breakpoints.down('sm')]: {
			height: 102,
			width: 102,
		},
		[theme.breakpoints.down('xs')]: {
			height: 96,
			width: 96
		}
	},
	title: {
		fontSize: '4rem',
		margin: '0px 0px 10px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '3.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.8rem',
			marginBottom: 10,
		}
	},
	subTitle: {
		margin: 0,
		fontSize: '1.8rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.6rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
		}
	}
}));

const AboutBanner = ():JSX.Element => {
	const classes:any = useStyle();
	return (
		<Grid item className={classes.root} xs={12} container justify="center">
			<Grid item xs={11} md={10} container direction="column" alignItems="center" className={classes.container}>
				<Grid item>
					<img src={"/icons/logo_128.png"} className={classes.brandLogo} alt="Logo" />
				</Grid>
				<Grid item>
					<h1 className={classes.title}> <span style={{color: '#00CBFF'}}>Alpha</span> Development </h1>
				</Grid>
				<Grid item>
					<p className={classes.subTitle}> 
						<span style={{color: '#00CBFF'}}> Explore</span>.
						Innovate.
						<span style={{color: '#FFA114'}}> Evolve</span>.
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AboutBanner;