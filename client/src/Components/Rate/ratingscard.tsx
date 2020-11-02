import React from 'react';

//Material UI components
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

//Custom components
import Rating from '../Products/rating';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	avatarContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	avatar: {
		width: 50,
		height: 50,
		margin: 10,
		[theme.breakpoints.down('md')]: {
			width: 40,
			height: 40,
		},
		[theme.breakpoints.down('sm')]: {
			width: 30,
			height: 30,
			margin: "5px 10px",
		},
	},
	contentContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 2,
		}

	},
	review: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '1.2rem',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.99rem',
		}
	},
	name: {
		fontFamily: 'Helvetica, Arial, sans-serif',
		fontSize: '0.8rem',
		color: '#313131',
		margin: 0,
		fontWeight: 550,
	},
	divider: {
		height: '1px',
		width: '100%',
		backgroundColor: '#717171',
		boxShadow: '0px 1px 2px black',
		margin: '7px 0px 5px 0px'
	}
}));

interface Props {
	name: string;
	msg: string;
	rating: number;
}

const RatingsCard = (props: Props) => {
	const classes = useStyle();
	return (
		<Grid item xs={12} container>
			<Grid item xs={12} container>
				<Grid item className={classes.avatarContainer}>
					<Avatar className={classes.avatar}> {props.name[0]} </Avatar>
				</Grid>
				<Grid item className={classes.contentContainer}>
					<Grid item>
						<Rating value={props.rating} />
					</Grid>
					<Grid item>
						<p className={classes.review}> {props.msg} </p>
					</Grid>
					<Grid item>
						<p className={classes.name}> {props.name || "Anonymous"} </p>
					</Grid>
				</Grid>
			</Grid>
			<Grid item className={classes.divider} />
		</Grid>
	);
}

export default RatingsCard;