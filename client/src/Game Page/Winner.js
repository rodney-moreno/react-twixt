import React from 'react';

function Winner(props) {
	if(props.winner === 1) {
		return <h2>Winner: Red</h2>;
	} else if(props.winner === 2) {
		return <h2>Winner: Blue</h2>;
	}

	return <h2></h2>
}

export default Winner;