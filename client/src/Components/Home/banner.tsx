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
		width: '100%',
		position: 'relative',
		backgroundColor: '#191919',
		color: 'white',
		[theme.breakpoints.up('xl')]: {
			minHeight: 769,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 580,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 450,
		}
	},
	rootImg: {
		position: 'absolute',
		zIndex: 0,
		height: '100%',
		width: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'local',
		backgroundSize: '100% 100%',
		[theme.breakpoints.only('xs')]: {
			backgroundImage: 'url(/images/Banner/Banner_XS.jpg)',
		},
		[theme.breakpoints.down('sm')]: {
			filter: 'brightness(0.4) contrast(1.2)',
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage: 'url(/images/Banner/Banner_SM.jpg)',
		},
		[theme.breakpoints.up('md')]: {
			filter: 'brightness(0.7)',
		},
		[theme.breakpoints.only('lg')]: {
			backgroundImage: 'url(/images/Banner/Banner_LG.jpg)',
		},
		[theme.breakpoints.only('xl')]: {
			backgroundImage: 'url(/images/Banner/Banner_XL.jpg)',
		},
	},
	bgImg: {
		height: 0,
		width: 0,
		display: 'none',
	},
	growthIcon: {
		marginBottom: 30,
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: 15,
		},
		'& > svg': {	
			[theme.breakpoints.down('md')]: {
				width: 70, 
			},
			[theme.breakpoints.down('xs')]: {
				width: 50,
			}
		}
	},
	growthNL: {
		display: 'flex',
	},
	contentContainer: {
		zIndex: 2,
	},
	content: {
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			textAlign: 'center'
		}
	},
	contentCenter: {
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		maxWidth: '100%',
		flexBasis: '100%'
	},
	title: {
		fontSize: '4rem',
		fontFamily: 'Helvetica, Arial, sans-serif',
		margin: '20px 0px 20px 0px',
		textShadow: '0px 0px 10px black',
		[theme.breakpoints.down('md')]: {
			fontSize: '3.3rem',
			margin: '0px 0px 15px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2.2rem',
		}
	},
	subTitle: {
		fontSize:'1.4rem',
		fontFamily: 'serif',
		margin: '0px 0px 80px 0px',
		textShadow: '0px 0px 7px black',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			marginBottom: 60,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem',
		}
	},
	CTA: {
		backgroundColor: '#FFA114',
		color: '#191919',
		fontWeight: 600,
		fontSize: '1.5rem',
		padding: '5px 20px',
		borderRadius: 40,
		'&:hover': {
			color: '#FFA114'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.45rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.15rem',
			padding: '3px 20px',
		}
	}
}));

const HomeBanner = ():JSX.Element => {
	const classes:any = useStyle();
	const image = React.useRef(null);

	const [imageLoaded, setImageLoaded]: [boolean, Function] = React.useState(image ?true :false);

	const handleLoad = ():void => setImageLoaded(true);

	return (
		<Grid item className={classes.root} container justify="center" alignItems="center">
			<div className={classes.rootImg} />
			<picture onLoad={handleLoad} ref={image} className={classes.bgImg} > 
				<source media="(min-width: 0px)" srcSet="/images/Banner/Banner_XS.jpg" />
				<source media="(min-width: 600px)" srcSet="/images/Banner/Banner_SM.jpg" />
				<source media="(min-width: 1280px)" srcSet="/images/Banner/Banner_LG.jpg" />
				<source media="(min-width: 1920px)" srcSet="/images/Banner/Banner_XL.jpg" />
				<object data={"/images/Banner/Banner_XS.jpg"} type="image/jpeg" aria-label="Banner fallback image"/>
			</picture>
			<Grid item xs={11} md={10} lg={10} container alignItems="center" className={classes.contentContainer}>
				<Grid item xs={12} md={7} lg={8} container direction="column" alignItems="flex-start" className={[classes.content, imageLoaded ?"" :classes.contentCenter].join(' ')}>	
					<Grid item className={[classes.growthIcon, imageLoaded ?"" :classes.growthNL].join(' ')}>
						<Growth viewBox="0 0 91 96.759"/>
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
		</Grid>
	);
} 

export default HomeBanner;