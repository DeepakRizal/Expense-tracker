const expenseForm = document.querySelector(".expense-form");
const expenseDescription = document.getElementById("description");
const expenseAmount = document.getElementById("amount");
const expenseDate = document.getElementById("date");
const submitButton = document.querySelector(".submit-expense");
const expenseList = document.querySelector(".expense-list");

let expense = {
  description: "",
  amount: "",
  date: "",
};

const expenses = [];

functions;

function inputValue(val, identifier) {
  expense = { ...expense, [identifier]: val };
}

function valueHandler(e) {
  const value = e.target.value;
  inputValue(value, e.target.id);
}

function createElement(elementName, className, textContent) {
  const element = document.createElement(elementName);
  if (className) {
    element.classList.add(className);
  }
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

expenseDescription.addEventListener("change", valueHandler);
expenseAmount.addEventListener("change", valueHandler);
expenseDate.addEventListener("change", valueHandler);

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    expense.description.trim() === "" ||
    expense.amount.trim() === "" ||
    expense.date === ""
  ) {
    return alert("Please enter the expense: Description,Date and Amount");
  }
  expenses.push(expense);

  let listItem;
  expenses.forEach((expense) => {
    listItem = createElement("li", "expense");
    const expenseText = createElement("p", "expense-text");
    expenseText.textContent = `Rs. ${expense.amount}`;
    const buttons = createElement("div", "buttons");
    const editButton = createElement("button", "edit", "Edit");
    const deleteButton = createElement("button", "delete", "Delete");
    buttons.append(editButton, deleteButton);
    listItem.append(expenseText, buttons);
  });

  expenseList.appendChild(listItem);

  expenseDescription.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});
