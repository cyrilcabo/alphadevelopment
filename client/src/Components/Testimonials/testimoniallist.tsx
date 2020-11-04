import React from 'react';

//Material
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

//Custom components
import TestimonialCard from './testimonialcard';

//Utils
import {featuredTestimonials} from '../Utils/featuredtestimonials';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		overflowX: 'hidden',
		scrollSnapType: 'x mandatory',
		scrollBehavior: 'smooth',
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			overflowX: 'auto'
		}
	},
	innerContainer: {
		flexWrap: 'nowrap',
		'& > div.MuiGrid-item': {
			width: '50%',
			flexShrink: 0,
			display: 'flex',
			justifyContent: 'center',
			scrollSnapAlign: 'start',
			scrollSnapStop: 'normal',
			marginRight: 5,
			marginLeft: 5,
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			}
		}
	},
	nav: {
		position: 'absolute',
		zIndex: 1,
		height: '100%',
		width: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		bottom: -25,
		cursor: 'pointer',
		'& span': {
			zIndex: 1,
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('md')]: {
			width: 40,
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	navInnerContainer: {
		position: 'relative',
		height: '70%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navBg: {
		zIndex: 0,
		position: 'absolute',
		height: '100%',
		width: '100%',
		opacity: '0.1',
		transition: 'opacity 0.3s',
		'&:hover': {
			opacity: '0.2'
		}
	},
	navLeft: {
		left: 0,
		'& .nav-bg-left': {
			backgroundImage: 'linear-gradient(to right, gray, white)',
		}
	},
	navRight: {
		right: 0,
		'& .nav-bg-right': {
			backgroundImage: 'linear-gradient(to left, gray, white)',
		}
	}
}));

interface Testimonial {
	name: string;
	content: string;
	image?: string;
	project: string;
}

const TestimonialList = ():JSX.Element => {
	const classes = useStyle();
	const rootEl = React.useRef(null);

	React.useEffect(() => {
		if (window.matchMedia('(max-width: 960px)').matches || (featuredTestimonials.length > 2 && window.matchMedia('(min-width: 960px)').matches)) {
			const time = window.matchMedia('(min-width: 960px)').matches ?10000 :5000;
			let pos = 1;
			const {current: el}: any = rootEl;
			const scroll:number = window.setInterval(() => {
				if (el.scrollLeft >= (el.scrollWidth-el.offsetWidth) || (el.scrollLeft <= el.offsetWidth && pos === -1)) pos *= -1;
				el.scrollLeft += (el.offsetWidth*pos);
			}, time);
			return () => { window.clearInterval(scroll); };
		}
	}, []);
	const navigate = (type: string):void => {
		const {current: el}:any = rootEl;
		if ((type==='left' && el.scrollLeft >= 0) || (type==='right' && el.scrollLeft <= (el.scrollWidth+el.offsetWidth))) {
			const op = type==='left' ?-1 :1;
			el.scrollLeft+=(el.offsetWidth*op);
		}
	}

	const testimonials = featuredTestimonials.map((item: Testimonial, key: number) => {
		return <Grid item key={key}>
			<TestimonialCard
				name={item.name}
				image={item.image}
				content={item.content}
				project={item.project}
			/>
		</Grid>
	})
	return (
		<Grid item container xs={12} justify="center" style={{position: 'relative'}}>
			<Grid item className={[classes.nav, classes.navLeft].join(' ')}>
				<ButtonBase className={classes.navInnerContainer} onClick={navigate.bind(TestimonialList, "left")}>
					<div className={[classes.navBg, "nav-bg-left"].join(' ')}/>
					<span> 	&lsaquo; </span>
				</ButtonBase>
			</Grid>
			<Grid item container className={classes.root} xs={12} sm={11} md={10} justify="center" alignItems="center" ref={rootEl}>
				<Grid item container className={classes.innerContainer} xs={12}>
					{testimonials}
				</Grid>
			</Grid>
			<Grid item className={[classes.nav, classes.navRight].join(' ')}>
				<ButtonBase className={classes.navInnerContainer} onClick={navigate.bind(TestimonialList, "right")}>
					<div className={[classes.navBg, "nav-bg-right"].join(' ')} />
					<span> &rsaquo; </span>
				</ButtonBase>
			</Grid>
		</Grid>
	);
}

export default TestimonialList;