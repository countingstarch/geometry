const unitInput = document.querySelector('#unit');
const unitNodes = document.querySelectorAll('.unit');
let unit;

const door = document.querySelectorAll('.door');
const item = document.querySelectorAll('.item');
let doordims = 0;

for (i of door) {
    i.addEventListener('input', () => {
        if (door[0].value && door[1].value) {
            console.log('hello')
            doordims = door[0].value*door[1].value
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