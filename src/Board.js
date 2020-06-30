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
                initPegState[index] = {id: index, cx: 17.5 + col * 35, cy: 17.5 + row * 35, clickedBy: 0};
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
        const initMatrix = [-1* slope1, 1, (-1 * slope1 * line1.y1) + line1.x1, -1* slope2, 1, (-1 * slope2 * line2.y1) + line2.x1];
        return initMatrix;
    }

    function rowReduce(matrix) {
        // first operation
        const a1 = matrix[0]
        matrix[0] = 1
        matrix[1] = matrix[1] / a1
        matrix[2] = matrix[2] / a1
        
        // 0 in first col second row
        const a2 = matrix[3]
        matrix[3] = 0;
        matrix[4] = matrix[4] + (matrix[1]*-1*a2)   
        matrix[5] = matrix[5] + (matrix[2]*-1*a2)
        
        // 1 in the second column
        const b2 = matrix[4]
        matrix[4] = 1
        matrix[5] = matrix[5] / b2

        const b1 = matrix[1]
        matrix[1] = 0
        matrix[2] = matrix[2] + (-1 * b1  * matrix[5])
        return matrix
    }

    function checkIfValidLine(newLine, oldLine) {
        const currMatrix = createMatrix(newLine, oldLine);
        rowReduce(currMatrix);
        console.log(currMatrix);
        return true;
    }*/

    function checkIfPotentialLine(i) {
        const slicedLineState = lineState.slice();

        // first
        if(i >= 49) {
            if(pegs[i].clickedBy === pegs[i - 49].clickedBy) {
                slicedLineState.push({x1: pegs[i].cx, y1: pegs[i].cy, x2: pegs[i - 49].cx, y2: pegs[i - 49].cy});
            }
        }

        // second
          if(i >= 47) {
            if(pegs[i].clickedBy === pegs[i - 47].clickedBy) {
                slicedLineState.push({x1: pegs[i].cx, y1: pegs[i].cy, x2: pegs[i - 47].cx, y2: pegs[i - 47].cy});
            }
        }

        // third
          if(i >= 22) {
            if(pegs[i].clickedBy === pegs[i - 22].clickedBy) {
                slicedLineState.push({x1: pegs[i].cx, y1: pegs[i].cy, x2: pegs[i - 22].cx, y2: pegs[i - 22].cy});
            }
        }
        
        setLineState(slicedLineState);
    }

    function handleClick(i) {
        const slicedPegState = pegs.slice();
        currPlayer ? slicedPegState[i].clickedBy = 1 : slicedPegState[i].clickedBy = 2;
        setCurrPlayer(!currPlayer);
        setPegState(slicedPegState);
        checkIfPotentialLine(i);
    }

    /*function resetState() {
        if(currLineState === 2){
            const slicedLineState = lineState.slice();
            const newLine = {x1: boardState[boardState.length - 2].startPoint, y1: boardState[boardState.length - 2].endPoint,
                x2: boardState[boardState.length - 1].startPoint, y2:boardState[boardState.length - 1].endPoint};

            if(connections.length === 0) {
                slicedLineState.push(newLine);
            } else {
                for(const oldLine of connections) {
                    if(checkIfValidLine(newLine, oldLine)) {
                        slicedLineState.push(newLine);
                    }
                }
            }

            setLineState(slicedLineState);
            setCurrLineState(0);
            setBoardState([]);
        }
    }*/

    //useEffect(che;



    const allPegs = pegs.map((peg) => {
        let currColor = "black";
        if(peg.clickedBy === 1) {
            currColor = "red";
        } else if(peg.clickedBy === 2) {
            currColor = "blue";
        }
        return(
            <Box key = {peg.id} cx = {peg.cx} cy = {peg.cy} color = {currColor} onClick = {() => handleClick(peg.id)}/>
        )
    })

    const connections = lineState.map((line, index) => {
        return(
            <Connection key = {index} x1 = {line.x1} y1 = {line.y1} x2 = {line.x2} y2 = {line.y2}/>
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