//Material components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

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
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'flex-start',
			marginBottom: 60,
		}
	},
	container: {
		backgroundColor: '#f9f9f9',
		minHeight: 500,
		marginBottom: 100,
		padding: '50px 0px',
	},
	innerContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	productImgContainer: {
		width: '100%',
		[theme.breakpoints.down('md')]: {	
			justifyContent: 'center',
			alignItems: 'flex-start'
		},
		[theme.breakpoints.down('sm')]: {
			backgroundColor: '#212121',
			marginBottom: 20,
		}
	},
	productImg: {
		maxHeight: 376,
		[theme.breakpoints.down('md')]: {
			maxHeight: 350,
		},
		[theme.breakpoints.down('sm')]: {
			maxHeight: 300,
		},
		[theme.breakpoints.down('xs')]: {
			maxHeight: 190,
		}
	},
	detailsContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			textAlign: 'center'
		}
	},
	productTitle: {
		fontSize: '2rem',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
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
	productDetails: {
		fontFamily: 'serif',
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
	details: string;
	techs: string[];
}

const ViewProduct = ():JSX.Element => {
	const classes:any = useStyle();
	const history:any = useHistory();
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
		details: "",
		techs: [], 
	});

	React.useEffect(() => {
		if (data) setProduct(data.products.find((item:Product) => item.pid===productid));
	}, [data, productid]);

	const mappedTechs:JSX.Element[] = product.techs.map((item, key) => {
		return <Grid item key={key}>
			<img className={classes.productTech} src={`/images/Stacks/${item}.png`} alt={`[Tech] Logo of ${item}`} />
		</Grid>
	})
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
					<Grid item container xs={12} md={7} lg={3} className={classes.productImgContainer} >
						<img className={classes.productImg} alt={`Product preview of ${product.title}`} src={`https://s3.us-east-2.amazonaws.com/alphadevelopment/products/${product.pid}/index.jpg`} />
					</Grid>
					<Grid item xs={12} md={5} lg={7} container direction="column" className={classes.detailsContainer}>
						<Grid item>
							<h3 className={classes.productTitle}> {product.title} </h3>
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
						<Grid item>
							<Chip className={classes.productCategory} label={product.category} />
						</Grid>
						<Grid item>
							<p className={classes.productDetails} dangerouslySetInnerHTML={{__html: product.details.replace(/(\/n)/g, "<br /><br />",)}} />
						</Grid>
						<Grid item className={classes.productTechContainer} container>
							{mappedTechs}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ViewProduct;