// Store expenses in an array
let expenses = [];

// Function to add a new expense
function addExpense() {
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);
    
    if (category && !isNaN(amount) && amount > 0) {
        expenses.push({ category, amount });
        updateExpenseTable();
        clearInputs();
    } else {
        alert('Please enter valid category and amount');
    }
}

// Function to clear input fields
function clearInputs() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

// Function to update the expense table
function updateExpenseTable() {
    const tbody = document.getElementById('expenseList');
    tbody.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseTable();
}

// Function to calculate and display results
function calculateResults() {
    if (expenses.length === 0) {
        alert('Please add some expenses first');
        return;
    }

    // Calculate total amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalAmount').textContent = `$${totalAmount.toLocaleString()}`;

    // Calculate average daily expense (assuming 30 days)
    const averageDaily = totalAmount / 30;
    document.getElementById('averageDaily').textContent = `$${averageDaily.toLocaleString()}`;

    // Get top 3 expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';
    
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesList.appendChild(li);
    });
}

// Add event listener for Enter key in input fields
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addExpense();
            }
        });
    });
}); 