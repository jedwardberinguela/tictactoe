import _ from "underscore";

export const checkRowColumnDiagonal = (selector, mode, grid) => {
    let iterations = grid.length;

    if (selector === 2 || selector === 3) {
        // diagonals only need one iteration
        iterations = mode === 3 ? 1 : 2;
    }

    for (let j = 0; j < iterations; j++) {
        const consecutiveToCheck = [];
        const correspondingCoords = [];

        var rowOrColumn = grid[j];
        for (let i = 0; i < rowOrColumn.length; i++) {
            let currentCoords;
            switch (selector) {
                case 0:
                    currentCoords = [i, j];
                    break;
                case 1:
                    currentCoords = [j, i];
                    break;
                case 2:
                    currentCoords = [i, i];
                    break;
                case 3:
                    currentCoords = [grid.length - 1 - i, i];
                    break;
                default:
                    throw 'Invalid check row or column or diagonal selector';
            }

            const currentCell = grid[currentCoords[1]][currentCoords[0]];
            consecutiveToCheck.push(currentCell);
            correspondingCoords.push(currentCoords);
        }

        const winner = checkVector(consecutiveToCheck);
        if (winner !== null) {
            return makeCheckResult(winner, correspondingCoords);
        }
    }

    return null;
}

export const makeCheckResult = (winner, winCoordinates) => {
    return {
        winner: winner,
        winCoordinates: winCoordinates
    }
}

export const checkVector = (vector) => {
    const noNull = vector.every(cell => {
        return cell !== null;
    });

    if (!noNull) {
        return null;
    }
    // no duplicates
    const unique = _.uniq(vector);
    const noDuplicates = unique.length === 1;

    if (!noDuplicates) {
        return null;
    }

    return unique[0];
}