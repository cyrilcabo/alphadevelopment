import React from 'react';

const SVGDefs = ():JSX.Element => {
	return (
		<svg height={"0px"} width={"0px"} style={{position: 'absolute'}} viewBox="0 0 0 0">
			<defs>
			    <linearGradient id="half-25" x1="0%" y1="100%" x2="0%" y2="0%">
			      <stop offset="0%" style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'25%'} style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'25%'} style={{stopColor: "gray", "stopOpacity": 1}} />
			    </linearGradient>
			    <linearGradient id="half-50" x1="0%" y1="100%" x2="0%" y2="0%">
			      <stop offset="0%" style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'50%'} style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'50%'} style={{stopColor: "gray", "stopOpacity": 1}} />
			    </linearGradient>
			    <linearGradient id="half-75" x1="0%" y1="100%" x2="0%" y2="0%">
			      <stop offset="0%" style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'75%'} style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'75%'} style={{stopColor: "gray", "stopOpacity": 1}} />
			    </linearGradient>
			    <linearGradient id="half-100" x1="0%" y1="100%" x2="0%" y2="0%">
			      <stop offset="0%" style={{stopColor: "gold", "stopOpacity": 1}} />
			      <stop offset={'100%'} style={{stopColor: "gold", "stopOpacity": 1}} />
			    </linearGradient>
			</defs>
		</svg>
	);
}

export default SVGDefs;