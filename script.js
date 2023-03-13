"use strict";

const billInput = document.getElementById('bill-amount');
const tipCheckboxes = document.querySelectorAll('input[type="checkbox"][name="tip"]');
const numberOfPeopleInput = document.getElementById('number-people');
const customTipInput = document.getElementById('custom-tip');
const tipPerPersonOutput = document.getElementsByClassName('ti')[0];
const totalPerPersonOutput = document.getElementsByClassName('tot')[0];
const resetButton = document.getElementsByClassName('reset')[0];

let billAmount, numberOfPeople, customTip, tip;

function updateValues() {
  if (billAmount && numberOfPeople && (tip || customTip)) {
    const tipAmount = billAmount * (tip || customTip) / 100;
    const totalAmount = billAmount + tipAmount;
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalPerPerson = totalAmount / numberOfPeople;
    tipPerPersonOutput.innerHTML = tipPerPerson.toFixed(2);
    totalPerPersonOutput.innerHTML = totalPerPerson.toFixed(2);
  }
}

function clearSelectedLabels() {
  const tipLabels = document.querySelectorAll('.tip-label');
  tipLabels.forEach((label) => {
    label.classList.remove('selected');
  });
}

resetButton.addEventListener('click', () => {
  location.reload();
});

billInput.addEventListener('input', () => {
  billAmount = Number(billInput.value);
  updateValues();
});

numberOfPeopleInput.addEventListener('input', () => {
  numberOfPeople = Number(numberOfPeopleInput.value);
  updateValues();
});

customTipInput.addEventListener('input', () => {
  customTip = Number(customTipInput.value);
  updateValues();
  clearSelectedLabels();
});

tipCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('input', () => {
    tip = Number(checkbox.checked ? checkbox.value : '');
    updateValues();
    clearSelectedLabels();
    const tipLabel = document.querySelector(`label[for="${checkbox.id}"]`);
    if (tipLabel) {
      tipLabel.classList.add('selected');
    }
  });
});
