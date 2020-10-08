//Material components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';
import qs from 'qs';
import {useHistory, useLocation} from 'react-router-dom';

//Graphql
import {useQuery} from 'react-apollo';
import {PRODUCTS} from '../../Graphql/queries';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	title: {
		margin: '70px 0px 40px 0px',
		'& h1': {
			fontSize: '3.5rem',
			[theme.breakpoints.down('sm')]: {
				fontSize: '3rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '2.5rem',
			}
		},
		'& button': {
			color: 'white',
			backgroundColor: '#00CBFF',
			fontSize: '1rem',
			fontWeight: 600,
			padding: '5px 15px',
			borderRadius: '30px',
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.9rem'
			}
		},
		[theme.breakpoints.down('md')]: {
			marginTop: 50,
		},
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'flex-start',
			marginBottom: 60,
			marginTop: 40,
		}
	},
	container: {
		backgroundColor: '#f9f9f9',
		minHeight: 500,
		marginBottom: 100,
		padding: '50px 0px',
		position: 'relative'
	},
	innerContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	productImgContainer: {
		position: 'sticky',
		alignSelf: 'flex-start',
		top: 60,
		justifyContent: 'center',
		[theme.breakpoints.up('lg')]: {
			width: '37.5%',
			maxWidth: '37.5%',
			flexBasis: '37.5%'
		},
		[theme.breakpoints.down('md')]: {
			justifyContent: 'space-between',
			marginBottom: 20,
			position: 'relative',
			top: 0,
		},
		[theme.breakpoints.down('xs')]: {
			padding: 0,
		}
	},
	imgContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'height 1s',
		minHeight: 375,
		marginBottom: 10,
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#212121',
		},
	},
	imgPreview: {
		backgroundColor: '#e6e6e6',
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'auto',
		[theme.breakpoints.down('md')]: {
			height: 'unset',
			flexDirection: 'column',
		},
		[theme.breakpoints.down('xs')]: {
			height: 60,
			flexDirection: 'row',
			display: 'inline-flex'
		},
	},
	thumbs: {
		height: 65,
		width: 65,
		cursor: 'pointer',
		margin: '0px 10px',
		[theme.breakpoints.down('md')]: {
			margin: '10px 0px',
			height: 80,
			width: 80
		},
		[theme.breakpoints.down('sm')]: {
			height: 72,
			width: 72,
		},
		[theme.breakpoints.down('xs')]: {
			height: 50,
			width: 50,
			margin: '0px 10px',
		},
		'&:hover': {
			boxShadow: '0px 0px 1.5px #313131',
			'& > img': {
				opacity: '1',
			}
		},
		'& > img': {
			height: '100%',
			width: '100%',
			opacity: '0.5',
			transition: 'opacity 0.3s',
		}
	},
	thumbsActive: {
		'& > img': {
			opacity: '1',
		}
	},
	productImg: {
		maxHeight: 376,
		height: 'auto',
		transition: 'height 1s',
		[theme.breakpoints.down('md')]: {
			maxHeight: 'unset',
			maxWidth: '100%',
		},
		[theme.breakpoints.down('xs')]: {
			boxShadow: '0px 0px 1px #313131'
		}
	},
	detailsContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
	},
	titleContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 18,
			[theme.breakpoints.down('xs')]: {
				marginBottom: 9,
			}
		}
	},
	productTitle: {
		'& > h3': {
			fontSize: '2.5rem',
			margin: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: '2.2rem',
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.8rem',
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.7rem'
			}
		},
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			textAlign: 'center',
			justifyContent: 'center',
			marginBottom: 10,
		}
	},
	productLink: {
		textDecoration: 'none',
		color: '#00CBFF',
		fontSize: '1.2rem',
		'&:hover': {
			color: '#FFA114',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		}
	},
	productCategory: {
		'& > div': {
			backgroundColor: '#0683a2',
			color: 'white',
			fontSize: '0.75rem',
			fontWeight: 550,
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.7rem',
				'& > span': {
					padding: '5px 10px',
				}
			},
		},
		[theme.breakpoints.down('xs')]: {
			display: 'flex',
			justifyContent: 'center'
		}
	},
	productDetails: {
		fontFamily: 'sans-serif',
		textAlign: 'justify',
		fontSize: '1.2rem',
		margin: 0,
		lineHeight: '30px',
		letterSpacing: '1px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
			lineHeight: '27px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			lineHeight: '25px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.9rem',
		}
	},
	sectionTitle: {
		fontFamily: 'sans-serif',
		fontSize: '1.7rem',
		margin: '15px 0px 0px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.6rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.3rem'
		}
	},
	featureTitle: {
		fontSize: '1.3rem',
		marginBottom: 0,
		letterSpacing: '1.8px',
		fontFamily: 'sans-serif',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.25rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.15rem',
			letterSpacing: '1.5px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.05rem',
			letterSpacing: '1.35px'
		}
	},
	featureDetails: {
		fontFamily: 'sans-serif',
		letterSpacing: '1px',
		lineHeight: '30px',
		marginTop: '5px',
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.98rem',
			lineHeight: '25px',
		},
		[theme.breakpoints.down('xs')]: {
			lineHeight: '22px',
			letterSpacing: 0,
			textAlign: 'justify'
		}
	},
	productTechContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-around'
		}
	},
	productTech: {
		marginRight: 15,
		marginBottom: 15,
		height: 35,
		[theme.breakpoints.down('md')]: {
			height: 30,
		},
		[theme.breakpoints.down('xs')]: {
			margin: '7.5px 7.5px',
			height: 25,
		}
	},
	linkContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		}
	},
	srcCode: {
		'& > img': {
			height: 20,
			borderRadius: '100%',
			'&:hover': {
				boxShadow: '0px 0px 1px black',
			},
			[theme.breakpoints.down('md')]: {
				height: 15,
			}
		},
		marginLeft: 5,
	},
}));

interface Product {
	title: string;
	link: string;
	github: string;
	pid: string;
	category: string;
	details: ProductDetail;
	techs: string[];
	images: string[];
}

interface ProductDetail {
	intro: string;
	features: ProductFeature[];
}

interface ProductFeature {
	title: string;
	details: string;
}

interface ProductImage {
	active: boolean;
	name: string;
}

const ViewProduct = ():JSX.Element => {
	const classes = useStyle();
	const history = useHistory();
	const location = useLocation();
	const {productid} = qs.parse(location.search, {ignoreQueryPrefix: true});
	const {data} = useQuery(PRODUCTS); 

	const viewAll = ():void => history.push('/products');

	const [product, setProduct]: [Product, Function] = React.useState({
		title: "",
		link: "",
		github: "",
		category: "",
		pid: "",
		images: [],
		details: {
			intro: "",
			features: [],
		},
		techs: [], 
	});

	const [activeImage, setActiveImage]: [string, Function] = React.useState("");
	const [imageLoading, setImageLoading]: [boolean, Function] = React.useState(false);

	const onLoad = (e: any): void => setImageLoading(false);

	const makeImageActive = (name: string):void => {
		if (name===activeImage) return;
		setActiveImage(name);
		setImageLoading(true);
	}

	React.useEffect(() => {
		if (data) setProduct(data.products.find((item:Product) => item.pid===productid));
	}, [data, productid]);

	React.useEffect(() => {
		setActiveImage(product.images[0]);
		setImageLoading(true);
	}, [product.images]);

	const mappedTechs:JSX.Element[] = product.techs.map((item, key) => {
		return <Grid item key={key}>
			<img className={classes.productTech} src={`/images/Stacks/${item}.png`} alt={`[Tech] Logo of ${item}`} />
		</Grid>
	});

	const imgThumbs:JSX.Element[] = product.images.map((item, key) => {
		return <Grid item key={key} className={`${classes.thumbs} ${activeImage===item ?classes.thumbsActive :""}`} onClick={makeImageActive.bind(ViewProduct, item)}>
			<img src={`https://s3.us-east-2.amazonaws.com/alphadevelopment/products/${product.pid}/thumbs/${item}.jpg`} />
		</Grid>
	});

	const features:JSX.Element[] = product.details.features.map((item, key) => {
		return <Grid item>
			<h3 className={classes.featureTitle}> {item.title} </h3>
			<p className={classes.featureDetails}> {item.details} </p>
		</Grid>
	});

	return (
		<Grid item xs={12}>	
			<Grid item xs={12} container justify="center">
				<Grid item xs={11} md={10} container>
					<Grid item className={classes.title} container alignItems="center" justify="space-between">
						<Grid item>
							<h1> Products/<span style={{color: '#FFA114'}}>{product.title}</span> </h1>
						</Grid>
						<Grid item>
							<Button onClick={viewAll}> View all </Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} container className={classes.container} justify="center" alignItems="center">
				<Grid item xs={11} sm={10} container justify="space-between" className={classes.innerContainer}>
					<Grid item container xs={12} className={classes.productImgContainer} >
						<Grid item container xs={12} sm={9} lg={12} className={classes.imgContainer}>	
							<img 
								className={classes.productImg} 
								alt={`Product preview of ${product.title}`} 
								src={`https://s3.us-east-2.amazonaws.com/alphadevelopment/products/${product.pid}/${activeImage}.jpg`}
								onLoad={onLoad} 
								style={{display: imageLoading ?'none' :'block'}}
							/>
							{imageLoading && <CircularProgress />}
						</Grid>
						<Grid item container xs={12} sm={2} lg={12} className={classes.imgPreview}>
							{imgThumbs}
						</Grid>
					</Grid>
					<Grid item xs={12} lg={7} container direction="column" className={classes.detailsContainer}>
						<Grid item container direction="column" className={classes.titleContainer}>
							<Grid item className={classes.productTitle}>
								<h3> {product.title} </h3>
							</Grid>
							<Grid item container className={classes.linkContainer} alignItems="center">
								<Grid item>	
									<a className={classes.productLink} href={product.link} target="_blank" rel="noopener noreferrer"> {product.link} </a></Grid>
								<Grid item>
									<a className={classes.srcCode} href={product.github} target="_blank" rel="noopener noreferrer">
										<img src={"/images/Logos/github.png"} />
									</a>
								</Grid>
							</Grid>
							<Grid item className={classes.productCategory} >
								<Chip label={product.category} />
							</Grid>
						</Grid>
						<Grid item>
							<h2 className={classes.sectionTitle}> Introduction </h2>
							<hr />
							<p className={classes.productDetails}> {product.details.intro} </p>
						</Grid>
						<Grid item>
							<h2 className={classes.sectionTitle}> Technologies </h2>
							<hr />
							<Grid item className={classes.productTechContainer} container>
								{mappedTechs}
							</Grid>
						</Grid>
						<Grid item>
							<h2 className={classes.sectionTitle}> Features </h2>
							<hr />
							<Grid item container direction="column">
								{features}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ViewProduct;