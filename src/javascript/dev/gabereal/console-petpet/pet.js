const fs = require('fs');
const readline = require('readline');
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const asciiFace = ` 
   (^・ω・^ ) 
  /        \\ 
 (          )
  \\________/
`;

let startTime = Date.now();

function drawPet(message = '') {
    console.clear();
    console.log(asciiFace);
    console.log(`\n${config.petName} says: ${message}`);
}

setInterval(() => {
    const now = Date.now();
    const elapsedMinutes = (now - startTime) / 60000;

    if (elapsedMinutes >= config.reminderInterval) {
        drawPet("Time to hydrate! 💧");
        startTime = Date.now();
    } else {
        drawPet("I'm just chillin'...");
    }
}, 5000);
