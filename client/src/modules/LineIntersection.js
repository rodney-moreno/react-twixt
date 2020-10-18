function checkIfNoLineCrosses(lineOne, lineTwo) {

    const A1 = lineOne.p2.gy - lineOne.p1.gy;
    const B1 = lineOne.p1.gx - lineOne.p2.gx;
    const A2 = lineTwo.p2.gy - lineTwo.p1.gy;
    const B2 = lineTwo.p1.gx - lineTwo.p2.gx;
    const C1 = A1 * lineOne.p1.gx + B1 * lineOne.p1.gy;
    const C2 = A2 * lineTwo.p1.gx + B2 * lineTwo.p1.gy;
    const denominator = A1 * B2 - A2 * B1;

    const x = (B2 * C1 - B1 * C2) / denominator;
    const y = (A1 * C2 - A2 * C1) / denominator;

    const rx0 = (x - lineOne.p1.gx) / (lineOne.p2.gx - lineOne.p1.gx);
    const rx1 = (x - lineTwo.p1.gx) / (lineTwo.p2.gx - lineTwo.p1.gx);

    if(x !== 0 && y !== 0) {
        if((rx0 >= 0 && rx0 <= 1) && (rx1 >= 0 && rx1 <= 1)) {
            if(x !== lineOne.p2.gx && y !== lineOne.p2.gy){
                return false;
            }
        }
    }

    return true;
}