/*
You have a 10 by 10 grid and need to get from top corner (0,0) to bottom(9,9).  Can travel 
down, up, left, right.   In the end, can only visit some many records in a row and 
so many records in a column.
*/

var col_limits = [4, 3, 7, 3, 3, 5, 8, 1, 8, 1];
var row_limits = [3, 1, 4, 3, 6, 3, 3, 8, 3, 9];

answers = [];

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
  


function test(x, y, history) {
  toBig = !pruneTest(history);
  //console.log("Testing: ", x, y, history.length, toBig);

  if (toBig) {
    return;
  }

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

  if (x == 9 && y == 9) {
    if (finalTest(history)) {
      answers.push(history);
      console.log("Found: ", history);
    }
    return;
  }

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

test(0, 0, []);

console.log("Total answers: ", answers.length);
