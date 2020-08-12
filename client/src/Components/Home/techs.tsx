//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 200,
		position: 'relative',
		backgroundColor: '#191919',
		boxShadow: '0px 0px 5px #212121',
		[theme.breakpoints.down('sm')]: {
			padding: '20px 0px',
		}
	},
	bg: {
		backgroundColor: 'white',
		opacity: '0.89',
		position: 'absolute',
		zIndex: 0,
		width: '100%',
		height: '100%',
	},
	techContainer: {
		zIndex: 1,
	},
	img: {
		height: 40,
		margin: 10,
		[theme.breakpoints.down('sm')]: {
			height: 30,
		},
		[theme.breakpoints.down('xs')]: {
			height: 20,
		}
	}
}));

const HomeTechs = ():JSX.Element => {
	const classes:any = useStyle();
	const techs:string[] = ['apollo', 'aws', 'bootstrap', 'css', 'docker', 'express', 'firebase', 'github', 'graphql', 'html', 'javascript', 'material', 'mongodb', 'next', 'nginx', 'node', 'react', 'redux', 'socket'];
	const mappedTechs:JSX.Element[] = techs.map((item, key) => {
		return <Grid item xs={4} sm={2} md={1} key={key} container justify="center">
			<img className={classes.img} src={`/images/Stacks/${item}.png`} alt={`Stack logo: ${item}`} />
		</Grid>
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="center" alignItems="center">
			<div className={classes.bg} />
			<Grid item xs={11} md={10} lg={8} container justify="space-around" className={classes.techContainer}>
				{mappedTechs}
			</Grid>
		</Grid>
	);
}

export default HomeTechs;