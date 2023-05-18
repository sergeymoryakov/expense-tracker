// Create list of expenses
const expenses = [];

const expenseAdderNode = document.querySelector('#expenseAdder');
const expenseAdderButtonNode = document.querySelector('#expenseAdderButton');
const spentListNode = document.querySelector('#spentList');
const totalSpentNode = document.querySelector('#total');

expenseAdderButtonNode.addEventListener('click', function() {
    // Get input field value and check for integer
    if (!expenseAdderNode.value) {
        console.log('Error: Empty value');
        return;
    }

    const amount = parseInt(expenseAdderNode.value);
    expenseAdderNode.value = '';
    
    // Add value amout to list of expenses
    expenses.push(amount);

    console.log(expenses);
    
    // Display list of expenses
    let spentListHTML = '';

    expenses.forEach(element => {
        spentListHTML = spentListHTML + `<li>${element} Euro</li>`;
    });
    
    console.log('SpentListHTML: ', spentListHTML);
    spentListNode.innerHTML = `<ol>${spentListHTML}</ol>`;

    // Calculate and display Total Spent
    let totalSpent = 0;
    expenses.forEach(element => {
        totalSpent += element;
    });

    console.log(totalSpent);
    totalSpentNode.innerText = totalSpent;
});