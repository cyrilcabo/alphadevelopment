import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 250,
		display: 'flex',
		flexDirection: 'column',
	},
	imgContainer: {
		height: 150
	}
}));

interface Props {
	img?: string,
	title: string,
	rating?: number,
	totalRating?: number,
}

const BlogCard = ({img, title, rating, totalRating}:Props):JSX.Element => {
	const classes = useStyle();

	return (
		<Paper elevation={2} className={classes.root}>
			<Grid item className={classes.imgContainer}>
				{img
					?<img src={img} />
					:<Grid item>
						<img src={'/public/icons/logo_64.png'} />
						<h3> Alpha<span>Development</span> </h3>
					</Grid>
				}
			</Grid>
			<Grid item className={classes.body}>

			</Grid>
		</Paper>
	);
}