import ProductDetail from './productdetail';

export default interface Product {
	_id: string;
	title: string;
	link: string;
	github: string;
	pid: string;
	category: string;
	details: ProductDetail;
	techs: string[];
	images: string[];
	rating: number;
	reviews: number;
}