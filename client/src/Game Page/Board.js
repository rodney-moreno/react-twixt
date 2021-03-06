import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Box from './Box';
import Connection from './Connection';
import Player from './Player';
import Winner from './Winner';
import Border from './Border';

const endPoint = "http://127.0.0.1:8080";
const socket = socketIOClient(endPoint);

function Board(props) {
    const initialPegs = initilizePegs();
    const initialAdjList = initAdjList();
    const [lineState, setLineState] = useState([]);
    const [currPlayer, setCurrPlayer] = useState(true);
    const [pegs, setPegState] = useState(initialPegs);
    const [adjList, setAdjListState] = useState(initialAdjList);
    const [visited, setVistedState] = useState(new Array(580).fill(false));
    const [winner, setWinner] = useState(0);
    
    console.log(adjList);

    function initAdjList() {
        const adjList = new Array(580).fill([]);
        // connect top row to top node
        for(let i = 1; i < 23; i++) {
            const temp = adjList[i].slice();
            temp.push(576);
            const temp2 = adjList[576].slice();
            temp2.push(i);
            adjList[576] = temp2;
        }

        // connect bottom row to bottom node
        for(let j = 553; j < 575; j++) {
            const temp = adjList[j].slice();
            temp.push(577);
            adjList[j] = temp;

            const temp2 = adjList[577].slice();
            temp2.push(j);
            adjList[577] = temp2;
        }

        // connect left row to left node
        for(let i = 1; i < 23; i++) {
            const index = i * 24;
            const temp = adjList[index].slice();
            temp.push(578);
            adjList[index] = temp;

            const temp2 = adjList[578].slice();
            temp2.push(index);
            adjList[578] = temp2;
        }


        // connect right row to right node
        for(let j = 1; j < 23; j++) {
            const index = j * 24 + 23;
            const temp = adjList[index].slice();
            temp.push(579);
            adjList[index] = temp;

            const temp2 = adjList[579].slice();
            temp2.push(index);
            adjList[579] = temp2;
        }

        return adjList;
    }

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

            if(x !== 0 && y !== 0) {
                if((rx0 >= 0 && rx0 <= 1) && (rx1 >= 0 && rx1 <= 1)) {
                    if(x !== newLine.p2.gx && y !== newLine.p2.gy){
                        return false;
                    }
                }
            }
        }    

        return true;
    }

    function checkPotentialLines(currPos, adjList) {
        
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
                        const temp1 = adjList[potentialLine.p1.id].slice();
                        temp1.push(potentialLine.p2.id);
                        adjList[potentialLine.p1.id] = temp1;

                        const temp2 = adjList[potentialLine.p2.id].slice();
                        temp2.push(potentialLine.p1.id);
                        adjList[potentialLine.p2.id] = temp2;
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
                        const temp1 = adjList[potentialLine.p1.id].slice();
                        temp1.push(potentialLine.p2.id);
                        adjList[potentialLine.p1.id] = temp1;

                        const temp2 = adjList[potentialLine.p2.id].slice();
                        temp2.push(potentialLine.p1.id);
                        adjList[potentialLine.p2.id] = temp2;
                    }
                }
            }
        }

        return slicedLineState;
    }

    
    function containsPath(adjList, node1) {
        visited[node1] = true;
        for(const children of adjList[node1]) {
            if(visited[children] !== true) {
                containsPath(adjList, children);
            }
        }
    }

    function checkWinner() {
        if(currPlayer) {
            containsPath(adjList, 576);
            if(visited[577]) {
                return 1;
            }
        } else {
            containsPath(adjList, 578);
            if(visited[579]) {
                return 2;
            }
        }
    }

    function handleClick(i, adjList) {
        const slicedPegState = pegs.slice();
        if(slicedPegState[i].clickedBy === 0) {
            currPlayer ? slicedPegState[i].clickedBy = 1 :
                slicedPegState[i].clickedBy = 2;
        }
        const slicedLineState = checkPotentialLines(i, adjList);
        const win = checkWinner();
        send(slicedPegState, slicedLineState, adjList, win);
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
                onClick = {() => handleClick(peg.id, adjList)}/>
        )
    })

    const connections = lineState.map((line, index) => {
        return(
            <Connection key = {index} x1 = {line.p1.cx} y1 = {line.p1.cy}
                x2 = {line.p2.cx} y2 = {line.p2.cy} stroke = "black"/>
        )
    })

    function send(toBePegState, toBeLineState, toBeAdjListState, toBeWinnerState) {
        //const socket = socketIOClient(endPoint);
        const data = new Array();
        data[0] = toBePegState;
        data[1] = currPlayer;
        data[2] = toBeLineState;
        data[3] = toBeAdjListState;
        data[4] = toBeWinnerState;
        socket.emit('peg dropped', data);
        //return () => socket.disconnect();
    }

    useEffect(() => {
        //const socket = socketIOClient(endPoint);
        socket.on('peg dropped', (data) => {
            setPegState(data[0]);
            setCurrPlayer(!data[1]);
            setLineState(data[2]);
            setAdjListState(data[3]);
            setVistedState(new Array(580).fill(false));
            setWinner(data[4]);
            console.log("Here")
        });



        //return () => socket.disconnect();
    }, []);

    return (
        <div>
            <Player player = {currPlayer}/>
            <Winner winner = {winner}/>     
            <svg height = "1000" width = "1000">
                <Border />
                { connections }
                { allPegs }
            </svg>
        </div>
    )
}

export default Board;