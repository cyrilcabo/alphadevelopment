//Material components
import Grid from '@material-ui/core/Grid';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 445,
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			minHeight: 335,
			paddingBottom: 50,
		},
	},
	title: {
		fontSize: '3rem',
		margin: '80px 0px 20px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
			marginTop: 60,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.5rem',
			marginTop: 50,
		}
	},
	details: {
		margin: 0,
		fontSize: '1.1rem',
		letterSpacing: '2px',
		lineHeight: '40px',
		fontFamily: 'serif',
		[theme.breakpoints.down('sm')]: {
			letterSpacing: '1px',
			fontSize: '1rem',
			lineHeight: '30px',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.85rem',
			lineHeight: '25px',
		}
	}
}));

const AboutDetails = ():JSX.Element => {
	const classes:any = useStyle();
	return (
		<Grid item className={classes.root} container xs={12} justify="center">
			<Grid item xs={11} sm={10} lg={8} container direction="column" alignItems="center" className={classes.container}>
				<Grid item>
					<h2 className={classes.title}> Who <span style={{color: '#00CBFF'}}>we</span> are? </h2>
				</Grid>
				<Grid item>
					<p className={classes.details}>
						Alpha Development is a Tacloban-based web development company, and has started its journey since May 2020. Currently, it is a one-man company, but it has its eyes set on being the first established web development company in the region. Alpha Development's promise to its clients is to provide quality yet pocket-friendly products. Alpha Development products are fueled by customer's creative powers, as <i> whatever you can imagine, Alpha Development will provide. </i>
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AboutDetails;