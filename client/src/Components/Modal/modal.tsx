import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'fixed',
		minHeight: '100vh',
		top: 0,
		width: '100%',
		zIndex: 10,
	},
	bg: {
		backgroundColor: 'black',
		height: '100%',
		width: '100%',
		opacity: '0.7',
		zIndex: 1,
		position: 'absolute',
	},
	container: {
		zIndex: 2,
		backgroundColor: 'aliceblue',
		height: '90vh',
		width: '80%',
		overflowY: 'auto',
		overflowX: 'hidden',
		padding: '25px 0px',
		position: 'relative',
		[theme.breakpoints.down('xs')]: {
			width: '90%'
		}
	},
	darkMode: {
		backgroundColor: '#211f1f',
	},
	closeIcon: {
		position: 'absolute', 
		top: '4.2vh', 
		right: '9.5%',
		height: 25,
		width: 25,
		zIndex: 3,
		backgroundColor: '#e4483d',
		borderRadius: '100%',
		color: 'white',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: 'maroon',
			color: 'white'
		},
		[theme.breakpoints.down('sm')]: {
			height: 22,
			width: 22,
			right: '8.5%',
			fontSize: '0.65rem'
		},
		[theme.breakpoints.down('xs')]: {
			right: '3%',
		}
	},
}));

interface Props {
	handleClose: HandleClose;
	children: JSX.Element;
	dark?: boolean;
}

interface HandleClose {
	(): void;
}

const Modal = (props: Props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} className={classes.root} container justify="center" alignItems="center">
			<div className={classes.bg} onClick={props.handleClose} />
			<div className={classes.closeIcon} onClick={props.handleClose}> &#x274C; </div>
			<Grid item container className={[classes.container, props.dark ?classes.darkMode :''].join(' ')} justify={"center"}>
				{props.children}
			</Grid>
			<style>{`
				html, body {
					overflow: hidden;
					margin: 0;
				}
			`}</style>
		</Grid>
	);
}

export default Modal;