
// The map below shows a varient of routes form your hosue (a) to the shopping center B
// you can trave nor, east, or northeast.   How many possible routes are there from your home to
// shoping center

// Grid: 5 wide, 4 hight
//  1  2  3  4  5
//  6  7  8  9 10  
// 11 12 13 14 15
// 16 17 18 19 20 

// Start at "A" (16)
// End at B (5)

// Can move east (+1) if not mod 5 == 0
// move north (-5) if > 5
// Can move north east -4 if not mod 5 and not < 5

// Do depth first search

answers = [];


function test (pos, path) {

    path.push(pos);

    if (pos == 5) {
        answers.push(path);
        return;
    }

    mod_5 = pos %5;

    // Test East
    if (mod_5 != 0) {
        test(pos+1, [...path]); // Clone path
    }

    // Test North
    if (pos > 5) {
        test(pos-5 , [...path]); // Clone path

        // Test North east
        if (mod_5) {
            test(pos-4 , [...path]); // Clone path
        }
    }
    // Try east
}

test(16,[]);

answers.forEach(e=> {
    console.log(e);
});

console.log("Paths: ", answers.length)