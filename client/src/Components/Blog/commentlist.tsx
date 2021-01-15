import React from 'react';

import Grid from '@material-ui/core/Grid';

import Comment from './comment';
import StyledLoading from '../Misc/styledloading';

import CommentType from '../../Types/Blog/comment';

import {BLOG_COMMENTS} from '../../Graphql/queries';

import {useQuery} from 'react-apollo';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		margin: '10px 0px',
		display: 'flex',
		flexDirection: 'column',
		'& > div.MuiGrid-item': {
			marginBottom: 5,
		},
	},
	emptyMessage: {
		padding: '10px',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		'& > h3': {
			fontSize: '1.2rem',
			color: 'maroon',
			margin: 0,
			[theme.breakpoints.down('md')]: {
				fontSize: '1.15rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.1rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.05rem'
			}
		}
	},
	loading: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		padding: '10px 0px',
	},
	emptyLoading: {
		height: '100%',
		alignItems: 'center',
	}
}));

interface Props {
	_id: string,
	newComments: CommentType[],
}

const CommentList = ({_id, newComments}: Props) => {
	const classes = useStyle();
	const [comments, setComments]: [CommentType[], Function] = React.useState([]);
	const [skip, setSkip] = React.useState(0);
	const {data: commentData, loading: commentLoading,} = useQuery(BLOG_COMMENTS, {variables: {_id, skip}});
	const [hasMore, setHasMore] = React.useState(commentData?.blogComments?.length >= 10);

	React.useEffect(() => {
		if (commentData?.blogComments?.length) {
			setComments((c:CommentType[]) => ([...c, ...commentData.blogComments]));
			setHasMore(commentData.blogComments.length >= 10);
		}
		if (!commentData?.blogComments?.length) setHasMore(false);
	}, [commentData]);

	React.useEffect(() => {
		setComments((c:CommentType[]) => ([...newComments, ...c]));
	}, [newComments]);

	React.useEffect(() => {
		const scroll = () => {
			if (window.scrollY >= (document.body.offsetHeight - window.innerHeight - 300) && hasMore && !commentLoading)  {
				setSkip((s: number) => s+10);
			}
		}
		window.addEventListener("scroll", scroll);
		if (!hasMore) window.removeEventListener("scroll", scroll);
		return () => { window.removeEventListener("scroll", scroll); };
	}, [hasMore, commentLoading]);

	const mappedComments = comments.map((item, index) => {
		return <Grid item key={index}>
			<Comment 
				name={item.name}
				comment={item.comment}
				datePosted={item.datePosted}
			/>
		</Grid>
	})

	return (
		<Grid item xs={12} className={[classes.root, !comments.length && classes.emptyMessage].join(' ')}>
			{!comments.length && !commentLoading
				?<h3> There are no comments yet. </h3>
				:mappedComments
			}
			{commentLoading
				?<Grid item className={[classes.loading, !comments.length && classes.emptyLoading].join(' ')}>
					<StyledLoading />
				</Grid>
				:""
			}
		</Grid>
	);
}

export default CommentList;