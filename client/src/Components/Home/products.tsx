//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
		minHeight: 961,
		[theme.breakpoints.down('sm')]: {
			minHeight: 861,
		}
	},
	title: {
		fontSize: '3rem',
		margin: '100px 0px 50px 0px',
		color: "#212121",
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.75rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
			marginTop: 70,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '2rem',
		}
	},
	productContainer: {
		'& > div.MuiGrid-item': {
			marginBottom: 20,
		},
		marginBottom: 50,
	},
	CTA: {
		backgroundColor: '#FFA114',
		color: 'white',
		fontSize: '1.5rem',
		fontWeight: 600,
		padding: '5px 20px',
		borderRadius: '40px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.4rem'
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
	excerpt: string;
	link: string;
	details: string;
	techs: string[];
	featured: boolean;
	pid: string;
}

const HomeProducts = ():JSX.Element => {
	const classes:any = useStyle();
	const history:any = useHistory();
	const {data} = useQuery(PRODUCTS);
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
		<Grid item xs={12} className={classes.root} container justify="center" id="products">
			<Grid item xs={11} md={10} container direction="column" alignItems="center">
				<Grid item>
					<h2 className={classes.title}> Check out our <span style={{color: '#FFA114'}}>Alpha</span> Products! </h2>
				</Grid>
				<Grid item container className={classes.productContainer}>
					{mappedProducts}
				</Grid>
				<Grid item>
					<Button className={classes.CTA} onClick={viewAll}> VIEW ALL </Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default HomeProducts;