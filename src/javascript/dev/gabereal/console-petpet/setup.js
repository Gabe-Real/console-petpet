const inquirer = require('inquirer');
const fs = require('fs');

(async () => {
    const answers = await inquirer.prompt([
        { name: 'petName', message: "What's your pet's name?", default: 'Pikachu' },
        { name: 'reminderInterval', message: 'Remind to hydrate every (minutes)?', default: 30 },
        { name: 'personality', type: 'list', message: 'Pick a personality:', choices: ['Chill', 'Cheerful', 'Motivational'] },
    ]);

    fs.writeFileSync('config.json', JSON.stringify(answers, null, 2));
    console.log(`✅ Setup complete! Launch your pet with: node pet.js`);
})();
