import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		height: '100vh',
		width: '100vw',
		top: 0,
		left: 0,
		position: 'fixed',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 999,
	},
	bg: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		backgroundColor: '#212121',
		zIndex: -1,
	},
	'@keyframes loading': {
		'25%': {
			borderColor: '#095569 #095569 #095569 #FFA114',
			transform: 'rotate(90deg)'
		},
		'50%': {
			borderColor: '#FFA114 #095569 #095569 #FFA114',
			transform: 'rotate(180deg)'
		},
		'75%': {
			borderColor: '#FFA114 #FFA114 #095569 #FFA114',
			transform: 'rotate(240deg)'
		},
		'100%': {
			borderColor: '#FFA114 #FFA114 #FFA114 #FFA114',
			transform: 'rotate(360deg)'
		}

	},
	loader: {
		position: 'absolute',
		zIndex: 0,
		borderRadius: '100%',
		border: '5px solid #095569',
		animation: '$loading 1.5s ease-in-out 0s infinite alternate',
	},
	imgSize: {
		height: 128,
		width: 128,
		[theme.breakpoints.down('sm')]: {
			height: 96,
			width: 96,
		},
		[theme.breakpoints.down('xs')]: {
			height: 64,
			width: 64,
		}
	}
}));

const LoadingScreen = ():JSX.Element => {
	const classes = useStyle();

	return (
		<div className={classes.root}>
			<div className={classes.bg} />
			<div className={[classes.loader, classes.imgSize].join(' ')} />
			<img className={classes.imgSize} alt={""} src="/icons/logo_128.png" />
			<style>{`
				body, html {
					overflow: hidden;
					margin: 0;
					padding: 0;
				}
			`}</style>

		</div>
	);	
}

export default LoadingScreen;