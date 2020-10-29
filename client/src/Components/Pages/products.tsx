//Material components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';

//Custom components
import ProductContainer from '../Products/container';

//Graphql
import {useQuery} from 'react-apollo';
import {PRODUCTS} from '../../Graphql/queries';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		paddingBottom: 100,
		minHeight: 600,
	},
	container: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		}
	},
	productContainer: {
		margin: '0px 5px 100px 5px',
		[theme.breakpoints.down('sm')]: {
			margin: '0px 0px 40px 0px',
		}
	},
	title: {
		'& > h1': {
			fontSize: '3.5rem',
			margin: '80px 0px',
			[theme.breakpoints.down('sm')]: {
				margin: '60px 0px',
				fontSize: '3rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '2.5rem',
			}
		},
		[theme.breakpoints.down('sm')]: {
			textAlign: 'center',
			justifyContent: 'center',
		}
	},
	productsContainer: {
		[theme.breakpoints.up('md')]: {
			'&::after': {
				content: "''",
				flexBasis: '25%',
			}
		}
	},
	loadingContainer: {
		minHeight: 300,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			minHeight: 250,
		}
	}
}));

interface Product {
	title: string;
	link: string;
	github: string;
	details: ProductDetail;
	category: string;
	techs: string[];
	images: string[];
	featured: boolean;
	pid: string;
}

interface ProductDetail {
	intro: string;
	features: ProductFeature[];
}

interface ProductFeature {
	title: string;
	details: string;
}

const Products = ():JSX.Element => {
	const classes:any = useStyle();
	const [products, setProducts]: [Product[], Function] = React.useState([]);
	const {data, loading} = useQuery(PRODUCTS);
	React.useEffect(() => {
		if (data) setProducts(data.products);
	}, [data]);
	const mappedProducts:JSX.Element[] = products.sort((a:any, b:any) => b.featured-a.featured).map((item:Product, key:number) => {
		return <Grid item xs={12} sm={6} md={3} key={key} className={classes.productContainer} container>
			<ProductContainer center={true} product={item} />
		</Grid>
	});
	return (
		<Grid item xs={12} container justify="center" className={classes.root}>
			<Grid item container direction="column" xs={11} md={10}>	
				<Grid item container className={classes.title}>
					<h1> <span style={{color: '#00CBFF'}}>Alpha</span> Products </h1>
				</Grid>
				{loading
					?<Grid item container className={classes.loadingContainer} alignItems="center" justify="center" direction="column">
						<CircularProgress />
						<p> Loading products... </p>
					</Grid>
					:<Grid item container justify="space-between" className={classes.productsContainer}>
						{mappedProducts}
					</Grid>
				}
			</Grid>
		</Grid>
	);
}

export default Products;