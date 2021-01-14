import React from 'react';

import Grid from '@material-ui/core/Grid';

import Link from '../../Types/Blog/link';
import Sections from '../../Types/Blog/sections';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		paddingTop: '10px',
		display: 'flex',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 15,
			display: 'flex',
			flexDirection: 'column',
			'& > h2': {
				margin: '0px 0px 10px 0px',
				fontSize: '1.7rem',
				[theme.breakpoints.down('md')]: {
					marginBottom: 8,
					fontSize: '1.6rem'
				},
				[theme.breakpoints.down('sm')]: {
					marginBottom: 7,
					fontSize: '1.5rem'
				},
				[theme.breakpoints.down('xs')]: {
					fontSize: '1.4rem',
				}
			},
			'& > a': {
				fontSize: '1.2rem',
				textDecoration: 'none',
				margin: '0px 0px 5px 0px',
				color: '#0282a2',
				'&:hover': {
					color: '#fda531'
				},
				[theme.breakpoints.down('md')]: {
					marginBottom: 4,
				},
				[theme.breakpoints.down('sm')]: {
					fontSize: '1.1rem',
					marginBottom: 3,
				},
				[theme.breakpoints.down('xs')]: {
					fontSize: '1rem'
				}
			}
		},
	},
	emptyMessage: {
		'& p': {
			margin: 0,
			fontSize: '1.1rem',
			color: '#4c4c4c',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.05rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1rem'
			},
		}
	}
}));

interface Props {
	relatedLinks: Sections[],
}

const RelatedList = ({relatedLinks}:Props):JSX.Element => {
	const classes = useStyle();

	const mappedPosts = (posts:Link[]):JSX.Element[] => posts.map((item, index) => {
		return <a href={item.link} key={index}> {item.title} </a>
	});

	const mappedLinks = relatedLinks.map((item, index) => {
		const temp = mappedPosts(item.links);
		return <Grid item key={index} className={[!temp.length && classes.emptyMessage].join(' ')}>
			<h2> {item.title} </h2>
			{temp.length
				?temp
				:<p> There are no posts here, yet. </p>
			}
		</Grid>
	});
	
	return (
		<Grid item xs={12} className={classes.root}>
			{mappedLinks}
		</Grid>
	);
}

export default RelatedList;