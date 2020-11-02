//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Utils
import React from 'react';
import {useHistory} from 'react-router-dom';

//Custom components
import ProductContainer from '../Products/container';

//Graphql
import {useQuery} from 'react-apollo';
import {PRODUCTS} from '../../Graphql/queries';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 921,
		[theme.breakpoints.down('sm')]: {
			minHeight: 861,
		}
	},
	rootLoading: {
		minHeight: 600,
	},
	title: {
		fontSize: '3rem',
		margin: '100px 0px 50px 0px',
		letterSpacing: '2.5px',
		color: "#212121",
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.75rem',
			letterSpacing: '2px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
			marginTop: 70,
			letterSpacing: '2px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
			letterSpacing: '1px',
		}
	},
	productContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
		marginBottom: 50,
	},
	loadingContainer: {
		minHeight: 250,
		marginBottom: 50,
	},
	CTA: {
		backgroundColor: '#191919',
		color: 'white',
		fontSize: '1.4rem',
		fontWeight: 600,
		marginBottom: 20,
		padding: '5px 20px',
		borderRadius: '40px',
		'&:hover': {
			color: '#191919'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.35rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem',
			padding: '3px 15px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
			marginBottom: 80,
		}
	}
}));

interface Product {
	title: string;
	category: string;
	link: string;
	github: string;
	techs: string[];
	featured: boolean;
	pid: string;
	summary: string;
	rating: number;
}

const HomeProducts = ():JSX.Element => {
	const classes:any = useStyle();
	const history:any = useHistory();
	const {data, loading} = useQuery(PRODUCTS, {variables: {featured: true}});
	const [products, setProducts]: [Product[], Function] = React.useState([]);
	const viewAll = ():void => history.push('/products');

	React.useEffect(() => {
		if (data) setProducts(data.products);
	}, [data]);
	
	const mappedProducts:JSX.Element[] = products.filter((item:Product) => item.featured).map((item, key) => {
		return <Grid item xs={12} sm={6} md={12} key={key}>
			<ProductContainer product={item} inverse={key%2!==0} />
		</Grid>
	});
	return (
		<Grid item xs={12} className={loading ?classes.rootLoading :classes.root} container justify="center" id="products">
			<Grid item xs={11} md={10} container direction="column" alignItems="center">
				<Grid item>
					<h2 className={classes.title}> Check out our <span style={{color: '#FFA114'}}>Alpha</span> Products! </h2>
				</Grid>
				{loading
					?<Grid item container className={classes.loadingContainer} direction="column" alignItems="center" justify="center">
						<CircularProgress />
					</Grid>
					:<Grid item container className={classes.productContainer}>
						{mappedProducts}
					</Grid>
				}
				<Grid item>
					<Button className={classes.CTA} onClick={viewAll} disabled={loading}> VIEW ALL </Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default HomeProducts;