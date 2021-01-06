import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import RateProduct from './rateproduct';
import RatingsList from './ratingslist';

//GraphQL
import {useQuery} from 'react-apollo';

import {REVIEWS, IS_REVIEWED} from '../../Graphql/queries';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
	},
	title: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '2rem',
		margin: '15px 0px 3px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.6rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.2rem'
		}
	},
	divider: {
		height: '1.5px',
		width: '100%',
		backgroundColor: '#d8d8d8',
		margin: '5px 0px'
	},
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		'& > div.MuiGrid-item': {
			[theme.breakpoints.down('sm')]: {
				width: '100%',
				flexBasis: '100%',
			}
		},
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			flexDirection: 'column'
		}
	},
	rateContainer: {
		position: 'relative',
		[theme.breakpoints.up('md')]: {
			width: '47%',
			flexBasis: '47%'
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 20
		}
	},
	listContainer: {
		[theme.breakpoints.up('md')]: {
			width: '50%',
			flexBasis: '50%'
		}
	}
}));

interface Props {
	title: string;
	id: string;
	reviews: number;
	handleClose: HandleClose;
	pid: string;
}

interface HandleClose {
	(): void;
}

interface Review {
	name: string;
	msg: string;
	rating: number;
	_id: string;
}

interface IsReviewed extends Review {
	success: boolean;
}

const RateFeature = (props: Props):JSX.Element => {
	const classes = useStyle();
	const {data: reviewData} = useQuery(IS_REVIEWED, {variables: {pid: props.id}});
	const [skip, setSkip] = React.useState(0);
	const {data, loading} = useQuery(REVIEWS, {variables: {pid: props.id, skip: skip}});
	const [hasMore, setHasMore] = React.useState(data ?data.reviews.length >= 12 :false)
	const [list, setList]: [Review[], Function] = React.useState([]);

	React.useEffect(() => {
		if (data) {
			setList((list: Review[]) => [...list, ...data.reviews]);
			setHasMore(data.reviews.length >= 12);
		}
	}, [data]);

	const loadMore = () => {
		setSkip(skip+12);
	}

	return (
		<Grid item xs={12} className={classes.root} container justify="center">
			<Grid item container xs={11} md={10} direction="column">
				<Grid item>
					<h2 className={classes.title}> {props.title} Reviews ({props.reviews}) </h2>
				</Grid>
				<Grid item>
					<div className={classes.divider} />
				</Grid>
				<Grid item className={classes.container}>
					<Grid item className={classes.rateContainer}>
						<RateProduct 
							id={props.id}
							pid={props.pid} 
							handleClose={props.handleClose} 
							data={reviewData && reviewData.isReviewed}
						/>
					</Grid>
					<Grid item className={classes.listContainer}>
						<RatingsList 
							id={props.id} 
							list={list} 
							loading={loading} 
							isVoted={(reviewData && reviewData.isReviewed.success) || false} 
							hasMore={hasMore}
							loadMore={loadMore}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default RateFeature;