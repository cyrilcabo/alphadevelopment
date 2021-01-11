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
	const posts = [
		{
			title: "Hello wassup mahniggas!",
			rating: 3.5,
			totalRating: 10,
			categories: ["niggas", "beginners"]
		},
		{
			title: "Welcome to my blog, this is Cyril",
			rating: 5,
			totalRating: 999,
			categories: ["daily", "wassup"]
		},
		{
			title: "Welcome to my blog, this is Cyril",
			rating: 5,
			totalRating: 999,
			categories: ["daily", "wassup"]
		},
		{
			title: "Welcome to my blog, this is Cyril",
			rating: 5,
			totalRating: 999,
			categories: ["daily", "wassup"]
		},
		{
			title: "Welcome to my blog, this is Cyril",
			rating: 5,
			totalRating: 999,
			categories: ["daily", "wassup"]
		}
	].map((item, index) => {
		return <Grid item>
			<BlogCard 
				key={index}
				title={item.title} 
				categories={item.categories}
				rating={item.rating}
				totalRating={item.totalRating}
			/>
		</Grid>
	})
	return (
		<Layout relatedLinks={relatedLinks}>
			<Grid item xs={12} className={classes.root}>
				{posts}
			</Grid>
		</Layout>
	);
}

export default Blogs;