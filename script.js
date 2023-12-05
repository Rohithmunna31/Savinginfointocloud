// Function to fetch expenses from the external API
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
            ul.appendChild(li);
          });
          expenseListDiv.appendChild(ul);
        }
      })
      .catch(error => {
        console.error('Error displaying expenses:', error);
      });
  }

  // Display existing expenses on page load
  displayExpenses();

window.addEventListener('DOMcontentloaded',()=>{
    axios.get('https://crudcrud.com/api/2e1fb7e8f2864a3399ad6fcfd8cabb7f')
        .then((res)=>{
        console.log(res);
            for(let i=0;i<res.data.length;i++){
            console.log(res.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
}
  
  
