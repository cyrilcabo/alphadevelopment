import React from 'react';

import Layout from '../Blog/layout';

const Blogs = ():JSX.Element => {
	const relatedLinks = [
		{
			title: "Featured blogs",
			links: [
				{
					title: "Start a Hello World app now",
					link: "#"
				},
				{
					title: "How about a Hi World app?",
					link: "#"
				}
			],
		}
	];
	return (
		<Layout relatedLinks={relatedLinks}>
			<h1> Hello blogs </h1>
		</Layout>
	);
}

export default Blogs;