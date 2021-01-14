import React from 'react';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		padding: 5,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		'& > div.MuiCircularProgress-root': {
			height: '1.8rem !important',
			width: '1.8rem !important',
			color: '#ffa114',
			[theme.breakpoints.down('md')]: {
				height: '1.6rem !important',
				width: '1.6rem !important'
			},
			[theme.breakpoints.down('sm')]: {
				height: '1.4rem !important',
				width: '1.4rem !important'
			},
		},
		'& p': {
			fontSize: '1.2rem',
			margin: 0,
			marginTop: 10,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.15rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.1rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem'
			}
		}
	}
}));

interface Props {
	className?: string,
	helperText?: string,
}

const StyledLoading = ({className, helperText}: Props):JSX.Element => {
	const classes = useStyle();
	return (
		<Grid item className={[classes.root, className].join(' ')}>
			<CircularProgress />
			{helperText != "_" &&
				<p> {helperText || "Loading"} </p>
			}
		</Grid>
	);
}

export default StyledLoading;