import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Custom components
import RatingsCard from './ratingscard';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		'& > div.MuiGrid-item': {
			marginBottom: 15,
		}
	},
	loading: {
		margin: '15px 0px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		'& > p': {
			margin: '10px 0px 0px 0px',
			fontSize: '1rem',
			color: '#313131'
		}
	},
	empty: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '1.2rem',
		color: 'maroon',
		margin: '15px 0px',
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.1rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem'
		}
	},
	success: {
		color: 'green'
	}
}));

interface Props {
	id: string;
	list: Review[];
	loading: boolean;
	isVoted: boolean;
}

interface Review {
	name: string;
	msg: string;
	rating: number;
}

const RatingsList = (props: Props) => {
	const classes = useStyle();
	const {list, loading, isVoted} = props;

	const cards = list.map((item, key) => {
		return <Grid item key={key}>
			<RatingsCard 
				name={item.name}
				msg={item.msg}
				rating={item.rating}
			/>
		</Grid>
	})
	return (
		<Grid item xs={12} className={classes.root} container direction="column">
			{!list.length
				?<Grid item className={[classes.empty, isVoted ?classes.success :""].join(" ")}>
					{isVoted
						?"You are the first to rate the product!"
						:"No reviews are available. Be the first one!"
					}
				</Grid>
				:cards
			}
			{loading
				?<Grid item className={classes.loading}>
					<CircularProgress />
					<p> Loading reviews... </p>
				</Grid>
				:""
			}
		</Grid>
	);
}

export default RatingsList;