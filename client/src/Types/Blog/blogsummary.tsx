export default interface BlogSummary {
	_id: string,
	title: string,
	category: string[],
	featured: boolean,
	datePosted: Date,
	rating: number,
	totalRatings: number
}

