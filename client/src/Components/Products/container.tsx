//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Custom components
import Rating from './rating';

//Utils
import React from 'react';
import {useHistory} from 'react-router-dom';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	parentRoot: {
		display: 'flex',
	},
	root: {
		'& > div.outer-container': {
			marginLeft: 30,
		},
		'& > div.img-container': {
			display: 'flex',
			justifyContent: 'flex-end',
		}
	},
	center: {
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		'& > div.MuiGrid-item': {
			maxWidth: '100%',
			flexBasis: '100%',
			justifyContent: 'center',
			[theme.breakpoints.down('sm')]: {
				marginBottom: 15,
			},
		},
		'& div.outer-container, div.inner-container': {
			alignItems: 'center',
		},
		'& > div.outer-container': {
			justifyContent: 'space-between',
		},
		'& div.inner-container': {
			'& > div.MuiGrid-item': {
				marginBottom: 8,
				'&.detail-container': {
					[theme.breakpoints.down('sm')]: {
						maxWidth: '80%',
					}
				},
			}
		},
		'& div.tech-container': {
			justifyContent: 'center',
			'& > div.MuiGrid-item': {
				margin: '5px 5px',
			}
		},
		'& div#linkholder': {
			justifyContent: 'center',
		}
	},
	inverse: {
		flexDirection: 'row-reverse',
		'& div.img-container': {
			justifyContent: 'flex-start',
		},
		'& > div.outer-container': {
			marginLeft: 0,
			marginRight: 30,
		},
		'& div.inner-container,div.outer-container': {
			alignItems: 'flex-end',
			textAlign: 'right',
		},
		'& div.tech-container': {
			justifyContent: 'flex-end',
			'& > div.MuiGrid-item': {
				margin: '0px 0px 10px 10px',
			}
		},
		'& div#linkholder': {
			justifyContent: 'flex-end',
		}
	},
	innerContainer: {
		display: 'flex',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 10,
		}
	},
	productImg: {
		[theme.breakpoints.down('md')]: {
			width: 200,
		},
		[theme.breakpoints.down('sm')]: {
			width: 210,
		},
		[theme.breakpoints.down('xs')]: {
			width: 190,
		}
	},
	title: {
		fontSize: '1.4rem',
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.2rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
		}
	},
	titleCenter: {
		fontSize: '1.3rem',
	},
	link: {
		color: '#035e75',
		textDecoration: 'none',
		fontSize: '0.97rem',
		'&:hover': {
			color: '#FFA114'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.93rem',
		}
	},
	category: {
		backgroundColor: '#00CBFF',
		color: 'black',
		fontSize: '0.75rem',
		'& > span.MuiChip-label': {
			padding: '5px 10px',
			[theme.breakpoints.down('sm')]: {
				fontSize: '0.7rem',
				padding: '3px 8px',
			}
		}
	},
	details: {
		fontSize: '1rem',
		margin: 0,
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.95rem',
		}
	},
	detailsCenter: {
		fontSize: '0.95rem',
	},
	techContainer: {
		'& > div.MuiGrid-item': {
			margin: '0px 10px 10px 0px',
			[theme.breakpoints.down('sm')]: {
				margin: '0px 5px',
			}
		},
	},
	techImg: {
		height: 20,
		[theme.breakpoints.down('sm')]: {
			height: 15,
		}
	},
	CTA: {
		fontSize: '1rem',
		fontWeight: 900,
		backgroundColor: '#191919',
		color: 'white',
		padding: '0px 15px',
		borderRadius: '5px',
		'&:hover': {
			color: '#191919'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '0.98rem',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '0px 12px',
			fontSize: '0.95rem',
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
	disabledSrc: {
		cursor: 'not-allowed',
		'& > img': {
			filter: 'invert(100%)',
			'&:hover': {
				boxShadow: 'unset',
			},
		}
	},
	linkholder: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	imgContainer: {
		minHeight: 238,
		[theme.breakpoints.down('md')]: {
			minHeight: 182,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 192,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 173
		}
	}
}));

interface Product {
	title: string;
	link: string;
	github: string;
	category: string;
	featured: boolean;
	techs: string[];
	pid: string;
	summary: string;
	rating: number;
}

interface Props {
	inverse?: boolean;
	center?: boolean;
	product: Product;
}

const ProductContainer = ({inverse, center, product}: Props):JSX.Element => {
	const classes:any = useStyle();
	const history:any = useHistory();
	const [rootCenter, setRootCenter]:[boolean, Function] = React.useState(false);
	const viewProduct = ():void => history.push(`/products/view?productid=${product.pid}`); 
	//Add center class when window is resized
	React.useEffect(() => {
		if (window.matchMedia('only screen and (max-width: 960px)').matches) setRootCenter(true);
		const handleRoot = ():void => {
			if (window.matchMedia('only screen and (max-width: 960px)').matches) setRootCenter(true);
			else setRootCenter(false);
		}
		window.addEventListener('resize', handleRoot.bind(ProductContainer));
		return window.removeEventListener('resize', handleRoot.bind(ProductContainer));
	}, []);

	const mappedTech:JSX.Element[] = product.techs.map((item, key) => {
		return <Grid item key={key}>
			<img className={classes.techImg} src={`/images/Stacks/${item}.png`} alt={`Stack logo: ${item}`} />
		</Grid>
	});

	const productImg =  <Grid item className={`img-container ${classes.imgContainer}`}>
		<img className={classes.productImg} src={`https://s3.us-east-2.amazonaws.com/alphadevelopment/thumbs/${product.pid}.jpg`} alt={"Product thumbnail"} />
	</Grid>;

	return (
		<Grid item xs={12} className={[center ?classes.center :rootCenter ?classes.center :[classes.root, inverse ?classes.inverse :''].join(' '), classes.parentRoot].join(' ')}>
			{!center && productImg}
			<Grid item xs={12} md={8} container direction="column" justify="space-between" className={'outer-container'}>
					<Grid item className={[classes.innerContainer, 'inner-container'].join(' ')}>
						{center && productImg}
						<Grid item>
							<h4 className={[classes.title, center ?classes.titleCenter :""].join(' ')}> {product.title} </h4>
						</Grid>
						<Grid item container id="linkholder" alignItems="center" className={classes.linkHolder} >
							<Grid item>
								<a className={classes.link} href={product.link} target="_blank" rel="noopener noreferrer"> {product.link} </a>
							</Grid>
							<Grid item>
								<a className={[classes.srcCode, 'src-code', !product.github && classes.disabledSrc].join(' ')} href={product.github || undefined} target="_blank" rel="noopener noreferrer">
									<img src={"/images/Logos/github.png"} alt={"Github logo"} />
								</a>
							</Grid>
						</Grid>
						<Grid item>
							<Rating value={product.rating} />
						</Grid>
						<Grid item className={'detail-container'}>
							<p className={[classes.details, center ?classes.detailsCenter :""].join(' ')}> {product.summary}... </p>
						</Grid>
						<Grid item container alignItems="center" className={[classes.techContainer, 'tech-container'].join(' ')}>
							{mappedTech}
						</Grid>
					</Grid>
					<Grid item>
						<Button className={classes.CTA} onClick={viewProduct}> VIEW </Button>
					</Grid>
			</Grid>
		</Grid>
	);
}

export default ProductContainer;