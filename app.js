// Length unit
const lunitInput = document.querySelector('#lunit');
const lunitNodes = document.querySelectorAll('.lunit');
let lunit;

// Angle unit (r for rotation), rawrunit is purely for 'deg' to '°' text conversion
const runitInput = document.querySelector('#runit');
const runitNodes = document.querySelectorAll('.runit');
let rawrunit = 'rad';
let runit;

// Inputs for door and item dimensions
const door = document.querySelectorAll('.door');
const item = document.querySelectorAll('.item');

// Reset inputs to make the darn thing work after softrefresh and to make it consistent
lunitInput.value = 'cm';
runitInput.value = 'rad';
for (i of door) { i.value = '' }
for (i of item) { i.value = '' }

// dia is for diagonal, dim is for dimensions
const doordiaelem = document.querySelectorAll('.doordia');
const doorangleelem = document.querySelectorAll('.doorangle');
let doordims = 0;
let doordia = 0;
let doorangle = 0;

const itemfaceelem = document.querySelectorAll('.itemface');
const itemfacediaelem = document.querySelectorAll('.itemfacedia');
const itemvolelem = document.querySelectorAll('.itemvol');
const itemvoldiaelem = document.querySelectorAll('.itemvoldia');
/* const itemface1elem = document.querySelectorAll('.itemface.1');
const itemface2elem = document.querySelectorAll('.itemface.2');
const itemface3elem = document.querySelectorAll('.itemface.3');
const itemvolelem = document.querySelectorAll('.itemvol'); */
let itemface = [];
let itemvol = 0;
let itemvoldia = 0;

// Will sort the values in the input boxes soon
const doorarr = [];
const itemarr = [];
const itemfacearr = [];
const itemfacediarr = [];

for (i of door) {
    i.addEventListener('input', () => {
        // Listen to any updates on the inputs, don't allow empty values
        if (!(door[0].value === '' || door[1].value === '') && !(door[0].value === '0' && door[1].value === '0')) {
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
                i.textContent = parseFloat(doordia.toPrecision(4));
            } for (i of doorangleelem) {
                i.textContent = parseFloat(doorangle.toPrecision(3));
            }
        } else {
            for (i of doordiaelem) { i.textContent = '--'; }
            for (i of doorangleelem) { i.textContent = '--' }
        }
    })
} for (i of item) {
    i.addEventListener('input', () => {
        if (!(item[0].value === '' || item[1].value === '' || item[2].value === '')) {
            itemarr[0] = parseInt(item[0].value);
            itemarr[1] = parseInt(item[1].value);
            itemarr[2] = parseInt(item[2].value);
            itemarr.sort()

            itemfacearr[0] = itemarr[0] * itemarr[1];
            itemfacearr[1] = itemarr[0] * itemarr[2];
            itemfacearr[2] = itemarr[1] * itemarr[2];

            itemfacediarr[0] = Math.sqrt(itemarr[0] ** 2 + itemarr[1] ** 2);
            itemfacediarr[1] = Math.sqrt(itemarr[0] ** 2 + itemarr[2] ** 2);
            itemfacediarr[2] = Math.sqrt(itemarr[1] ** 2 + itemarr[2] ** 2);

            for (i of itemfaceelem) {
                i.textContent = itemfacearr[parseInt(i.classList[1]) - 1];
            } for (i of itemfacediaelem) {
                i.textContent = parseFloat(itemfacediarr[parseInt(i.classList[1]) - 1].toPrecision(4));
            } for (i of itemvolelem) {
                i.textContent = itemarr[0] * itemarr[1] * itemarr[2];
            } for (i of itemvoldiaelem) {
                i.textContent = parseFloat(Math.sqrt(itemarr[2]**2+itemfacediarr[0]**2).toPrecision(4))
            }
        } else {
            // note to self: experiment with this keyword later
            for (i of itemfaceelem) { i.textContent = '--'; }
            for (i of itemfacediaelem) { i.textContent = '--'; }
            for (i of itemvolelem) { i.textContent = '--' }
            for (i of itemvoldiaelem) { i.textContent = '--' }
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