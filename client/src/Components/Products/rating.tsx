import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//SVG
import {ReactComponent as Star} from '../../images/SVG/Star.svg';

//Utility
import {compute} from '../Utils/compute';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	stars: {
		display: 'flex',
		alignItems: 'center',
		'& > div.MuiGrid-item': {
			margin: '0px 3px',
		},
	},
	starsInteractive: {
		cursor: 'pointer',
		'&:hover ~ div.MuiGrid-item > p.rate-num': {
			color: '#00CBFF',
		}
	},
	star: {
		height: 20,
		width: 20,
	},
	bigStar: {
		height: 25,
		width: 25,
	},
	full: {
		'& > path': {
			fill: 'gold',
		}
	},
	half25: {
		'& > path': {
			fill: 'url(#half-25)',
		}
	},
	half50: {
		'& > path': {
			fill: 'url(#half-50)',
		}
	},
	half75: {
		'& > path': {
			fill: 'url(#half-75)',
		}
	},
	half100: {
		'& > path': {
			fill: 'url(#half-100)',
		}
	},
	interactive: {
		cursor: 'pointer',
	},
	rateNum: {
		fontSize: '1.2rem',
		margin: 0,
		cursor: 'pointer',
		'&:hover': {
			color: '#00CBFF',
		}
	}
}));

interface Props {
	isView?: boolean;
	handleOpen?: HandleOpen;
	isBig?: boolean;
	interactive?: boolean;
	value?: number;
	handleRate?: HandleRate;
	reviews?: number;
}

interface HandleOpen {
	(): void;
}

interface HandleRate {
	(value: number): void;
}

const Rating = (props: Props):JSX.Element => {
	const classes = useStyle();
	//Get props
	const {isView, isBig, handleOpen, handleRate, value, interactive, reviews} = props;

	const rating = value || 0;

	//Separate whole number part and decimal part
	const rDown: number = Math.floor(rating);
	const deci: number = rating-rDown;

	const offset: number = deci * 100;

	const handleHover = (rateValue: number): void => {
		if (interactive && handleRate) handleRate(rateValue);
	}
	
	const stars: JSX.Element[] = new Array(5).fill(1).map((item, index) => {
		const add: string = (index < rDown) ?classes.full :"";
		const half: string = (deci && index === rDown) ?compute(offset, classes) :"";
		return <Grid item key={index} onClick={handleOpen} onMouseOver={handleHover.bind(Rating, index+1)} >
			<Star 
				viewBox="0 0 28 26" 
				className={[
					isBig ?classes.bigStar :classes.star,  
					interactive ?classes.interactive :"", 
					add, 
					half
				].join(' ')} 
			/>
		</Grid>
	});

	return (
		<Grid item className={classes.root}>
			<Grid item className={[classes.stars, (interactive || isView) && classes.starsInteractive].join(' ')}>
				{stars}
			</Grid>
			{isView
				?<Grid item>
					<p className={[classes.rateNum, "rate-num"].join(' ')} onClick={handleOpen}> ({reviews}) </p>
				</Grid>
				:""
			}
		</Grid>
	);
}

export default Rating;