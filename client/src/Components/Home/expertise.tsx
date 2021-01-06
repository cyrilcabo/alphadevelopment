//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';
import {useHistory} from 'react-router';

//SVG
import {ReactComponent as LineDesign} from '../../images/SVG/Line Design.svg';
import {ReactComponent as Monitor} from '../../images/SVG/Monitor.svg';
import {ReactComponent as Backend} from '../../images/SVG/Backend Logo.svg';
import {ReactComponent as Utility} from '../../images/SVG/Utility Logo.svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 492,
		position: 'relative',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			paddingBottom: 20,
		}
	},
	bg: {
		backgroundColor: '#191919',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: -2,
	},
	title: {
		fontSize: '2.5rem',
		margin: '60px 0px 50px 0px',
		color: "white",
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.25rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
			marginTop: 70,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.65rem',
		}
	},
	design: {
		position: 'absolute',
		zIndex: -1,
		top: 35,
		[theme.breakpoints.down('md')]: {
			width: '30%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '40%',
			height: 60,
			top: 10,
		}
	},
	designLeft: {
		left: 0,
		transform: 'scaleX(-1)',
	},
	designRight: {
		right: 0,
	},
	serviceContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	service: {
		[theme.breakpoints.down('sm')]: {
			marginBottom: 50,
		},
		'& > div.MuiGrid-item': {
			marginBottom: 8,
			[theme.breakpoints.down('sm')]: {
				width: '80%',
				marginBottom: 2,
			}
		}
	},
	logo: {
		[theme.breakpoints.down('md')]: {
			height: 110,
		},
		[theme.breakpoints.down('sm')]: {
			height: 100,
		},
		[theme.breakpoints.down('xs')]: {
			height: 80,
		}
	},
	serviceTitle: {
		fontSize: '1.5rem',
		color: '#FFA114',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.4rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.2rem',
		}
	},
	serviceDetails: {
		fontSize: '1.05rem',
		margin: 0,
		color: 'white',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.97rem',
			lineSpacing: '1px'
		}
	},
	explore: {
		margin: '40px 0px 60px 0px',
		minHeight: 90,
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			minHeight: 85,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 80,
			margin: '10px 0px 60px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 60,
			margin: '10px 0px 40px 0px',
		}
	},
	exploreBg: {
		position: 'absolute',
		zIndex: 0,
		height: '100%',
		width: '100%',
		backgroundColor: '#102427',
		opacity: '0.6'
	},
	exploreInner: {
		zIndex: 1,
		backgroundColor: '#17303a',
		boxShadow: '0px 0px 2px #1d1818',
	},
	exploreMsg: {
		color: 'white',
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '1.8rem',
		cursor: 'pointer',
		margin: 0,
		transition: 'color 0.5s',
		'&:hover': {
			color: '#FFA114',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.6rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.4rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.2rem',
		}
	},
}));

interface Service {
	img: JSX.Element;
	name: string;
	details: string;	
}


const HomeExpertise = ():JSX.Element => {
	const classes:any = useStyle();
	const history = useHistory();
	const handleClick = ():void => history.push('/services');
	const services:Service[] = [
		{
			name: "Frontend Services",
			details: "Frontend technologies used for designing and developing client-side applications.",
			img: <Monitor className={classes.logo} viewBox="0 0 132.258 120" />
		},
		{
			name: "Backend Services",
			details: "Backend technologies include tools and skills used for designing application logic.",
			img: <Backend className={classes.logo} viewBox="0 0 139.091 120" />
		},
		{
			name: "Utility Services",
			details: "Utility technologies are those which help in deployment of applications.",
			img: <Utility className={classes.logo} viewBox="0 0 132.913 120" />
		}
	];
	const mappedServices:JSX.Element[] = services.map((item, key) => {
		return <Grid item key={key} xs={12} sm={6} md={3} container direction="column" alignItems="center" className={classes.service}>
			<Grid item>
				{item.img}
			</Grid>
			<Grid item>
				<h3 className={classes.serviceTitle}> {item.name} </h3>
 			</Grid>
 			<Grid item>
 				<p className={classes.serviceDetails}> {item.details} </p>
 			</Grid>
		</Grid>
	});
	return (
		<Grid item container justify="center" className={classes.root} xs={12}>
			<div className={classes.bg} />
			<LineDesign className={[classes.design, classes.designLeft].join(' ')} viewBox="0 0 400 109.298" />
			<LineDesign className={[classes.design, classes.designRight].join(' ')} viewBox="0 0 400 109.298" />
			<Grid item xs={11} md={10} lg={8} container direction="column" alignItems="center">
				<Grid item>
					<h2 className={classes.title}> <span style={{color: '#00CBFF'}}>Alpha</span> Expertise </h2>
				</Grid>
				<Grid item container className={classes.serviceContainer} justify="space-between">
					{mappedServices}
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="center" className={classes.explore}>
				<div className={classes.exploreBg} />
				<Grid item xs={11} sm={10} md={9} lg={8} container className={classes.exploreInner} justify="center" alignItems="center">
					<h4 className={classes.exploreMsg} onClick={handleClick}> 
						Explore our services
					</h4>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default HomeExpertise;