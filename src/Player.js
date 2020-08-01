import React from 'react';

function Player(props) {
	if(props.player) {
		return <h2>Current Player: Red</h2>;
	} else {
		return <h2>Current Player: Blue</h2>;
	}
}

export default Player;