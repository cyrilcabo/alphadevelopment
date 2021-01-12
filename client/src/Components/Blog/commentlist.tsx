import React from 'react';

import Grid from '@material-ui/core/Grid';

import Comment from './comment';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		margin: '10px 0px',
		display: 'flex',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 5,
		},
	},
	emptyMessage: {
		padding: '10px',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		'& > h3': {
			fontSize: '1.2rem',
			color: 'maroon',
			margin: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.15rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.1rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.05rem'
			}
		}
	}
}));

const CommentList = () => {
	const classes = useStyle();

	const comments = [].map(item => {
		return <Grid item key={item}>
			<Comment />
		</Grid>
	})

	return (
		<Grid item xs={12} className={[classes.root, !comments.length && classes.emptyMessage].join(' ')}>
			{comments.length
				?comments
				:<h3> There are no comments yet. </h3>
			}
		</Grid>
	);
}

export default CommentList;