import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > div.MuiAvatar-root': {
			width: 35,
			height: 35,
			backgroundColor: '#191919',
			marginRight: 5,
		},
		'& > div.MuiGrid-item': {
			flex: 1,
			border: '1px solid #e4e4e4',
			borderRadius: 2,
			minHeight: 80,
			display: 'flex',
			padding: '10px',
			flexDirection: 'column',
			'& > p': {
				'&:nth-child(1)': {
					fontSize: '1.2rem',
					margin: '5px 0px',
					flex: 1,
					[theme.breakpoints.down('md')]: {
						fontSize: '1.15rem'
					},
					[theme.breakpoints.down('sm')]: {
						fontSize: '1.1rem'
					},
					[theme.breakpoints.down('xs')]: {
						fontSize: '1rem'
					}
				},
				'&:nth-child(2)': {
					fontSize: '1rem',
					margin: '5px 0px 5px 0px',
					color: '#656565',
					[theme.breakpoints.down('sm')]: {
						fontSize: '0.95rem'
					},
					[theme.breakpoints.down('xs')]: {
						fontSize: '0.9rem'
					}
				}
			}
		}
	}
}));

const Comment = ():JSX.Element => {
	const classes = useStyle();

	return (
		<Grid item className={classes.root}>
			<Avatar> C </Avatar>
			<Grid item>
				<p> How about some nice, yet somehow a long comment right here, and it will make absolutely no sense... </p>
				<p> <span> Author name </span> <span> Date posted, 2020 </span> </p>
			</Grid>
		</Grid>
	);
}

export default Comment;