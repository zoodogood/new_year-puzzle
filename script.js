document.querySelector("#box").style.cssText = "display: flex; flex-direction: column; width: 300px;"
document.body.style.background = "#2f3136";

let
  canv = document.querySelector("#puzzle"),
  ctx  = canv.getContext("2d");

canv.style.marginBottom = "5px";

let
  i = 10,
  rules = {"!111": "3", "!222": "32", "!11": "21", "!22": "22", "!33": "23", "!1": "11", "!2": "12", "!3": "13"},
  last = "1";

  canv.height = 30 * i + 30;
  ctx.font = "bold 20px sans-serif";
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(19, 202, 36, 0.3)";
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  ctx.fillStyle = "#2f3136";
  ctx.fillRect(0, 0, 300, canv.height)

  while (i > 0){
    let input = "";
    i--;
    ctx.fillStyle = "#13ca24";
    ctx.fillText(last, 150 - ctx.measureText(last).width / 2, canv.height - (i + 1) * 30);
    while (last) {
      let found = Object.keys(rules).find(e => last.startsWith( e.slice(1) ));
      input += rules[found];
      last = last.slice(found.length - 1);
      ctx.fillStyle = "#f2fafa";
      ctx.fillRect(random(0, canv.width), random(0, canv.height), 2, 2);
      ctx.fillRect(random(0, canv.width), random(0, canv.height), 1, 1);
      ctx.fillStyle = "rgba(242, 250, 250, 0.5)";
      ctx.fillRect(random(0, canv.width), random(0, canv.height), 3, 3)
    }

    last = input;
  }
  ctx.shadowColor = "rgba(150, 75, 0, 0.3)";
  ctx.fillStyle = "#964B00";
  ctx.fillText("???", 134, canv.height);

  ctx.strokeStyle = "rgba(19, 202, 36, 0.5)";
  ctx.shadowColor = "rgba(19, 202, 36, 0.3)";
  ctx.beginPath();

  ctx.moveTo(150, 7.5);
  ctx.lineTo(50, canv.height - 20);
  ctx.lineTo(135, canv.height - 20);
  ctx.lineTo(135, canv.height - 24);

  ctx.moveTo(150, 7.5);
  ctx.lineTo(250, canv.height - 20);
  ctx.lineTo(165, canv.height - 20);
  ctx.lineTo(165, canv.height - 24);

  ctx.stroke();

  ctx.shadowColor = "rgba(255, 255, 0, 0.3)";
  ctx.fillStyle = "#ff0";
  ctx.beginPath();
  ctx.moveTo(150, 0);
  ctx.lineTo(145, 5);
  ctx.lineTo(150, 10);
  ctx.lineTo(155, 5);
  ctx.closePath();
  ctx.fill();





let input = document.querySelector("input");
input.addEventListener("keydown", (e) => {
  if (e.code != "Enter") return
  answer = input.value;

  if (answer == last) return alert("🎉 И это... Правильный ответ! Ваша награда уже у вас в карманах! 🎉");

  let percent = Math.round((1 - similarity(last, String(answer)) / last.length) * 100);
  let phrase;
  switch (true) {
    case percent < 10: phrase = `Ответ не верный.\nСовет: в ответе ровно ${last.length} цифр`;
    break;
    case percent < 25: phrase = `Похоже вы встали на верный путь и скоро разгадаете эту задачку, не сдавайтесь!`;
    break;
    case percent < 80: phrase = `На ${percent}% вы ответили — правильно! Интересный факт: картошка — это фонарь, лишь на 11.76%.`;
    break;
    case percent < 101: phrase = `Осталось совсем чуть-чуть! У вас получится, но ответ всё-ещё не верный.`;
  }
  alert(phrase);
})









function similarity(a, b) {

  if (a.toLowerCase() == b.toLowerCase()) return 0;
  a = a.toLowerCase().split("");
  b = b.toLowerCase().split("");
  let i = 0, w = 0;

  while( i < Math.max(a.length, b.length) ){
    if (a[i] == b[i]) {}
    else if (a[i] == b[i + 1] && a[i + 1] == b[i]){
      a[i] = b[i + 1];
      a[i + 1] = b[i];
      b[i] = a[i];
      b[i + 1] = a[i + 1];
      w += 1;
      i++;
      console.log("switch");
    }
    else if (a[i] == b[i + 1]){
      b.splice(i, 1);
      w += 0.75;
      console.log("delete");
    }
    else if (a[i + 1] == b[i] || b[i] == undefined){
      b.splice(i, 0, a[i])
      w += 0.75;
      console.log("add");
    }
    else {
      b[i] = a[i];
      w += 1;
      console.log("replace");
    }
    i++;
  }
  console.log(w);
  return w;
};


function random(min, max){
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
