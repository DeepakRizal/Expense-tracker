const expenseForm = document.querySelector(".expense-form");
const expenseDescription = document.getElementById("description");
const expenseAmount = document.getElementById("amount");
const expenseDate = document.getElementById("date");

const expense = {
  description: "",
  amount: "",
  date: "",
};

const expenses = [];

function inputValue(val, identifier) {
  return { ...expense, [identifier]: val };
}

function valueHandler(e) {
  const value = e.target.value;
  inputValue(value, e.target.id);
}

expenseDescription.addEventListener("change", valueHandler);
expenseAmount.addEventListener("change", valueHandler);
expenseDate.addEventListener("change", valueHandler);
