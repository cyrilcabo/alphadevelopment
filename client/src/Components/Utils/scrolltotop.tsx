import {Component} from 'react';

import {withRouter, RouteComponentProps} from 'react-router-dom';

interface Props {
	children: JSX.Element;
	location: string;
}

class ScrollToTop extends Component <Props & RouteComponentProps> {
	
	componentDidUpdate(prevProps: any) {
		if (prevProps.location !== this.props.location) window.scrollTo(0, 0);
	}

	render () {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);