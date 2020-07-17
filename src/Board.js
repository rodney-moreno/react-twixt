import React, { useState } from 'react';
import Box from './Box';
import Connection from './Connection';

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
                    cy: 17.5 + row * 35, clickedBy: 0};
            }
        }
        return initPegState;
    }

    /*function findSlope(line) {
        const slope = (line.x1 - line.x2) / (line.y1 - line.y2);
        return slope;
    }
    
    function createMatrix(line1, line2) {
        const slope1 = findSlope(line1);
        const slope2 = findSlope(line2);
        const initMatrix = [-1* slope1, 1, (-1 * slope1 * line1.y1) + line1.x1,
            -1 * slope2, 1, (-1 * slope2 * line2.y1) + line2.x1];
        return initMatrix;
    }

    function rowReduce(matrix) {
        // first operation
        const a1 = matrix[0];
        matrix[0] = 1;
        matrix[1] = matrix[1] / a1;
        matrix[2] = matrix[2] / a1;
        
        // 0 in first col second row
        const a2 = matrix[3];
        matrix[3] = 0;
        matrix[4] = matrix[4] + (matrix[1] * -1 * a2);  
        matrix[5] = matrix[5] + (matrix[2] * -1 * a2);
        
        // 1 in the second column
        const b2 = matrix[4];
        matrix[4] = 1;
        matrix[5] = matrix[5] / b2;

        const b1 = matrix[1];
        matrix[1] = 0;
        matrix[2] = matrix[2] + (-1 * b1  * matrix[5]);
        return matrix;
    }*/

    function checkIfNoLineCrosses(newLine) {
        let lineCross = false;
        for(const oldLine of lineState) {
            const a1 = newLine.x1 - newLine.x2;
            const b1 = newLine.y2 - newLine.y1;
            const a2 = oldLine.x1 - oldLine.x2;
            const b2 = oldLine.y2 - oldLine.y1;
            const c1 = a1 * newLine.x1 + b1 * newLine.y1;
            const c2 = a2 * oldLine.x1 + b2 * oldLine.y1;
            const denominator = a1 * b2 - a2 * b1;
            const x = (b2 * c1 - b1 * c2) / denominator;
            const y = (a1 * c2 - a2 * c1) / denominator;
            console.log('x: ', x, ' y: ', y)
        }
        return !lineCross;
    }

    function checkIfPotentialLine(currPos) {
        
        const slicedLineState = lineState.slice();
        const positions = [22, 26, 47, 49];

        // check the points above the clicked point
        for(let i = 0; i < positions.length; i++) {
            if(currPos >= positions[i]) {
                if(pegs[currPos].clickedBy ===
                    pegs[currPos - positions[i]].clickedBy) {
                    const potentialLine = {
                        x1: pegs[currPos].cx,
                        y1: pegs[currPos].cy,
                        x2: pegs[currPos - positions[i]].cx,
                        y2: pegs[currPos - positions[i]].cy};
                    if(checkIfNoLineCrosses(potentialLine, )) {
                        slicedLineState.push(potentialLine);
                    }
                }
            }
        }

        // check the points below the clicked points
        for(let i = 0; i < positions.length; i++) {
            if(currPos <= 574 - positions[i]) {
                if(pegs[currPos].clickedBy ===
                    pegs[currPos + positions[i]].clickedBy) {
                    const potentialLine = {
                        x1: pegs[currPos].cx,
                        y1: pegs[currPos].cy,
                        x2: pegs[currPos + positions[i]].cx,
                        y2: pegs[currPos + positions[i]].cy};
                    if(checkIfNoLineCrosses(potentialLine)) {
                        slicedLineState.push(potentialLine);
                    }
                }
            }
        }
        // console.log(slicedLineState);
        setLineState(slicedLineState);
    }

    function handleClick(i) {
        const slicedPegState = pegs.slice();
        if(slicedPegState[i].clickedBy === 0) {
            currPlayer ? slicedPegState[i].clickedBy = 1 :
                slicedPegState[i].clickedBy = 2;
            checkIfPotentialLine(i);
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
            <Connection key = {index} x1 = {line.x1} y1 = {line.y1}
                x2 = {line.x2} y2 = {line.y2}/>
        )
    })

    return (
        <svg height = "800" width = "800">
            { connections }
            { allPegs }
        </svg>
    )
}

export default Board;