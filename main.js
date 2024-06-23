const prompt = require('prompt-sync')({sigint:true});
const data = require("./servants.json");
var servants = Object.keys(data);
var chosen_int = Math.floor(Math.random() * servants.length);
var chosen_servant = servants[chosen_int];
var win = false;

function print_result(chosen, user) {
    let categories = Object.keys(data[chosen])
    if (user == chosen) {
        for (const category of categories) {
            process.stdout.write("\x1b[42m" + `${category}: ${data[user][category]}` + "\x1b[0m ");
        }
        console.log("")
        return true;
    } else {
        for (const category of categories) {
            let color = "\x1b[41m";
            if (data[chosen][category] == data[user][category]) {
                color = "\x1b[42m";
            } else if (Array.isArray(data[chosen][category])) {
                if (JSON.stringify(data[chosen][category]) == JSON.stringify(data[user][category])) {
                    color = "\x1b[42m";
                } else {
                    for (const ele of data[user][category]) {
                        if (data[chosen][category].includes(ele)) {
                            color = "\x1b[43m";
                            break;
                        }
                    }
                }
            }
            process.stdout.write(`${color}` + `${category}: ${data[user][category]}` + `\x1b[0m `);
        }
        console.log("")
        return false;
    }
}
while (win == false) {
    let user_servent = prompt("Choose a servant: ");
    win = print_result(chosen_servant, user_servent);
}
