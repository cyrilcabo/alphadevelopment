import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
		fontFamily: 'Helvetica, Arial, sans-serif'
	}
}));

const RateProduct = (): JSX.Element => {
	const classes = useStyle();
	const [rateValue, setRateValue] = React.useState(1);

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
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default RateProduct;