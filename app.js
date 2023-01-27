// Length unit
const lunitInput = document.querySelector('#lunit');
const lunitNodes = document.querySelectorAll('.lunit');
let lunit;

// Angle unit (r for rotation), rawrunit is purely for 'deg' to '°' text conversion
const runitInput = document.querySelector('#runit');
const runitNodes = document.querySelectorAll('.runit');
let rawrunit = 'rad';
let runit;

// Reset the angle unit select to make the darn thing work after soft refresh
runitInput.value = 'rad'

// Inputs for door and item dimensions
const door = document.querySelectorAll('.door');
const item = document.querySelectorAll('.item');

// dia is for diagonal, dim is for dimensions
const doordiaelem = document.querySelectorAll('.doordia');
const doorangleelem = document.querySelectorAll('.doorangle');
let doordims = 0;
let doordia = 0;
let doorangle = 0;

// Will sort the values in the input boxes soon
const doorarr = [];
const itemarr = [];

for (i of door) {
    // Listen to any updates on the inputs
    i.addEventListener('input', () => {
        if (door[0].value && door[1].value && !(door[0].value == 0 && door[1].value == 0)) {
            doorarr[0] = parseInt(door[0].value);
            doorarr[1] = parseInt(door[1].value);
            doorarr.sort();

            doordims = door[0].value * door[1].value;
            doordia = Math.sqrt(door[0].value ** 2 + door[1].value ** 2);
            doorangle = Math.atan(doorarr[0] / doorarr[1]);

            if (rawrunit === 'deg') {
                doorangle = doorangle * (180 / Math.PI);
            }

            for (i of doordiaelem) {
                i.textContent = doordia;
            } for (i of doorangleelem) {
                i.textContent = doorangle;
            }
        } else {
            for (i of doordiaelem) { i.textContent = '--'; }
            for (i of doorangleelem) { i.textContent = '--' }
        }
    })
}

lunitInput.addEventListener('input', () => {
    lunit = lunitInput.value;
    for (i of lunitNodes) {
        i.textContent = '\u00A0' + lunit;
    }
}); runitInput.addEventListener('input', () => {
    rawrunit = runitInput.value;

    if (rawrunit === 'deg') {
        // Can't change rawrunit or it gets increasingly smaller so I use cookedrunit
        // (I don't want to add "|| rawrunit === '°'"" here it's ugly)
        runit = '°';
        doorangle = doorangle * (180 / Math.PI);
    } else {
        runit = '\u00A0rad'
        doorangle = doorangle / (180 / Math.PI);
    } for (i of runitNodes) {
        i.textContent = runit;
    } for (i of doorangleelem) {
        i.textContent = doorangle;
    }
})

console.log("Hello world!");