function solve() {
  let btnStart = document.getElementById("start");
  let btnReset = document.getElementById("reset");
  let btnCollect = document.getElementById("collect");
  let btnProfit = document.getElementById("profit");
  let btnMoney = document.getElementById("money");
  btnCollect.addEventListener("click" , onCollect);
  btnStart.addEventListener("click", onStart);
  btnReset.addEventListener("click", onReset);
  let imgs = document.getElementsByTagName("img");
  let profitSum = 0;
  let boxes = {
    "bird.jpg": 2,
    "cross.jpg": 4,
    "kinjal.jpg": 6,
    "scatter.jpg": 0,
    "set.jpg": 7,
    "vaza.jpg": 8,
    "yea.jpg": 9,
    "riseofraFaraon.jpg": 10,
  };
  function onStart(event) {
    event.preventDefault();
    let currentMoney = btnMoney.textContent.slice(1);
    btnMoney.textContent = `$ ${Number(currentMoney) - 5}`
    for (let box of imgs) {
      let keys = Object.keys(boxes);
      let prop = keys[Math.floor(Math.random() * keys.length)];
      box.src = prop;
      box.alt = prop;
    }

    let firstLine = [
      imgs[0],
      imgs[1],
      imgs[2],
      imgs[3],
      imgs[4],
    ];
    let secondLine = [
      imgs[5],
      imgs[6],
      imgs[7],
      imgs[8],
      imgs[9]
    ];
    let thirdLine = [
      imgs[10],
      imgs[11],
      imgs[12],
      imgs[13],
      imgs[14],
    ];
    let fortLine = [
      imgs[0],
      imgs[1],
      imgs[7],
      imgs[13],
      imgs[14],
    ];
    let fifthLine = [
      imgs[10],
      imgs[11],
      imgs[7],
      imgs[3],
      imgs[4],
    ];
    let arrayOfProfit = [firstLine, secondLine, thirdLine, fortLine, fifthLine];
    let currentProfit = 0;
    for (let line of arrayOfProfit) {
      let current = filter(line);
      if (current.length > 1) {
          currentProfit += boxes[current[0]] * current.length;
      }
      profitSum += Math.round(currentProfit / 2);
    }
    btnProfit.textContent = `Win: ${profitSum}`;
    btnStart.disabled = true;
  }

  function onReset(event) {
    for (let box of imgs) {
      let parent = box.parentElement.parentElement;
      parent.style.backgroundColor = "white";
      box.src = "riseofraFaraon.jpg";
    }
    profitSum = 0;
    btnStart.disabled = false;
    btnCollect.disabled = false;
  }

  function filter(arr) {
    let filtered = [arr[0].alt];
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i];
      let next = arr[i + 1];

      if (current.alt == next.alt) {
        let parent = current.parentElement.parentElement;
        let nextParent = next.parentElement.parentElement;
        parent.style.backgroundColor = "orange";
        nextParent.style.backgroundColor = "orange";
        filtered.push(current.alt);
      } else {
        break;
      }
    }

    return filtered;
  }

  function onCollect (event) {
     btnProfit.textContent = "$ 0";
     let last = btnMoney.textContent.slice(1);
     btnMoney.textContent = `$ ${Number(last) + profitSum}`;
     console.log(Number(last) + profitSum);
     if((Number(last) + profitSum) > 200) {
        let choice = confirm(`GAME OVER!\nYOU WIN!\nPLAY AGAIN?`);

        if(choice == true) {
          btnMoney.textContent = `$ 100`;
          onReset();
        }
     }
     btnCollect.disabled = true;
  }

  let last = btnMoney.textContent.slice(1);
  if (Number(last) < 1) {
    let choice = confirm(`GAME OVER!\nYOU LOSE!\nPLAY AGAIN?`);

    if(choice == true) {
      btnMoney.textContent = `$ 100`;
      onReset();
    }
  }
}
solve();
