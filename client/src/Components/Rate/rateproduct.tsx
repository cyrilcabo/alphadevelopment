import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Custom components
import Rating from '../Products/rating';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		'& > div.MuiGrid-item': {
			marginBottom: '5px',
		}
	},
	title: {
		margin: '10px 0px 7px 0px',
		fontSize: '1.1rem',
		fontFamily: 'Helvetica, Arial, sans-serif',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		},
	},
	buttonGroup: {
		marginTop: 10,
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		},
		'& > div.MuiGrid-item': {
			marginRight: 15,
			[theme.breakpoints.down('sm')]: {
				margin: '0px 10px',
			},
			[theme.breakpoints.down('xs')]: {
				maxWidth: '90%',
				flexBasis: '90%',
				marginBottom: 10,
			}
		}
	},
	btn: {
		fontSize: '1rem',
		fontWeight: 550,
		width: 100,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		}
	},
	main: {
		backgroundColor: '#3f8b4c',
		color: 'white',
		'&:hover': {
			color: '#3f8b4c'
		}
	},
	second: {
		backgroundColor: 'maroon',
		color: 'white',
		'&:hover': {
			color: 'maroon'
		}
	}
}));

const RateProduct = (): JSX.Element => {
	const classes = useStyle();
	const [rateValue, setRateValue] = React.useState(1);
	const [thoughts, setThoughts] = React.useState("");
	const [name, setName] = React.useState("");

	const handleThoughts = (e: any):void => setThoughts(e.target.value);
	const handleName = (e: any):void => setName(e.target.value);

	const handleRate = (value: number):void => setRateValue(value);

	return (
		<Grid item className={classes.root} container xs={12} direction="column">
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> Rate the product </h3>
				</Grid>
				<Grid item>
					<Rating isBig value={rateValue} interactive handleRate={handleRate} />
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> Thoughts about the product? </h3>
				</Grid>
				<Grid item>
					<TextField
						multiline
						fullWidth
						variant="outlined"
						placeholder="Wow it's an awesome site!"
						value={thoughts}
						onChange={handleThoughts}
					/>
				</Grid>
			</Grid>
			<Grid item container direction="column">
				<Grid item>
					<h3 className={classes.title}> Your name </h3>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Lee Ji Eun (Optional)"
						value={name}
						onChange={handleName}
					/>
				</Grid>
			</Grid>
			<Grid item container className={classes.buttonGroup}>
				<Grid item>
					<Button
						className={[classes.btn, classes.main].join(' ')}
					> Submit </Button>
				</Grid>
				<Grid item>
					<Button
						className={[classes.btn, classes.second].join(' ')}
					> Cancel </Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default RateProduct;