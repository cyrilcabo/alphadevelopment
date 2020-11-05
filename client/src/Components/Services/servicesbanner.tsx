import React from 'react';

//Grid
import Grid from '@material-ui/core/Grid';

//Utils
import {servicesList} from '../Utils/serviceslist';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 700,
		padding: '30px 0px 80px 0px',
		backgroundColor: '#191919',
		[theme.breakpoints.down('sm')]: {
			paddingBottom: 60,
		},
		[theme.breakpoints.down('xs')]: {
			paddingBottom: 40,
		}
	},
	title: {
		maxWidth: '60%',
		fontFamily: 'Arial, Helvetica, sans-serif',
		color: 'white',
		margin: "50px 0px 100px 0px",
		'& h1': {
			fontSize: '4rem',
			margin: 0,
			[theme.breakpoints.down("md")]: {
				fontSize: '3.5rem',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '2.8rem',
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '2rem'
			}
		},
		[theme.breakpoints.down('md')]: {
			maxWidth: '70%',
			margin: '50px 0px 80px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '100%',
			textAlign: 'center',
			margin: '40px 0px 60px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			margin: '40px 0px 40px 0px'
		}
	},
	innerContainer: {
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center'
		}
	},
	card: {
		height: 280,
		width: 280,
		padding: '30px 20px',
		backgroundColor: 'white',
		boxShadow: '0px 0px 3px #313131',
		marginBottom: 50,
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Arial, Helvetica, sans-serif',
		color: '#06232a',
		[theme.breakpoints.down('md')]: {
			height: 260,
			width: 260
		},
		[theme.breakpoints.down('sm')]: {
			height: 240,
			width: 240,
			marginBottom: 40,
		},
		[theme.breakpoints.down('xs')]: {
			height: 220,
			width: 240,
			marginBottom: 30,
		}
	},
	cardTitle: {
		marginBottom: 15,
		'& > h3': {
			margin: 0,
			fontSize: '1.8rem',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.65rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.35rem',
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.15rem'
			}
		}
	},
	cardContent: {
		fontSize: '1.2rem',
		lineHeight: '25px',
		'& > p': {
			margin: 0,
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.99rem',
		}
	},
	cardA: {
		backgroundColor: '#dbf8fe',
	},
	cardB: {
		backgroundColor: '#fda12e',
	}
}));

interface Offer {
	title: string;
	content: string;
}

const ServicesBanner = ():JSX.Element => {
	const classes = useStyle();
	const offers = servicesList.map((item: Offer, index: number) => {
		const cardColor = index===0 || index===5 ?classes.cardA :(index===2 || index===4) ?classes.cardB :"";
		return <Grid item container xs={11} sm={6} md={4} justify="center" alignItems="center" key={index}>
			<Grid item className={[classes.card, cardColor].join(" ")}>
				<Grid item className={classes.cardTitle}>
					<h3> {item.title} </h3>
				</Grid>
				<Grid item className={classes.cardContent}>
					<p> {item.content} </p>
				</Grid>
			</Grid>
		</Grid>
	});
	return (
		<Grid item className={classes.root} xs={12} container justify="center">
			<Grid item xs={11} md={10} container direction="column">
				<Grid item className={classes.title}>
					<h1> What <span style={{color: '#fda12e'}}>Alpha</span> Development offers </h1>
				</Grid>
				<Grid item container className={classes.innerContainer}>
					{offers}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ServicesBanner;