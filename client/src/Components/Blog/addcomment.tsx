import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//Utils
import {useMutation} from 'react-apollo';

import {ADDCOMMENT} from '../../Graphql/mutation';
import {BLOG_COMMENTS} from '../../Graphql/queries';

import Comment from '../../Types/Blog/comment';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	name: {

	},
	label: {
		'& span.MuiFormControlLabel-label': {
			[theme.breakpoints.down('md')]: {
				fontSize: '0.95rem'
			}
		},
		'& svg.MuiSvgIcon-root': {
			[theme.breakpoints.down('md')]: {
				fontSize: '1.3rem'
			}
		}

	},
	labelName: {
		display: 'flex', 
		alignItems: 'center'
	},
	comment: {
		marginBottom: 15,
	},
	input: {
		'&, & div.MuiTextField-root, & > form': {
			height: '100%',
		},
		'& div.MuiInputBase-root': {
			height: '100%',
			borderRadius: 0,
			[theme.breakpoints.down('sm')]: {
				padding: '15px 12px',
			},
			[theme.breakpoints.down('xs')]: {
				padding: '13px 10px'
			}
		},
	},
	submit: {
		minHeight: 30,
		'& button.MuiButtonBase-root': {
			borderRadius: 0,
			backgroundColor: '#191919'
		},
		'& div.MuiCircularProgress-root': {
			height: '30px !important',
			width: '30px !important',
			'& > svg': {
				color: 'white'
			}
		}
	}
}));

interface Props {
	blogId: string,
	addComment: Function,
}

const AddComment = ({blogId, addComment: addNewComment}:Props) => {
	const classes = useStyle();
	//States
	const [isAnonymous, setAnonymous] = React.useState(true);
	const [comment, setComment] = React.useState("");
	const [name, setName] = React.useState(window.localStorage.getItem("alpha-name") || "");
	//State handlers
	const handleName = (e: React.ChangeEvent<HTMLInputElement>):void => setName((e?.target as HTMLInputElement)?.value);
	const handleAnonymous = ():void => setAnonymous(isAnonymous ?false :true);
	const handleComment = (e: React.ChangeEvent<HTMLInputElement>):void => setComment((e?.target as HTMLInputElement)?.value);
	//Submit comment
	const [publishComment, {loading}] = useMutation(ADDCOMMENT, {
		update(cache, {data: {addComment}}) {
			const comments: any = cache.readQuery({query: BLOG_COMMENTS, variables: {skip: 0, _id: blogId}});
			cache.writeQuery({
				query: BLOG_COMMENTS,
				variables: {skip: 0, _id: blogId},
				data: {
					blogComments: [
						addComment,
						...comments.blogComments,
					],
				}
			});
			addNewComment((c:Comment[]) => ([addComment, ...c]));
		}
	});
	const submitComment = (e: React.ChangeEvent<HTMLFormElement>):void => {
		e.preventDefault();
		postComment();
	}
	const postComment = ():void => {
		const author: string = isAnonymous ?"Anonymous" :name;
		if (!comment || !author || !blogId) return;
		publishComment({variables: {
			comment,
			name: author,
			_id: blogId,
		}}).then(() => {
			if (!isAnonymous) window.localStorage.setItem("alpha-name", name);
			setComment("");
		});
	}

	return (
		<React.Fragment>
			<Grid item container className={classes.name} alignItems="flex-end">
				<Grid item>
					<FormControlLabel
						control={<Checkbox checked={isAnonymous} onClick={handleAnonymous}/>}
						label={"Anonymous"}
						className={classes.label}
						disabled={loading}
					/>
				</Grid>
				<Grid item className={classes.labelName}>
					<FormControlLabel
						control={<Checkbox checked={!isAnonymous} onClick={handleAnonymous} />}
						label={"Name"}
						className={classes.label}
						disabled={loading}
					/>
					<TextField 
						placeholder="Name"
						value={name}
						onChange={handleName}
						disabled={isAnonymous || loading}
					/>
				</Grid>	
			</Grid>
			<Grid item container className={classes.comment}>
				<Grid item xs={12} md={10} className={classes.input}>
					<form onSubmit={submitComment}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Add comment..."
							disabled={loading}
							onChange={handleComment}
							value={comment}
							multiline
						/>
						<input type="submit" style={{display: "none"}} />
					</form>
				</Grid>
				<Grid item xs={12} md={2} className={classes.submit}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						style={{height: '100%'}}
						onClick={postComment}
						disabled={loading}
					> 
						{loading
							?<CircularProgress />
							:"Post"
						} 
					</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

export default AddComment;