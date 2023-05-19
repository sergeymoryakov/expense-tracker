const LIMIT = 2400;
const CURRENCY = 'Euro';
const STATUS_OK = 'on target';
const STATUS_ALERT = 'above budget';
const STATUS_ALERT_CLASSNAME = 'status-alert';

const expenseAdderNode = document.querySelector('#expenseAdder');
const expenseAdderButtonNode = document.querySelector('#expenseAdderButton');
const limitNode = document.querySelector('#limit');
const totalSpentNode = document.querySelector('#total');
const statusNode = document.querySelector('#status');
const spentListNode = document.querySelector('#spentList');

const expenses = [];

init(expenses);

expenseAdderButtonNode.addEventListener('click', function() {
    const amount = getExpenseFromUser();
    if (!amount) {
        return;
    }
    trackExpenses(amount);
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
    let amount = parseInt(expenseAdderNode.value);
    clearInput();
    return amount;
}

function clearInput() {
    expenseAdderNode.value = '';
}

function trackExpenses(amount) {
    expenses.push(amount);
};

function calcTotalSpent(expenses) {
    let totalSpent = 0;
    expenses.forEach(element => {
        totalSpent += element;
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
        spentListHTML = spentListHTML + `<li>${element} ${CURRENCY}</li>`;
    });
    console.log('SpentListHTML: ', spentListHTML);
    spentListNode.innerHTML = `<ol>${spentListHTML}</ol>`;
};