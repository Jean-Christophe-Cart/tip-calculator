const billinput = document.querySelector("#bill");
const tipbuttons = document.querySelectorAll(".tip-grid__tip-choice button");
const customtipbutton = document.querySelector(".tip-grid__tip-choice input ");
const numberofpeoplelabel = document.querySelector("#peoplelabel");
const numberofpeopleinput = document.querySelector("#people");
let numberofpeopleerrors = document.querySelectorAll("#peoplelabel .error");
const tipamountdom = document.querySelector(".result__tip-amount h3");
const totalbilldom = document.querySelector(".result__total-bill h3");
const resetbutton = document.querySelector(".result button");

let bill = 0;
let tipamountpercentage = 0;
let numberofpeople = 0;
// innertext n'est pas le même que innerText!!
const calculateTipAndTotal = () => {
  if (numberofpeople !== 0) {
    tipamountdom.innerText = `$${(
      (bill * (tipamountpercentage / 100)) /
      numberofpeople
    ).toFixed(2)}`;
    totalbilldom.innerText = `$${(bill / numberofpeople).toFixed(2)}`;
  }
};

billinput.addEventListener("input", (event) => {
  bill = +event.target.value;
  calculateTipAndTotal();
});
tipbuttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      tipbuttons.forEach((button) => button.classList.remove("active"));
      tipamountpercentage = 0;
    } else {
      tipbuttons.forEach((button) => button.classList.remove("active"));
      button.classList.add("active");
      tipamountpercentage = +button.value;
    }
    calculateTipAndTotal();
  });
});

customtipbutton.addEventListener("input", (event) => {
  tipamountpercentage = +event.target.value;
  calculateTipAndTotal();
});

numberofpeopleinput.addEventListener("input", (event) => {
  numberofpeopleerrors = document.querySelectorAll("#peoplelabel .error");
  numberofpeopleerrors.forEach((numberofpeopleerror) => {
    numberofpeoplelabel.removeChild(numberofpeopleerror);
  });

  numberofpeopleinput.classList.remove("error");
  if (event.target.value === "0") {
    const errorspan = document.createElement("span");
    errorspan.innerText = "can't be zero";
    errorspan.classList.add("error");
    numberofpeopleinput.classList.add("error");
    numberofpeoplelabel.appendChild(errorspan);
  } else if (event.target.value.includes(".")) {
    const errorspan = document.createElement("span");
    errorspan.innerText = "can't be a decimal value";
    errorspan.classList.add("error");
    numberofpeopleinput.classList.add("error");
    numberofpeoplelabel.appendChild(errorspan);
  } else {
    numberofpeople = +event.target.value;
    calculateTipAndTotal();
  }
});

resetbutton.addEventListener("click", () => {
  tipamountpercentage = 0;
  bill = 0;
  numberofpeople = 0;
  billinput.value = "";
  tipbuttons.forEach((button) => button.classList.remove("active"));
  customtipbutton.value = "0";
  numberofpeopleinput.value = "";
  tipamountdom.innerText = "$0.00";
  totalbilldom.innerText = "$0.00";
});
