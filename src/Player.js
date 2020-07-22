import React from 'react';

function Player(props) {
	if(props.player) {
		return <h2>Red</h2>;
	} else {
		return <h2>Blue</h2>;
	}
}

export default Player;