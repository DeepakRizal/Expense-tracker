const expenseForm = document.querySelector(".expense-form");
const expenseDescription = document.getElementById("description");
const expenseAmount = document.getElementById("amount");
const expenseDate = document.getElementById("date");
const submitButton = document.querySelector(".submit-expense");
const expenseList = document.querySelector(".expense-list");
const addBudgetButton = document.querySelector(".add-budget-button");
const totalBudget = document.querySelector(".total-budget");
const budgetInput = document.querySelector(".budget-input");
const deleteButton = document.querySelector(".delete");
const reset = document.querySelector(".reset");
const resetModal = document.getElementById("resetModal");
const cancelBtn = document.getElementById("cancelBtn");
const okBtn = document.getElementById("okBtn");
const totalExpenseElement = document.querySelector(".total-expense");
const remainingBudget = document.querySelector(".remaining-budget");

let expense = {
  id: "",
  description: "",
  amount: "",
  date: "",
};

let totalExpense;

const expenses = [];

let appData = {
  budjet: "",
  totalExpense: "",
  expenses,
};

const storedData = localStorage.getItem("appData");

if (storedData) {
  appData = JSON.parse(storedData);
  totalBudget.textContent = appData.budjet;
}

//functions;

if (expenses.length === 0) {
  expenseList.innerHTML = "<p class='no-expense'>No expenses to show</p>";
}

function inputValue(val, identifier) {
  expense = { ...expense, [identifier]: val, id: Date.now() };
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

function calculateTotalExpense() {
  return appData.expenses.reduce((acc, cur) => {
    let number = parseInt(cur.amount);
    return (acc += number);
  }, 0);
}

function calculateRemainingBudget() {
  console.log(appData.budjet);
  return parseInt(appData.budjet - calculateTotalExpense());
}

console.log(calculateRemainingBudget());

function listItems(items) {
  let listItems = items.map((expense) => {
    let listItem = createElement("li", "expense");
    listItem.id = expense.id;
    const expenseText = createElement("p", "expense-text");
    expenseText.textContent = `Rs. ${expense.amount}`;
    const dateText = createElement("p", "date-text", expense.date);
    const descriptionText = createElement(
      "p",
      "description-text",
      expense.description
    );
    const expenseDetails = createElement("div", "expense-details");
    expenseDetails.append(expenseText, descriptionText, dateText);
    const buttons = createElement("div", "buttons");
    const editButton = createElement("button", "edit", "Edit");
    const deleteButton = createElement("button", "delete", "Delete");
    buttons.append(editButton, deleteButton);
    listItem.append(expenseDetails, buttons);
    return listItem;
  });
  expenseList.innerHTML = "";
  expenseList.append(...listItems);
}

listItems(appData.expenses);

totalExpenseElement.textContent = calculateTotalExpense();
remainingBudget.textContent = calculateRemainingBudget();

expenseDescription.addEventListener("change", valueHandler);
expenseAmount.addEventListener("change", valueHandler);
expenseDate.addEventListener("change", valueHandler);

//submit logic
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!appData.budjet || totalBudget.textContent === "0") {
    return alert("Please set a budget before adding expenses.");
  }

  if (
    expense.description.trim() === "" ||
    expense.amount.trim() === "" ||
    expense.date === ""
  ) {
    return alert("Please enter the expense: Description,Date and Amount");
  }

  const noExpenseText = document.querySelector(".no-expense");
  if (noExpenseText) {
    noExpenseText.remove();
  }

  appData.expenses.push(expense);

  localStorage.setItem("appData", JSON.stringify(appData));

  const expensesData = localStorage.getItem("appData");

  const { expenses: newExpenses } = JSON.parse(expensesData);

  listItems(newExpenses);

  totalExpenseElement.textContent = calculateTotalExpense();
  remainingBudget.textContent = calculateRemainingBudget();
  expenseDescription.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

addBudgetButton.addEventListener("click", () => {
  if (budgetInput.value.trim() === "") {
    return alert("please enter your budget");
  }

  appData = {
    ...appData,
    budjet: budgetInput.value,
  };
  localStorage.setItem("appData", JSON.stringify(appData));
  totalBudget.textContent = appData.budjet;
  budgetInput.value = "";
});

expenseList.addEventListener("click", (e) => {
  const listItem = e.target.closest(".expense");

  if (e.target.classList.contains("delete")) {
    appData.expenses = appData.expenses.filter(
      (expense) => expense.id !== Number(listItem.id)
    );
    console.log(appData.expenses);
    console.log(listItem.id);
    localStorage.setItem("appData", JSON.stringify(appData));
    listItems(appData.expenses);
    totalExpenseElement.textContent = calculateTotalExpense();
    remainingBudget.textContent = calculateRemainingBudget();
  }

  // Handle Edit Button Click
  if (e.target.classList.contains("edit")) {
    const expenseText = listItem.querySelector(".expense-text");
    const inputField = createElement("input");
    inputField.type = "text";
    inputField.value = expenseText.textContent.replace("Rs. ", "").trim();
    inputField.classList.add("edit-input");
    const saveButton = createElement("button", "save", "Save");

    expenseText.replaceWith(inputField);
    e.target.replaceWith(saveButton);
  }

  // Handle Save Button Click
  if (e.target.classList.contains("save")) {
    const inputField = listItem.querySelector(".edit-input");
    const newExpenseText = createElement("p", "expense-text");
    newExpenseText.textContent = `Rs. ${inputField.value}`;
    newExpenseText.classList.add("expense-text");

    const editButton = createElement("button", "edit", "Edit");

    inputField.replaceWith(newExpenseText);
    e.target.replaceWith(editButton);
  }
});

reset.addEventListener("click", () => {
  resetModal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  resetModal.style.display = "none";
});

okBtn.addEventListener("click", () => {
  localStorage.removeItem("appData");
  window.location.reload();
  resetModal.style.display = "none";
  // reset logic
});

window.addEventListener("click", (e) => {
  if (e.target === resetModal) {
    resetModal.style.display = "none";
  }
});
