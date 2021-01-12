import React from 'react';

import Layout from '../Blog/layout';
import BlogCard from '../Blog/blogcard';

import Grid from '@material-ui/core/Grid';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'space-between'
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
		'& > div.MuiGrid-item': {
			marginBottom: 30,
			width: '45%',
			[theme.breakpoints.down('md')]: {
				marginBottom: 25,
				width: '48%',
			},
			[theme.breakpoints.down('sm')]: {
				marginBottom: 15,
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%'
			}
		},
		'&::after': {
			content: "''",
			width: '45%'
		}
	},
	emptyMessage: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		textAlign: 'center',
		'& > div': {
			display: 'flex',
			width: '100%',
			flexDirection: 'column',
			alignItems: 'center',
			'& > img': {
				height: 128,
				width: 128,
				marginBottom: 10,
				[theme.breakpoints.down('md')]: {
					height: 115,
					width: 115,
				},
				[theme.breakpoints.down('sm')]: {
					height: 96,
					width: 96,
				}
			},
			'& > h2': {
				margin: 10,
				fontSize: '1.3rem',
				color: 'maroon',
				[theme.breakpoints.down('md')]: {
					fontSize: '1.25rem'
				},
				[theme.breakpoints.down('sm')]: {
					fontSize: '1.2rem'
				},
				[theme.breakpoints.down('xs')]: {
					fontSize: '1.1rem'
				}
			}
		}
	}
}));

const Blogs = ():JSX.Element => {
	const classes = useStyle();
	const relatedLinks = [
		{
			title: "Featured blogs",
			links: [
				{
					title: "Start a Hello World app now",
					link: "#"
				},
				{
					title: "How about a Hi World app?",
					link: "#"
				},
			],
		}
	];
	const posts:any = [
		{
			title: "Hello wassup mahniggas!",
			rating: 3.5,
			totalRating: 10,
			categories: ["niggas", "beginners"]
		},
	].map((item, index) => {
		return <Grid item key={index}>
			<BlogCard 
				key={index}
				title={item.title} 
				categories={item.categories}
				rating={item.rating}
				totalRating={item.totalRating}
			/>
		</Grid>
	});
	return (
		<Layout relatedLinks={relatedLinks}>
			<Grid item xs={12} className={[classes.root, !posts.length && classes.emptyMessage].join(' ')}>
				{posts.length
					?posts
					:<div>
						<img src="/icons/logo_128.png" alt="" />
						<h2> Sorry. There are no posts here, yet. </h2>
					</div>
				}
			</Grid>
		</Layout>
	);
}

export default Blogs;