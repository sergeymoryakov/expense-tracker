const CURRENCY = 'Euro';
const STATUS_OK = 'on target';
const STATUS_ALERT = 'above budget';
const STATUS_ALERT_CLASSNAME = 'status-alert';

const expenseAdderNode = document.querySelector('#expenseAdder');
const inputButtonNode = document.querySelector('#inputButton');
const totalSpentNode = document.querySelector('#total');
const statusNode = document.querySelector('#status');
const spentListNode = document.querySelector('#spentList');

// new fithures for Stage Two: Categories, Date Selectors and Clear Button
const catSelectorNode = document.getElementById("catSelector");
const dateSelectorNode = document.getElementById("dateSelector");
const clearButtonNode = document.getElementById("clearButton");

// const LIMIT = 2400;
const limitNode = document.querySelector('#limit');
const LIMIT = parseInt(limitNode.innerText);

let expenses = [];

init(expenses);

inputButtonNode.addEventListener('click', function() {
    const currentAmount = getExpenseFromUser();
    if (!currentAmount) {
        return;
    }

    const currentCategory = getSelectedCategory();
    if (currentCategory === "Category") {
        return;
    }
    console.log(currentCategory);

    const expenseObject = { amount: currentAmount, category: currentCategory };
    console.log(expenseObject); 

    trackExpenses(expenseObject);
    render(expenses);
});

function init(expenses) {
    limitNode.innerText = LIMIT;
    totalSpentNode.innerText = calcTotalSpent(expenses);
    statusNode.innerText = STATUS_OK;
};

function getExpenseFromUser() {
    if (!expenseAdderNode.value) {
        return null;
    }
    let currentAmount = parseInt(expenseAdderNode.value);
    clearInput();
    return currentAmount;
};

function getSelectedCategory() {
    return catSelectorNode.value;
};

function clearInput() {
    expenseAdderNode.value = '';
};

function trackExpenses(input) {
    expenses.push(input);
    // for TBS only
    console.log(expenses);
};

function calcTotalSpent(expenses) {
    let totalSpent = 0;
    expenses.forEach(expense => {
        totalSpent += expense.amount;
    });
    return totalSpent;
};

function render(expenses) {
    let totalSpent = calcTotalSpent(expenses);
    renderTotalSpent(totalSpent);
    renderStatus(totalSpent);
    renderHistory(expenses);
}

function renderTotalSpent(totalSpent) {
    totalSpentNode.innerText = totalSpent;
};

function renderStatus(totalSpent) {
    // const totalSpent = calcTotalSpent(expenses);
    if (totalSpent <= LIMIT) {
        statusNode.innerText = STATUS_OK;
        statusNode.classList.remove(STATUS_ALERT_CLASSNAME);
    } else {
        statusNode.innerText = STATUS_ALERT;
        statusNode.classList.add(STATUS_ALERT_CLASSNAME);
    };
};

function renderHistory(expenses) {
    let spentListHTML = '';
    expenses.forEach(element => {
        spentListHTML = spentListHTML + `<li>${element.category} - ${element.amount} ${CURRENCY}</li>`;
    });
    console.log('SpentListHTML: ', spentListHTML);
    spentListNode.innerHTML = `<ol>${spentListHTML}</ol>`;
};

function clearButtonHandler() {
    expenses = [];
    render(expenses);
};

clearButtonNode.addEventListener("click", clearButtonHandler);