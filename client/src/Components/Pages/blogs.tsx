import React from 'react';

import Layout from '../Blog/layout';
import BlogCard from '../Blog/blogcard';
import StyledLoading from '../Misc/styledloading';

import {BLOGS} from '../../Graphql/queries';
import {SKIP_BLOGS} from '../../Graphql/localqueries';
import {useQuery, useApolloClient} from 'react-apollo';

import Grid from '@material-ui/core/Grid';

import BlogSummary from '../../Types/Blog/blogsummary';
import BlogSection from '../../Types/Blog/sections';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'space-between'
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
		'& > div.MuiGrid-item': {
			marginBottom: 30,
			width: '45%',
			[theme.breakpoints.down('md')]: {
				marginBottom: 25,
				width: '48%',
			},
			[theme.breakpoints.down('sm')]: {
				marginBottom: 15,
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%'
			}
		},
		'&::after': {
			content: "''",
			width: '45%'
		}
	},
	emptyMessage: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
		textAlign: 'center',
		'& > div': {
			display: 'flex',
			width: '100%',
			flexDirection: 'column',
			alignItems: 'center',
			'& > img': {
				height: 128,
				width: 128,
				marginBottom: 10,
				[theme.breakpoints.down('md')]: {
					height: 115,
					width: 115,
				},
				[theme.breakpoints.down('sm')]: {
					height: 96,
					width: 96,
				}
			},
			'& > h2': {
				margin: 10,
				fontSize: '1.3rem',
				color: 'maroon',
				[theme.breakpoints.down('md')]: {
					fontSize: '1.25rem'
				},
				[theme.breakpoints.down('sm')]: {
					fontSize: '1.2rem'
				},
				[theme.breakpoints.down('xs')]: {
					fontSize: '1.1rem'
				}
			}
		}
	},
	loading: {
		width: '100%',
		padding: 20,
		display: 'flex',
		justifyContent: 'center',
	},
	loadingFull: {
		height: '100%',
		alignItems: 'center',
	}
}));

const Blogs = ():JSX.Element => {
	const classes = useStyle();
	const client = useApolloClient();
	const [skip, setSkip] = React.useState(0);
	const {data: blogsData, loading: blogsLoading} = useQuery(BLOGS, {variables: {skip}});
	const {data: featuredBlogs, loading: featuredLoading} = useQuery(BLOGS, {variables: {featured: true, limit: 4}});
	const {data: hotBlogs, loading: hotLoading} = useQuery(BLOGS, {variables: {hot: true, category: ["tutorial"]}});
	const [hasMore, setHasMore] = React.useState(blogsData ?blogsData.blogs.length >= 10 :false)
	const [posts, setPosts]: [BlogSummary[], Function] = React.useState([]);
	const [featuredLinks, setFeaturedLinks]: [BlogSection, Function] = React.useState({title: "Featured blogs", links: []});
	const [hotLinks, setHotLinks]: [BlogSection, Function] = React.useState({title: "Hot tutorials", links: []});

	React.useEffect(() => {
		if (blogsData?.blogs.length) {
			setPosts((p:BlogSummary[]) => ([...p, ...blogsData.blogs]));
			setHasMore(blogsData.blogs.length >= 10)
		}
		if (!blogsData?.blogs.length) setHasMore(false);
	}, [blogsData]);

	React.useEffect(() => {
		if (featuredBlogs?.blogs?.length) {
			setFeaturedLinks((f:BlogSection) => ({
				...f,
				links: featuredBlogs.blogs.map((item:BlogSummary) => ({
					title: item.title,
					link: `/blogs/read?blogid=${item._id}`,
				}))	
			}));
		}
		if (featuredLoading) {
			setFeaturedLinks((f:BlogSection) => ({
				...f,
				links: "loading"
			}));
		}
	}, [featuredBlogs, featuredLoading]);

	React.useEffect(() => {
		if (hotBlogs?.blogs?.length) {
			setHotLinks((f:BlogSection) => ({
				...f,
				links: hotBlogs.blogs.map((item:BlogSummary) => ({
					title: item.title,
					link: `/blogs/read?blogid=${item._id}`
				}))
			}));
		}
		if (hotLoading) {
			setHotLinks((f:BlogSection) => ({
				...f,
				links: "loading"
			}));
		}
	}, [hotBlogs, hotLoading])


	React.useEffect(() => {
		const scroll = () => {
			if (window.scrollY >= (document.body.offsetHeight - window.innerHeight - 300) && hasMore && !blogsLoading)  {
				setSkip((s: number) => s+10);
				const skipData = client.readQuery({query: SKIP_BLOGS});
				client.writeQuery({
					query: SKIP_BLOGS,
					data: {
						skipBlogs: skipData.skipBlogs+10,
					}
				});
			}
		}
		window.addEventListener("scroll", scroll);
		if (!hasMore) window.removeEventListener("scroll", scroll);
		return () => { window.removeEventListener("scroll", scroll); };
	}, [hasMore, blogsLoading, client]);

	const mappedPosts:any = posts.map((item, index) => {
		return  <Grid item key={index}>
			<BlogCard 
				key={index}
				title={item.title} 
				categories={item.category}
				rating={item.rating}
				totalRating={item.totalRatings}
				link={item._id}
				img={item.image}
			/>
		</Grid>
	});
	return (
		<Layout relatedLinks={[featuredLinks, hotLinks]}>
			<React.Fragment>
				<Grid item xs={12} className={[classes.root, (!posts.length && !blogsLoading) && classes.emptyMessage,].join(' ')}>
					{posts.length
						?mappedPosts
						:blogsLoading
							?""
							:<div>
								<img src="/icons/logo_128.png" alt="" />
								<h2> Sorry. There are no posts here, yet. </h2>
							</div>
					}
				</Grid>
				{blogsLoading &&
					<Grid item className={[classes.loading, !posts.length && classes.loadingFull].join(' ')}>
						<StyledLoading />
					</Grid>
				}
			</React.Fragment>
		</Layout>
	);
}

export default Blogs;