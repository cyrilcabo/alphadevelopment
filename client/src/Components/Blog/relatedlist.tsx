import React from 'react';

import Grid from '@material-ui/core/Grid';

import Link from '../../Types/Blog/Link';
import Sections from '../../Types/Blog/Sections';

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
	
	return (
		<Grid item xs={12} className={classes.root}>
			{relatedLinks.map((item, index) => {
				return <Grid item key={index}>
					<h2> {item.title} </h2>
					{mappedPosts(item.links)}
				</Grid>
			})}
		</Grid>
	);
}

export default RelatedList;