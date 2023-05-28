const CURRENCY = 'Euro';
const STATUS_OK = 'on target';
const STATUS_ALERT = 'above budget';
const STATUS_ALERT_CLASSNAME = 'status-alert';

const expenseAdderNode = document.querySelector('#expenseAdder');
const inputButtonNode = document.querySelector('#inputButton');
const totalSpentNode = document.querySelector('#total');
const statusNode = document.querySelector('#status');
const spentListNode = document.querySelector('#spentList');

// new fithures for Stage Two: Categories and Date Selectors, U-update Limit and Clear Buttons
const catSelectorNode = document.getElementById("catSelector");
const dateSelectorNode = document.getElementById("dateSelector");
const limitUpdateBtnNode = document.getElementById("limitUpdateBtn");
const clearButtonNode = document.getElementById("clearButton");

const limitNode = document.querySelector('#limit-id');
let limit = parseInt(limitNode.innerText);

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
    limitNode.innerText = limit;
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
    if (totalSpent <= limit) {
        statusNode.innerText = STATUS_OK;
        statusNode.classList.remove(STATUS_ALERT_CLASSNAME);
    } else {
        const overBudget = totalSpent - limit;
        statusNode.innerHTML = `${STATUS_ALERT} (${overBudget} ${CURRENCY})`;
        // statusNode.innerText = STATUS_ALERT;
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

function limitUpdateBtnHandler() {
    console.log("all is right - it works))");
    const NEW_LIMIT_QUERY = "You may set new limit here:";
    const newLimitValue = prompt(NEW_LIMIT_QUERY);
    
    const newLimit = parseInt(newLimitValue);

    if (!newLimit) {
        return;
    }

    limitNode.innerText = newLimit;
    limit = newLimit;
    render(expenses);
};

limitUpdateBtnNode.addEventListener("click", limitUpdateBtnHandler);
clearButtonNode.addEventListener("click", clearButtonHandler);