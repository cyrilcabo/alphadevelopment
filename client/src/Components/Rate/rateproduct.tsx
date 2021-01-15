import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Graphql
import {LIKE} from '../../Graphql/mutation';
import {IS_REVIEWED, PRODUCT, PRODUCTS} from '../../Graphql/queries';
import {SKIP_PRODUCTS} from '../../Graphql/localqueries';
import {useMutation} from 'react-apollo';

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
		height: '100%',
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
	},
	loader: {
		height: '1rem !important',
		width: '1rem !important',
		[theme.breakpoints.down('xs')]: {
			height: '25px !important',
			width: '25px !important'
		}
	}
}));

interface Props {
	id: string;
	pid: string;
	handleClose: HandleClose;
	data: IsReviewed;
}

interface HandleClose {
	(): void;
}

interface Data {
  	name: string;
  	msg: string;
  	rating: number;
  	datePosted: number;
  	_id: string;
}

interface IsReviewed extends Data {
	success: boolean;
}


const RateProduct = (props: Props): JSX.Element => {
	const classes = useStyle();
	const {data} = props;
	const [rateProduct, {data: rateData, loading: rateLoading, error: rateError}] = useMutation(LIKE, {
		update(cache, {data: {like}}) {
			//Update review state
			const prevState: any = cache.readQuery({query: IS_REVIEWED, variables: {pid: props.id}});
			cache.writeQuery({
				query: IS_REVIEWED,
				variables: {pid: props.id},
				data: {isReviewed: {
					...prevState.isReviewed, 
					name: like.name, 
					msg: like.msg, 
					rating: like.rating, 
					success: 
					like.success, 
					_id: prevState.isReviewed._id || like._id,
				}}
			});
			//Update parent product
			const productData: any = (cache.readQuery({query: PRODUCT, variables: {pid: props.pid}}) as any).product;
			const updatedReviews = like.new ?productData.reviews+1 :productData.reviews;
			const updatedRating = ((productData.rating*productData.reviews)+(like.rating-like.prev))/updatedReviews;
			cache.writeQuery({
				query: PRODUCT,
				variables: {pid: props.pid},
				data: {product: {
					...productData,
					rating: updatedRating,
					reviews: updatedReviews

				}}
			});

			//Update products list
			const skipData: any = cache.readQuery({query: SKIP_PRODUCTS});
			//Featured products
			if ((cache as any).data.data.ROOT_QUERY[`products({"featured":true})`]) {
				const featuredData:any = cache.readQuery({query: PRODUCTS, variables: {featured: true}});
				cache.writeQuery({
					query: PRODUCTS,
					variables: {featured: true},
					data: { products: featuredData.products.map((item: any) => {
						if (item._id===props.id) item.rating = updatedRating;
						return item;
					})}
				})
			}
			//All list
			for (let i = 0; i <= skipData.skipProducts; i+=12) {
				if ((cache as any).data.data.ROOT_QUERY[`products({"skip":${skipData.skipProducts}})`]) {
					const prevState: any = cache.readQuery({query: PRODUCTS, variables: {skip: i}});
					if (prevState.products.find((i: any) => i._id===props.id)) {
						cache.writeQuery({
							query: PRODUCTS,
							variables: {skip: i},
							data: {products: prevState.products.map((item:any) => {
								if (item._id===props.id) item.rating = updatedRating;
								return item;
							})}
						});
						break;
					}
				}
			}
		}
	});
	const [rateValue, setRateValue] = React.useState(1);
	const [thoughts, setThoughts] = React.useState("");
	const [name, setName] = React.useState(window.localStorage.getItem("alpha-name") || "");
	const [err, setErr] = React.useState(false);
	const [isVoted, setIsVoted] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);

	const handleThoughts = (e: any):void => setThoughts(e.target.value);
	const handleName = (e: any):void => setName(e.target.value);
	const handleRate = (value: number):void => setRateValue(value);

	const cancel = ():void => {
		if (isEditing) {
			setIsEditing(false);
			setName(data.name);
			setRateValue(data.rating);
			setThoughts(data.msg);
		} else {
			props.handleClose();
		}
	}
	const submitLike = ():void => {
		if (data.rating === rateValue && data.msg === thoughts) return;
		if (rateValue && (rateValue >= 1 && rateValue <= 5)) {
			window.localStorage.setItem("alpha-name", data.name || name);
			rateProduct({variables: {
				pId: props.id, 
				name: data.name || name, 
				msg: thoughts, 
				rating: rateValue,
				prev: data.rating || 0, 
				id: data ?data._id :""
			}});
		}
	}
	const editVote = ():void => setIsEditing(true);

	const update = (input: Data | IsReviewed):void => {
		setIsVoted(true);
		setIsEditing(false);
		setErr(false);
		setName(input.name);
		setThoughts(input.msg);
		setRateValue(input.rating);
	}

	React.useEffect(() => {
		if (rateError || (rateData && !rateData.like.success)) setErr(true);
	}, [rateError, rateData]);

	React.useEffect(() => {
		if (data && data.success) update(data);
	}, [data]);

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
									?<CircularProgress className={classes.loader}/>
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