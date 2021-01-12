import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		margin: '5px 0px',
		display: 'flex',
		'& > span': {
			fontSize: '1.2rem',
			color: '#1ecdfc',
			marginRight: 5,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.15rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.1rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem',
				marginRight: 3,
			}
		}
	},
}));

const Categories = () => {
	const classes = useStyle();

	const tags = ["omg", "beginners", "tutorial"].map((item, index) => {
		return <span key={index}> #{item} </span>;
	});

	return (
		<div className={classes.root}>
			{tags}
		</div>
	);
}

export default Categories;