/*
You have a 10 by 10 grid and need to get from top corner (0,0) to bottom(9,9).  Can travel 
down, up, left, right.   In the end, must pass threw column[0] 4 times, column[1] 3 times, etc.
Also, in the end must pass throw row[0] 3 times, row [1] 1 time, etc. 
*/

/*
 * Here are the row and column limits
*/
var col_limits = [4, 3, 7, 3, 3, 5, 8, 1, 8, 1];
var row_limits = [3, 1, 4, 3, 6, 3, 3, 8, 3, 9];

answers = [];

/*
 * We are using a depth first search with prune.   If we ever get to a position where we are above
 * the column or row count, we know there is no reason to continue down the path.
*/
function pruneTest(history) {
  // Check Col
  for (let i = 0; i < 10; i++) {
    limit = col_limits[i];
    cnt = 0;
    history.forEach(e => {
      if (i == e.x) {
        cnt++;
      }
    });
    if (cnt > limit) {
      return false;
    }
  }

  // Check Y
  for (let i = 0; i < 10; i++) {
    limit = row_limits[i];
    cnt = 0;
    history.forEach(e => {
      if (i == e.y) {
        cnt++;
      }
    });
    if (cnt > limit) {
      return false;
    }
  }
  return true;
}

/*
 * This is almost the same test as the prune, except that we 
 * are summing up each row and column and checking for equal
 * rather than less than. 
*/
function finalTest(history) {
    // Check Col
    for (let i = 0; i < 10; i++) {
      limit = col_limits[i];
      cnt = 0;
      history.forEach(e => {
        if (i == e.x) {
          cnt++;
        }
      });
      if (cnt != limit) {
        return false;
      }
    }
  
    // Check Y
    for (let i = 0; i < 10; i++) {
      limit = row_limits[i];
      cnt = 0;
      history.forEach(e => {
        if (i == e.y) {
          cnt++;
        }
      });
      if (cnt != limit) {
        return false;
      }
    }
    return true;
  }
  

/*
 Execute pruning depth first search
*/
function test(x, y, history) {
  toBig = !pruneTest(history);

  if (toBig) {
    return; // Brune for performance
  }

  // Can't visit a node twice
  let alreadyVisted = false;
  history.forEach(e => {
    if (e.x == x && e.y == y) {
      alreadyVisted = true;
    }
  });

  if (alreadyVisted) {
    return;
  }

  history.push({
    x: x,
    y: y
  });

  // If we are in fish block, check with rows/columns match.
  if (x == 9 && y == 9) {
    if (finalTest(history)) {
      answers.push(history);
      console.log("Found: ", history);
    }
    return;
  }

  // Try each direction
  if (x < 9) {
    test(x + 1, y, [...history]); // clone history
  }
  if (y < 9) {
    test(x, y + 1, [...history]); // clone history
  }

  if (x > 0) {
    test(x - 1, y, [...history]); // clone history
  }
  if (y > 0) {
    test(x, y - 1, [...history]); // clone history
  }
}

// Starting point
test(0, 0, []);

console.log("Total answers: ", answers.length);
