function createMatrix(line1, line2) {
    const slope1 = findSlope(line1.startPoint, line1.endPoint);
    const slope2 = findSlope(line2.startPoint, line2.endPoint2);
    const initMatrix = [-1* slope1, 1, (-1 * slope1 * startPoint.y) + startPoint.x, -1* slope2, 1, (-1 * slope2 * startPoint2.y) + startPoint2.x];
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

function checkIfIntersect(matrix, startPoint) {
    const point = {x: matrix[2], y: matrix[5]}
    if(point.x != startPoint.x && point.y == startPoint.y) {
        return false
    }
    return true
}

function findSlope(point1, point2) {
    const slope = (point1.x - point2.x) / (point1.y - point2.y)
    return slope
}

function checkIfValidLine(newLine, oldLine) {
    const currMatrix = createMatrix(newLine.startPoint, newLine.endPoint, oldLine.startPoint, oldLine.endPoint)
    rowReduce(currMatrix);
    console.log(currMatrix);
    return true;
}

export default checkIfValidLine;