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
      "bird.jpg": 1,
      "cross.jpg": 2,
      "kinjal.jpg": 3,
      "scatter.jpg": 0,
      "set.jpg": 4,
      "vaza.jpg": 5,
      "yea.jpg": 6,
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
        imgs[0].alt,
        imgs[1].alt,
        imgs[2].alt,
        imgs[3].alt,
        imgs[4].alt,
      ];
      let secondLine = [
        imgs[5].alt,
        imgs[6].alt,
        imgs[7].alt,
        imgs[8].alt,
        imgs[9].alt,
      ];
      let thirdLine = [
        imgs[10].alt,
        imgs[11].alt,
        imgs[12].alt,
        imgs[13].alt,
        imgs[14].alt,
      ];
      let fortLine = [
        imgs[0].alt,
        imgs[1].alt,
        imgs[7].alt,
        imgs[13].alt,
        imgs[14].alt,
      ];
      let fifthLine = [
        imgs[10].alt,
        imgs[11].alt,
        imgs[7].alt,
        imgs[3].alt,
        imgs[4].alt,
      ];
      let arrayOfProfit = [firstLine, secondLine, thirdLine, fortLine, fifthLine];
      let currentProfit = 0;
      for (let line of arrayOfProfit) {
        let current = filter(line);
        if (current.length > 1) {
            currentProfit += boxes[current[0]] * current.length;
        }
        profitSum += currentProfit;
      }
      btnProfit.textContent = `Win: ${profitSum}`;
      btnStart.disabled = true;
    }
  
    function onReset(event) {
      for (let box of imgs) {
        box.src = "riseofraFaraon.jpg";
      }
      profitSum = 0;
      btnStart.disabled = false;
      btnCollect.disabled = false;
    }
  
    function filter(arr) {
      let filtered = [arr[0]];
      for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        let next = arr[i + 1];
  
        if (current == next) {
          filtered.push(current);
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
       btnCollect.disabled = true;
    }
  }
  solve();