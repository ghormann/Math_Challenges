/*
Six houses are in a circle.   The circle is 27 miles long
Assign the distances between houses so that the the 30 distances between 
the houses (A->B, A->C, etc.) use at least 1-26 at least once. (OK to use some numbers twice)

Note: A->C is different than C->A.  Distances always go clockwise around the circle
*/

var houses = [];

function init() {
  houses = [];
  for (var i = 0; i < 6; i++) {
    h = {
      label: "House " + i,
      nextDistance: -1
    };
    houses.push(h);
  }
}

/*
 * Calculates distinces between two houses
 * Order maters as distances are clock wise
 * h1 and h2 are positions (0->5)
 */
function distance(h1, h2) {
  let cur = h1; // house pointer
  let sum = 0;
  while (cur != h2) {
    if (cur == 6) {
      cur = 0;
    } else {
      sum += houses[cur].nextDistance;
      ++cur;
    }
  }
  return sum;
}

function printPaths() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i != j) {
        console.log(
          houses[i].label,
          "->",
          houses[j].label,
          ": ",
          distance(i, j)
        );
      }
    }
  }
}

function assignHouses() {
  houses[0].nextDistance = 1;
  for (let i = 1; i < 6; i++) {
    houses[i].nextDistance = Math.floor(Math.random() * 10);
  }
}

function isGood() {
    /*
    * Make sure that the distance around the circle is 27.  Easist way to do that is 
    * some up the distances to the nextHouse
    */
   let sum = 0;
   for (i = 0; i< 6; i++) {
       sum += houses[i].nextDistance;
   }
   if (sum != 27) {
       return false;
   }
/*
 * Second, find all the unique differences and make sure that all 
 * numbers (0-26) are used at least once
*/
  distances = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i != j) {
        distances.push(distance(i, j));
      }
    }
  }

  distances.sort();
  for (let i = 1; i < 27; i++) {
    if (!distances.includes(i)) {
      //console.log("DEBUG: ", i, "not found");
      return false;
    }
  }
  return true;
}

init();
while (!isGood()) {
  init();
  assignHouses();
}
printPaths();
console.log(houses);
