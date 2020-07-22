import React, { useState } from 'react';
import Box from './Box';
import Connection from './Connection';
import Player from './Player';

function Board(props) {
    const initialPegs = initilizePegs();
    const [lineState, setLineState] = useState([]);
    const [currPlayer, setCurrPlayer] = useState(true);
    const [pegs, setPegState] = useState(initialPegs);

    function initilizePegs() {
        const initPegState = [];
        for(let row = 0; row < 24; row++) {
            for(let col = 0; col < 24; col++) {
                const index = row * 24 + col;
                initPegState[index] = {id: index, cx: 17.5 + col * 35,
                    cy: 17.5 + row * 35, gx: col, gy: row, clickedBy: 0};
            }
        }
        return initPegState;
    }

    /*
        Compares a line that might be drawn to all the lines that have
        currently been drawn
    */
    function checkIfNoLineCrosses(newLine) {
        
        for(const oldLine of lineState) {

            const A1 = newLine.p2.gy - newLine.p1.gy;
            const B1 = newLine.p1.gx - newLine.p2.gx;
            const A2 = oldLine.p2.gy - oldLine.p1.gy;
            const B2 = oldLine.p1.gx - oldLine.p2.gx;
            const C1 = A1 * newLine.p1.gx + B1 * newLine.p1.gy;
            const C2 = A2 * oldLine.p1.gx + B2 * oldLine.p1.gy;
            const denominator = A1 * B2 - A2 * B1;

            const x = (B2 * C1 - B1 * C2) / denominator;
            const y = (A1 * C2 - A2 * C1) / denominator;

            const rx0 = (x - newLine.p1.gx) / (newLine.p2.gx - newLine.p1.gx);
            const rx1 = (x - oldLine.p1.gx) / (oldLine.p2.gx - oldLine.p1.gx);


            console.log(x,y);

            if(x !== 0 && y !== 0) {
                if((rx0 >= 0 && rx0 <= 1) && (rx1 >= 0 && rx1 <= 1)) {
                    console.log(x, y);
                    if(x !== newLine.p2.gx && y !== newLine.p2.gy){
                        return false;
                    }
                }
            }
        }    

        return true;
    }

    function checkPotentialLines(currPos) {
        
        const slicedLineState = lineState.slice();
        const positions = [22, 26, 47, 49];

        // check the points above the clicked point
        for(let i = 0; i < positions.length; i++) {
            if(currPos >= positions[i]) {
                if(pegs[currPos].clickedBy ===
                    pegs[currPos - positions[i]].clickedBy) {
                    const potentialLine = {
                        p1: pegs[currPos],
                        p2: pegs[currPos - positions[i]]
                    };
                    if(checkIfNoLineCrosses(potentialLine)) {
                        slicedLineState.push(potentialLine);
                    }
                }
            }
        }

        // check the points below the clicked points
        for(let i = 0; i < positions.length; i++) {
            if(currPos <= 576 - positions[i]) {
                if(pegs[currPos].clickedBy ===
                    pegs[currPos + positions[i]].clickedBy) {
                    const potentialLine = {
                        p1: pegs[currPos],
                        p2: pegs[currPos + positions[i]]
                    };
                    if(checkIfNoLineCrosses(potentialLine)) {
                        slicedLineState.push(potentialLine);
                    }
                }
            }
        }
        setLineState(slicedLineState);
    }

    function handleClick(i) {
        const slicedPegState = pegs.slice();
        if(slicedPegState[i].clickedBy === 0) {
            currPlayer ? slicedPegState[i].clickedBy = 1 :
                slicedPegState[i].clickedBy = 2;
            checkPotentialLines(i);
            setCurrPlayer(!currPlayer);
        }
        setPegState(slicedPegState);
    }

    const allPegs = pegs.map((peg) => {
        let currColor = "black";
        if(peg.clickedBy === 1) {
            currColor = "red";
        } else if(peg.clickedBy === 2) {
            currColor = "blue";
        }
        return(
            <Box key = {peg.id} cx = {peg.cx} cy = {peg.cy} color = {currColor}
                onClick = {() => handleClick(peg.id)}/>
        )
    })

    const connections = lineState.map((line, index) => {
        return(
            <Connection key = {index} x1 = {line.p1.cx} y1 = {line.p1.cy}
                x2 = {line.p2.cx} y2 = {line.p2.cy}/>
        )
    })


    return (
        <div>
            <Player player = {currPlayer}/>        
            <svg height = "1000" width = "1000">
                { connections }
                { allPegs }
            </svg>
        </div>
    )
}

export default Board;