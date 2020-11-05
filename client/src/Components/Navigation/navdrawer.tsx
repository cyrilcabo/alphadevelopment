//Material components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

//Utils
import React from 'react';
import {Link} from 'react-router-dom';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	'@keyframes displayTransition': {
		'0%': {
			opacity: 0,
			display: 'none',
		},
		'100%': {
			opacity: 1,
			display: 'flex',
		}
	},
	root: {
		position: 'fixed',
		top: 0,
		marginTop: 55,
		zIndex: 2,
		height: 0,
		backgroundColor: '#212121',
		transition: 'height 0.3s',
		boxShadow: '0 2px 2px black',
	},
	active: {
		height: 200,
		'& div.MuiGrid-item': {
			animation: '$displayTransition 0.4s',
			display: 'flex',
			opacity: 1,
		}
	},
	linkContainer: {
		padding: '15px 0px',
		display: 'none',
		opacity: 0,
	},
	link: {
		transition: 'background-color 0.1s',
		'&:hover': {
			backgroundColor: '#3a3939',
		},
		'& a': {
			textDecoration: 'none',
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
		}
	},
	navLinks: {
		color: 'white',
		margin: '12px 0px',
		fontSize: '1.2rem',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		}
	}
}));

interface NavLink {
	name: string;
	link: string;
}

interface Props {
	navs: NavLink[];
	handleActive: Function;
	active: boolean;
}

const NavDrawer = ({navs, handleActive, active}: Props):JSX.Element => {
	const classes:any = useStyle();
	const navLinks:JSX.Element[] = navs.map((item, key) => {
		return <Grid item key={key} className={classes.link} onClick={() => setTimeout(handleActive.bind(NavDrawer), 150)}>
			<Link to={item.link}>
				<Grid item container xs={10}>
					<p className={classes.navLinks}> {item.name} </p>
				</Grid>
			</Link>
		</Grid>;
	})
	return (
		<Hidden mdUp>
			<Grid item xs={12} container justify="center" className={[classes.root, active ?classes.active :""].join(' ')}>
				<Grid item container direction="column" className={[classes.linkContainer].join(' ')}>
					{navLinks}
				</Grid>
			</Grid>
		</Hidden>
	);
}

export default NavDrawer;