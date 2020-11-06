import React from 'react';

//Material 
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Graphql
import {useQuery} from 'react-apollo';
import {TESTIMONIALS} from '../../Graphql/queries';

//Custom
import TestimonialCard from '../Testimonials/testimonialcard';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 600,
		padding: '40px 0px 100px 0px',
	},
	title: {
		fontFamily: 'Arial, Helvetica, sans-serif',
		display: 'flex',
		justifyContent: 'flex-start',
		textAlign: 'left',
		width: '70%',
		margin: '50px 0px 80px 0px',
		color: '#06232a',
		'& h2': {
			fontSize: '3.5rem',
			margin: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: '3rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '2.5rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.8rem'
			}
		},
		[theme.breakpoints.down('md')]: {
			margin: '40px 0px 70px 0px'
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			justifyContent: 'center',
			textAlign: 'center',
			margin: '30px 0px 60px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			margin: '20px 0px 50px 0px'
		}

	},
	testimonialContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		}
	},
	testimonial: {
		marginBottom: 50,
	},
	loadingContainer: {
		margin: '10px 0px',
		'& p': {
			margin: 0,
		},
		'& > div.MuiGrid-item': {
			margin: "15px 0px",
		}
	}
}));

interface Testimonial {
	_id: string;
	name: string;
	content: string;
	image?: string;
	project: string;
	featured: boolean;
}

const ServiceTestimonials = ():JSX.Element => {
	const classes = useStyle();
	const [skip, setSkip] = React.useState(0);
	const {data, loading} = useQuery(TESTIMONIALS, {variables: {skip: skip}});
	const [hasMore, setHasMore] = React.useState(data ?data.testimonials.length >= 10 :false);
	const [testimonials, setTestimonials]: [Testimonial[], Function] = React.useState([]);

	React.useEffect(() => {
		if (data) {
			setTestimonials((tstm: Testimonial[]) => [...tstm, ...data.testimonials]);
			setHasMore(data.testimonials.length >= 10);
		}
	}, [data]);

	React.useEffect(() => {
		const scroll = () => {
			if (window.scrollY >= (document.body.offsetHeight - window.innerHeight - 155) && hasMore && !loading) 
				setSkip((s: number) => s+10);
		}
		window.addEventListener("scroll", scroll);
		if (!hasMore) window.removeEventListener("scroll", scroll);
		return () => { window.removeEventListener("scroll", scroll); };
	}, [hasMore, loading]);

	const testimonialList = testimonials.map((item: Testimonial, index: number) => {
		return <Grid item container justify="center" xs={12} md={6} className={classes.testimonial} key={index}>
			<TestimonialCard
				name={item.name}
				content={item.content}
				image={item.image}
				project={item.project}
			/>
		</Grid>
	});

	return (
		<Grid item className={classes.root} container xs={12} justify="center">
			<Grid item container xs={11} md={10}>	
				<Grid item className={classes.title}>
					<h2> What people say about our services </h2>
				</Grid>
				<Grid item className={classes.testimonialContainer} container justify="space-between">
					{testimonialList}
				</Grid>
			</Grid>
			{loading
				?<Grid item container className={classes.loadingContainer} xs={12} justify="center" alignItems="center" direction="column">
					<Grid item>
						<CircularProgress />
					</Grid>
					<Grid item>
						<p> Loading testimonials ... </p>
					</Grid>
				</Grid>
				:""
			}
</Grid>
	);
}

export default ServiceTestimonials;