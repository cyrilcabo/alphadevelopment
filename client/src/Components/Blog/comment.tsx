import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > div.MuiAvatar-root': {
			width: 35,
			height: 35,
			backgroundColor: '#191919',
			marginRight: 5,
			[theme.breakpoints.down('md')]: {
				height: 32,
				width: 32,
				fontSize: '1.2rem',
			},
			[theme.breakpoints.down('sm')]: {
				height: 30,
				width: 30,
				fontSize: '1.1rem',
			},
			[theme.breakpoints.down('xs')]: {
				paddingTop: 2,
				height: 25,
				width: 25,
				fontSize: '1rem',
			}
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

interface Props {
	name?: string,
	comment: string,
	datePosted: Date
}

const Comment = ({name, comment, datePosted}: Props):JSX.Element => {
	const classes = useStyle();

	return (
		<Grid item className={classes.root}>
			<Avatar> {name ?name[0] :"A"} </Avatar>
			<Grid item>
				<p> {comment || "_"} </p>
				<p> <span> {name || "Anonymous"} </span> <span> {datePosted ?moment(datePosted).format("MM/DD/YYYY") :"Date unspecified"} </span> </p>
			</Grid>
		</Grid>
	);
}

export default Comment;