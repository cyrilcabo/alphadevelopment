import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Graphql
import {LIKE} from '../../Graphql/mutation';
import {IS_REVIEWED} from '../../Graphql/queries';
import {useMutation, useQuery} from 'react-apollo';

//Custom components
import Rating from '../Products/rating';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		[theme.breakpoints.up('md')]: {
			position: 'sticky',
			top: 0,
		},
		'& > div.MuiGrid-item': {
			marginBottom: '5px',
		}
	},
	title: {
		margin: '10px 0px 7px 0px',
		fontSize: '1.1rem',
		fontFamily: 'Helvetica, Arial, sans-serif',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		},
	},
	votedDetails: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '1rem',
		margin: '10px 0px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.98rem',
			margin: '8px 0px',
		},
		[theme.breakpoints.down('xs')]: {
			margin: '2px 0px',
			fontSize: '0.95rem'
		}
	},
	message: {
		fontFamily: 'serif',
		fontSize: '1rem',
		color: 'maroon',
		margin: '10px 0px',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			textAlign: 'center',
			fontSize: '0.98rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.95rem'
		},
		'& > p': {
			margin: 0,
		}
	},
	buttonGroup: {
		marginTop: 10,
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		},
		'& > div.MuiGrid-item': {
			marginRight: 15,
			[theme.breakpoints.down('sm')]: {
				margin: '0px 10px',
			},
			[theme.breakpoints.down('xs')]: {
				maxWidth: '90%',
				flexBasis: '90%',
				marginBottom: 10,
			}
		}
	},
	btn: {
		fontSize: '1rem',
		fontWeight: 550,
		width: 100,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		}
	},
	btnEdit: {
		width: 220,
		[theme.breakpoints.down('md')]: {
			width: 200,
		},
		[theme.breakpoints.down('sm')]: {
			width: 180
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%'
		}
	},
	main: {
		backgroundColor: '#3f8b4c',
		color: 'white',
		'&:hover': {
			color: '#3f8b4c'
		}
	},
	second: {
		backgroundColor: 'maroon',
		color: 'white',
		'&:hover': {
			color: 'maroon'
		}
	}
}));

interface Props {
	id: string;
	handleClose: HandleClose;
	data: Data;
	reviewRefetch: HandleReviewRefetch;
}

interface HandleClose {
	(): void;
}

interface HandleReviewRefetch {
	(): void;
}

interface Data {
	success: boolean;
  	name: string;
  	msg: string;
  	rating: number;
  	datePosted: number;
  	_id: string;
}


const RateProduct = (props: Props): JSX.Element => {
	const classes = useStyle();
	const {data, reviewRefetch} = props;
	const [rateProduct, {data: rateData, loading: rateLoading, error: rateError}] = useMutation(LIKE);
	const [rateValue, setRateValue] = React.useState(1);
	const [thoughts, setThoughts] = React.useState("");
	const [name, setName] = React.useState("");
	const [err, setErr] = React.useState(false);
	const [isVoted, setIsVoted] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);

	const handleThoughts = (e: any):void => setThoughts(e.target.value);
	const handleName = (e: any):void => setName(e.target.value);
	const handleRate = (value: number):void => setRateValue(value);

	const cancel = ():void => (isEditing) ?setIsEditing(false) :props.handleClose();
	const submitLike = ():void => {
		if (data.rating === rateValue && data.msg === thoughts) return;
		if (rateValue && (rateValue >= 1 && rateValue <= 5)) {
			rateProduct({variables: {pId: props.id, name: data.name || name, msg: thoughts, rating: rateValue, id: data ?data._id :""}});
		}
	}
	const editVote = ():void => setIsEditing(true);

	React.useEffect(() => {
		if (rateData && rateData.like.success) reviewRefetch();
	}, [rateData]);

	React.useEffect(() => {
		if (rateError || (rateData && !rateData.like.success)) setErr(true);
	}, [rateError, rateData]);

	React.useEffect(() => {
		if (data && data.success) {
			setIsVoted(true);
			setIsEditing(false);
			setErr(false);
			setName(data.name);
			setThoughts(data.msg);
			setRateValue(data.rating);
		}
	}, [data]);

	React.useEffect(() => {
		reviewRefetch();
	}, [props.id])

	return (
		<Grid item className={classes.root} container xs={12} direction="column">
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> 
						{isVoted
							?"You rated the product:"
							:"Rate the product"
						} 
					</h3>
				</Grid>
				<Grid item>
					{isVoted && !isEditing
						?<Rating isBig value={rateValue} />
						:<Rating isBig value={rateValue} interactive handleRate={handleRate} />
					}
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> 
						{isVoted
							?"Thoughts on the product:"
							:"Thoughts about the product?"
						} 
					</h3>
				</Grid>
				<Grid item>
					{isVoted && !isEditing
						?<p className={classes.votedDetails}> {thoughts} </p>
						:<TextField
							multiline
							fullWidth
							variant="outlined"
							placeholder="Wow it's an awesome site!"
							value={thoughts}
							onChange={handleThoughts}
						/>
					}
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> Your name </h3>
				</Grid>
				<Grid item>
					{isVoted
						?<p className={classes.votedDetails}> {name} </p>
						:<TextField
							fullWidth
							variant="outlined"
							placeholder="Lee Ji Eun (Optional)"
							value={name}
							onChange={handleName}
						/>
					}
				</Grid>
			</Grid>
			{err && (isEditing || !isVoted)
				? <Grid item container className={classes.message}>
					<p> Something went wrong... </p>
				</Grid>
				:""
			}
			<Grid item container className={classes.buttonGroup}>
				{isVoted && !isEditing
					?<Grid item>
						<Button
							className={[classes.btn, classes.main, classes.btnEdit].join(' ')}
							onClick={editVote}
						> Edit Review </Button>
					</Grid>	
					:<React.Fragment>
						<Grid item>
							<Button
								className={[classes.btn, classes.main, isVoted].join(' ')}
								disabled={rateLoading}
								onClick={submitLike}
							> 
								{rateLoading
									?<CircularProgress />
									:"Submit"
								} 
							</Button>
						</Grid>
						<Grid item>
							<Button
								className={[classes.btn, classes.second].join(' ')}
								disabled={rateLoading}
								onClick={cancel}
							> Cancel </Button>
						</Grid>
					</React.Fragment>
				}
			</Grid>
		</Grid>
	);
}

export default RateProduct;