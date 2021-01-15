import Link from './link';

export default interface Sections {
	title: string,
	links: Link[] | "loading",
}