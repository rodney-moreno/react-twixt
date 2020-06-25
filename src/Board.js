import React, { useState, useEffect } from 'react';
import Box from './Box';
import Connection from './Connection';

function Board(props) {
    const [boardState, setBoardState] = useState([]);
    const [lineState, setLineState] = useState([]);
    const [currLineState, setCurrLineState] = useState(0);

    function findSlope(line) {
        const slope = (line.x1 - line.x2) / (line.y1 - line.y2);
        return slope
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
    }

    function handleClick(box) {
        const slicedBoardState = boardState.slice();
        slicedBoardState.push({startPoint: box.cx, endPoint: box.cy});
        setBoardState(slicedBoardState);
        setCurrLineState(currLineState + 1);
    }

    function resetState() {
        console.log("here");
        if(currLineState === 2){
            const slicedLineState = lineState.slice();
            const newLine = {x1: boardState[boardState.length - 2].startPoint, y1: boardState[boardState.length - 2].endPoint,
                x2: boardState[boardState.length - 1].startPoint, y2:boardState[boardState.length - 1].endPoint};
            for(const oldLine of connections) {
                if(checkIfValidLine(newLine, oldLine)) {
                    slicedLineState.push(newLine);
                    break;
                }
            }

            setLineState(slicedLineState);
            setCurrLineState(0);
            setBoardState([]);
        }
    }

    useEffect(resetState);

    const arr = [];
    for(let row = 0; row < 24; row++) {
        for(let col = 0; col < 24; col++) {
            const index = row * 24 + col;
            arr[index] = {id: index, cx: 17.5 + col * 35, cy: 17.5 + row * 35};
        }
    }

    const boxes = arr.map((box) => {
        return(
            <Box key = {box.id} cx = {box.cx} cy = {box.cy} onClick = {() => handleClick(box)}/>
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
            { boxes }
        </svg>
    )
}

export default Board;