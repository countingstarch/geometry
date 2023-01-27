const unitInput = document.querySelector('#unit');
const unitNodes = document.querySelectorAll('.unit');
let unit;

const door = document.querySelectorAll('.door');
const item = document.querySelectorAll('.item');

const doordiaelem = document.querySelector('#doordia');
let doordims = 0;
let doordia = 0;

for (i of door) {
    i.addEventListener('input', () => {
        if (door[0].value && door[1].value) {
            doordims = door[0].value * door[1].value
            doordia = Math.sqrt(door[0].value ** 2 + door[1].value ** 2)

            doordiaelem.textContent = doordia;
        } else {
            doordiaelem.textContent = '--';
        }
    })
}

unitInput.addEventListener('input', () => {
    unit = unitInput.value;
    for (i of unitNodes) {
        i.textContent = '\u00A0' + unit;
    }
})

console.log("Hello world!");