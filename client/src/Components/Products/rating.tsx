import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//SVG
import {ReactComponent as Star} from '../../images/SVG/Star.svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > div.MuiGrid-item': {
			margin: '0px 3px',
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
	half: {
		'& > path': {
			fill: 'url(#halfStar)',
		}
	}
}));

interface Props {
	isView?: Boolean;
}

const Rating = (props: Props):JSX.Element => {
	const classes = useStyle();
	//Get props
	const {isView} = props;

	const [rating, setRating]: [number, Function] = React.useState(4.7);

	//Separate whole number part and decimal part
	const rDown: number = Math.floor(rating);
	const deci: number = rating-rDown;

	const offset: number = deci * 100;
	
	const stars: JSX.Element[] = new Array(5).fill(1).map((item, index) => {
		const add: string = (index < rDown) ?classes.full :"";
		const half: string = (deci && index === rDown) ?classes.half :"";
		return <Grid item key={index}>
			<Star viewBox="0 0 28 26" className={[isView ?classes.bigStar :classes.star, add, half].join(' ')} />
		</Grid>
	});

	return (
		<Grid item className={classes.root}>
			<svg height={0} width={0} viewBox="0 0 0 0">
				<defs>
				    <linearGradient id="halfStar" x1="0%" y1="100%" x2="0%" y2="0%">
				      <stop offset="0%" style={{stopColor: "gold", "stopOpacity": 1}} />
				      <stop offset={`${offset}%`} style={{stopColor: "gold", "stopOpacity": 1}} />
				      <stop offset={`${offset}%`} style={{stopColor: "gray", "stopOpacity": 1}} />
				    </linearGradient>
				</defs>
			</svg>
			{stars}
		</Grid>
	);
}

export default Rating;