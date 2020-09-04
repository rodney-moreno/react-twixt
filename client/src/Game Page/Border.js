import React from 'react';
import Connection from './Connection';

function Border(props) {
	return(
		<g>
			<Connection x1 = "52.5" y1 = "35" x2 = "785.5" y2 = "35"
	        	stroke = "red"/>
	        <Connection x1 = "52.5" y1 = "805" x2 = "785.5" y2 = "805"
	        	stroke = "red"/>
	        <Connection x1 = "35" y1 = "52.5" x2 = "35" y2 = "787.5"
	        	stroke = "blue"/>
	        <Connection x1 = "805" y1 = "52.5" x2 = "805" y2 = "787.5"
	        	stroke = "blue"/>
        </g>
	)
}

export default Border;