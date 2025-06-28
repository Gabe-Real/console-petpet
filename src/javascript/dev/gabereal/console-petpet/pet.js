#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const { petName, personality, reminderInterval } = config;

// Parse reminder interval as a number of minutes (it may be a string in config)
const reminderMinutes = Number(reminderInterval);

const pets = {
    Chill: {
        art: `
     (•ᴗ•)
    (  ▽  )
    ~~~~~~~
    `,
        phrases: [
            "Hey... stay cool 😎",
            "No rush. Just vibe 🌿",
            "Catch your breath."
        ],
        reminders: [
            "Time to hydrate 💧",
            "Get some water 😌",
            "Hydration break!"
        ]
    },
    Hype: {
        art: `
     (ง🔥益🔥)ง
    <(   )>
     ~~~~~
    `,
        phrases: [
            "YO LET'S GOOO 💪",
            "You got this!!",
            "CRUSH IT!!!"
        ],
        reminders: [
            "💧 DRINK WATER RIGHT NOW!",
            "BREAK TIME OR ELSE 🔥",
            "Hydration = Power"
        ]
    },
    Grumpy: {
        art: `
     (¬_¬)
    ( ︶︿︶)
    --------
    `,
        phrases: [
            "Still here? Ugh.",
            "You again?",
            "Can I nap yet?"
        ],
        reminders: [
            "Hydrate. Or don't. Whatever.",
            "Break, I guess.",
            "Go drink water... fine."
        ]
    },
    MadAsF: {
        art: `
     (ノಠ益ಠ)ノ彡┻━┻
    (╯°□°）╯︵ ┻━┻
    --------
    `,
        phrases: [
            "WHY ARE YOU STARING AT ME!?",
            "DON'T TEST ME 😡",
            "PET ME ONE MORE TIME"
        ],
        reminders: [
            "FUCKING DRINK WATER",
            "HYDRATE BEFORE I RIOT 💧",
            "STOP SLACKING, HYDRATE"
        ]
    }
};

const pet = pets[personality] || pets.Chill;

function showMessage(type = 'passive') {
    const phraseList = type === 'reminder' ? pet.reminders : pet.phrases;
    const phrase = phraseList[Math.floor(Math.random() * phraseList.length)];

    console.clear();
    console.log(`\nHi, I'm ${petName}!\n`);
    console.log(pet.art);
    console.log(`\n${phrase}`);
}

if (personality === 'MadAsF') {
    // Wait for user to type "hi" (case insensitive), then spam

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`Type "hi" to annoy ${petName}...`);

    rl.on('line', (input) => {
        if (input.trim().toLowerCase() === 'hi') {
            rl.close();
            const spamPhrase = "FUCK YOU";

            function spamSlowly() {
                console.clear();
                console.log(`\nHi, I'm ${petName}!\n`);
                console.log(pet.art);

                let count = 0;
                const maxLines = 50; // how many lines per batch

                function printLine() {
                    if (count < maxLines) {
                        console.log(spamPhrase);
                        count++;
                        setTimeout(printLine, 100); // print next line after 100ms
                    } else {
                        // After printing all lines, wait 1 second and start over
                        count = 0;
                        setTimeout(() => {
                            console.clear();
                            console.log(`\nHi, I'm ${petName}!\n`);
                            console.log(pet.art);
                            printLine();
                        }, 1000);
                    }
                }

                printLine();
            }

            spamSlowly();
        } else {
            console.log(`You said "${input}", but I only respond to "hi". Try again.`);
        }
    });
} else {
    // Show initial message once
    showMessage('passive');

    function startPassiveMessages() {
        const passiveInterval = 2 * 60 * 1000; // 2 minutes

        function nextPassive() {
            setTimeout(() => {
                showMessage('passive');
                nextPassive();
            }, passiveInterval);
        }

        nextPassive();
    }

    function startReminderMessages() {
        const reminderInterval = reminderMinutes * 60 * 1000;

        function nextReminder() {
            setTimeout(() => {
                showMessage('reminder');
                nextReminder();
            }, reminderInterval);
        }

        nextReminder();
    }

    startPassiveMessages();
    startReminderMessages();
}
