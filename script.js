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

let expense = {
  description: "",
  amount: "",
  date: "",
};

const expenses = [];

//functions;

if (expenses.length === 0) {
  expenseList.innerHTML = "<p class='no-expense'>No expenses to show</p>";
}

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

  const noExpenseText = document.querySelector(".no-expense");
  if (noExpenseText) {
    noExpenseText.remove();
  }

  expenses.push(expense);

  let listItem;
  expenses.forEach((expense) => {
    listItem = createElement("li", "expense");
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
  });

  expenseList.appendChild(listItem);

  expenseDescription.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

addBudgetButton.addEventListener("click", () => {
  if (budgetInput.value.trim() === "") {
    return alert("please enter your budget");
  }
  totalBudget.textContent = budgetInput.value;
  budgetInput.value = "";
});

expenseList.addEventListener("click", (e) => {
  const listItem = e.target.closest(".expense");

  if (e.target.classList.contains("delete")) {
    if (listItem) {
      listItem.remove();
    }
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
  console.log("clicked!");
  resetModal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  resetModal.style.display = "none";
});

okBtn.addEventListener("click", () => {
  resetModal.style.display = "none";
  // reset logic
});

window.addEventListener("click", (e) => {
  if (e.target === resetModal) {
    resetModal.style.display = "none";
  }
});
