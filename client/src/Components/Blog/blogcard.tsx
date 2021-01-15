import React from 'react';
import {useHistory} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Rating from '../Products/rating';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 250,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		cursor: 'pointer',
		'&:hover': {
			boxShadow: '0px 0px 6px gray',
		}
	},
	imgContainer: {
		height: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#06232a',
		[theme.breakpoints.down('sm')]: {
			height: 160
		},
		'& > img': {
			height: '100%',
			width: '100%'
		}
	},
	placeholder: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
		color: 'white',
		'& > img': {
			marginBottom: 10,
			height: 64,
			width: 64,
			[theme.breakpoints.down('md')]: {
				height: 54,
				width: 54
			},
			[theme.breakpoints.down('sm')]: {
				height: 44,
				width: 44,
			},
			[theme.breakpoints.down('xs')]: {
				height: 34,
				width: 34,
			}
		},
		'& > h3': {
			fontSize: '1.3rem',
			margin: 0,
			'& > span': {
				color: '#00CBFF'
			},
			[theme.breakpoints.down('md')]: {
				fontSize: '1.2rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.1rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem'
			}
		}
	},
	body: {
		padding: '10px 8px',
		display: 'flex',
		flexDirection: 'column',
		'& > h2': {
			color: '#06232a',
			fontSize: '1.8rem',
			margin: '0px 0px 5px 0px',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.6rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.4rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2rem'
			}
		}
	},
	categories: {
		display: 'flex',
		marginBottom: 5,
		'& > span': {
			fontSize: '1rem',
			marginRight: 5,
			color: '#1ecdfc',
			[theme.breakpoints.down('xs')]: {
				fontSize: '0.95rem'
			}
		}
	},
	rating: {
		display: 'flex',
		alignItems: 'center',
		'& > span': {
			marginLeft: 2,
		}
	}
}));

interface Props {
	img?: string,
	title: string,
	rating?: number,
	totalRating?: number,
	categories: string[],
	link: string
}

const BlogCard = ({img, title, rating, totalRating, categories, link}:Props):JSX.Element => {
	const classes = useStyle();
	const history = useHistory();

	const mappedCategories = categories.map((item, index) => {
		return <span key={index}> #{item} </span>
	});

	return (
		<Paper elevation={2} className={classes.root} onClick={() => {history.push(`/blogs/read?blogid=${link}`)}}>
			<Grid item className={classes.imgContainer}>
				{img
					?<img src={img} alt={"Blog thumbnail"} />
					:<Grid item className={classes.placeholder}>
						<img src={'/icons/logo_64.png'} alt={""} />
						<h3> Alpha<span>Development</span> </h3>
					</Grid>
				}
			</Grid>
			<Grid item className={classes.body}>
				<h2> {title} </h2>
				<div className={classes.categories}>
					{mappedCategories}
				</div>
				<div className={classes.rating}>
					<Rating value={rating || 0} />
					<span> ({totalRating || 0}) </span>
				</div>
			</Grid>
		</Paper>
	);
}

export default BlogCard;