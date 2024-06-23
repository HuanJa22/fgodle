import {RNG} from './prng.js';
window.print_line = print_line;
window.toggle_Popup = toggle_Popup;

const fetchData = async () => {
  let response = await fetch("./servants.json");
  let data = await response.json();
  return data;
}

const chooseServant = (numberForToday) => {
  return data.then((data) => {
    var servants = Object.keys(data);
    var rng = new RNG(numberForToday);
    var chosen_int = rng.nextRange(0, servants.length);
    var chosen_servant = servants[chosen_int];
    return chosen_servant;
  })
}

const addOptions = () => {
  data.then(data => {
    let servants = Object.keys(data);
    let textbox = document.getElementById("servants");
    for (const servant of servants) {
      createOption(textbox, servant)
    }
  })
}

const display = (user) => {
  data.then(data => {chosen.then((chosen) => {
    let servants = Object.keys(data);
    if (servants.includes(user) && !submitted.includes(user)) {
      let categories = Object.keys(data[chosen])
      const row = document.createElement('div');
      row.className = 'row';
      if (i == 1){
        const titles = document.createElement('div');
        titles.className = 'row';
        for (const category of categories) {
          if (category != "Images") {
            draw_title_box(titles, category, i, category, "category");
          }
        }
        sections.append(titles);
      }
      if (user == chosen) {
        let n = 0
        for (const category of categories) {
          if (category == "Image") {
            draw_img_box(row, category, i, data[user][category])
          } else if  (category != "Images") {
            draw_box(row, category, i, data[user][category], "right", n);
            n++;
          }
        }
        var img = document.createElement('img');
        var pop = document.getElementById("congrats_name");
        var pop_img = document.getElementById("congrats_img");
        img.src = data[chosen]["Image"];
        img.className = "answer_img"
        pop_img.append(img);
        pop.append(data[chosen]["Name"]);
        toggle_Popup();
      } else {
        let n = 0;
        for (const category of categories) {
          if (category == "Image") {
            draw_img_box(row, category, i, data[user][category])
          } else {
            if (category != "Images") {
              let color = "wrong";
              if (data[chosen][category] == data[user][category]) {
                color = "right";
              } else if (Array.isArray(data[chosen][category])) {
                if (JSON.stringify(data[chosen][category]) == JSON.stringify(data[user][category])) {
                  color = "right";
                } else {
                  for (const ele of data[user][category]) {
                    if (data[chosen][category].includes(ele)) {
                      color = "partial";
                      break;
                    }
                  } 
                }
              }
              draw_box(row, category, i, data[user][category], color, n);
              n++;
            }
          }
        }
      }
      game.prepend(row);
      i += 1
      submitted.push(user);
    }
  })})
}

function createOption(container, option) {
  const opt = document.createElement('option');
  opt.value = option;
  container.append(opt);
  return opt;
}

function draw_box(container, attribute, row, content, correctness, n) {
    if (Array.isArray(content)) {
      content = content.join(', ')     
    }
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box_${row}_${attribute}`;
    box.textContent = content;
    box.classList.add(correctness);
    box.classList.add(`animated${n}`);

    container.append(box);
    return box;
}

function draw_img_box(container, attribute, row, url) {
  const box = document.createElement('div');
  box.className = 'box';
  box.id = `box_${row}_${attribute}`;
  var img = document.createElement('img');
  img.src = url;
  img.style.width = "55px";
  box.append(img);
  box.classList.add(`animated`);
  container.append(box);
  return box;
}

function draw_title_box(container, attribute, row, content, correctness) {
  const box = document.createElement('div');
  box.className = 'box';
  box.id = `box_${row}_${attribute}`;
  box.textContent = content;
  box.classList.add(correctness);

  container.append(box);
  return box;
}

function toggle_Popup() {
  document.getElementById("popup1").classList.toggle("active");
}

function print_line() {
    let input = document.getElementById("myInput").value;
    display(input);
    document.getElementById("myInput").value = "";
}

var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

var hint = document.getElementById("check");
hint.addEventListener("change", function() {
  if (this.checked) {
    data.then(data => {chosen.then(chosen => {
      if (data[chosen]["Images"] == "none") {
        game.style.backgroundImage = "none";
      } else {
        game.style.backgroundImage = `url(${data[chosen]["Images"]})`;
      }
    })})
  } else {
    game.style.backgroundImage = "none";
  }
})

var oneDayInMs = 1000*60*60*24;
var currentTimeInMs = new Date().getTime();  // UTC time
var numberForToday = Math.floor(currentTimeInMs / oneDayInMs);
let i = 1
let game = document.getElementById('grid');
let sections = document.getElementById('sections');
let submitted = [];
let data = fetchData();
let chosen = chooseServant(numberForToday);
console.log(chosen);
addOptions();