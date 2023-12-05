function fetchExpenses() {
  return axios.get('https://crudcrud.com/api/2e1fb7e8f2864a3399ad6fcfd8cabb7f/expenses')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching expenses:', error);
      return [];
    });
}

// Function to save an expense to the external API
function saveExpense() {
  const amount = document.getElementById('expenseAmount').value;
  const category = document.getElementById('expenseCategory').value;
  const description = document.getElementById('expenseDescription').value;

  const newExpense = {
    amount: amount,
    category: category,
    description: description
  };

  axios.post('https://crudcrud.com/api/2e1fb7e8f2864a3399ad6fcfd8cabb7f/expenses', newExpense)
    .then(() => {
      displayExpenses(); // Display updated expenses after saving
    })
    .catch(error => {
      console.error('Error saving expense:', error);
    });
}

// Function to display expenses
function displayExpenses() {
  fetchExpenses()
    .then(expenses => {
      const expenseListDiv = document.getElementById('expenseList');
      expenseListDiv.innerHTML = ''; // Clear previous content

      if (expenses.length === 0) {
        expenseListDiv.innerHTML = '<p>No expenses added yet.</p>';
      } else {
        const ul = document.createElement('ul');
        expenses.forEach(expense => {
          const li = document.createElement('li');
          li.innerHTML = `
            Amount: $${expense.amount} | Category: ${expense.category} | Description: ${expense.description}
          `;

          // Create delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteExpense(expense._id)); // Assuming _id is the unique identifier for expenses

          // Create update button
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => updateExpense(expense._id, expense));

          li.appendChild(deleteButton);
          li.appendChild(updateButton);
          ul.appendChild(li);
        });
        expenseListDiv.appendChild(ul);
      }
    })
    .catch(error => {
      console.error('Error displaying expenses:', error);
    });
}

// Function to delete an expense by ID
function deleteExpense(expenseId) {
  axios.delete(`https://crudcrud.com/api/2e1fb7e8f2864a3399ad6fcfd8cabb7f/expenses/${expenseId}`)
    .then(() => {
      displayExpenses(); // Refresh expenses after deletion
    })
    .catch(error => {
      console.error('Error deleting expense:', error);
    });
}

// Function to update an expense
function updateExpense(expenseId, updatedExpense) {
  // Assuming you have a form with ID "expenseForm" for updating expenses
  const form = document.getElementById('expenseForm');
  form.amount.value = updatedExpense.amount;
  form.category.value = updatedExpense.category;
  form.description.value = updatedExpense.description;

  // On form submission, update the expense details
  form.onsubmit = function (event) {
    event.preventDefault();

    const editedExpense = {
      amount: form.amount.value,
      category: form.category.value,
      description: form.description.value
    };

    axios.put(`https://crudcrud.com/api/2e1fb7e8f2864a3399ad6fcfd8cabb7f/expenses/${expenseId}`, editedExpense)
      .then(() => {
        displayExpenses(); // Display updated expenses after editing
      })
      .catch(error => {
        console.error('Error updating expense:', error);
      });
  };
}

// Fetch data on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchExpenses()
    .then(expenses => {
      // Display expenses when the DOM is loaded
      displayExpenses();
    })
    .catch(error => {
      console.error('Error on page load:', error);
    });
});

  
  
