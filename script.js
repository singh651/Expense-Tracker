document.addEventListener("DOMContentLoaded", () => {

    const Expenseform = document.getElementById("Expense-form");
    const ExpenseName = document.getElementById("Expense-name");
    const Expenseamount = document.getElementById("Expense-amount");
    const TotalAmount = document.getElementById("Total-amount");
    const ExpenseList = document.getElementById("Expense-list");

    // Load the saved expenses from localStorage or initialize an empty array
    let expense = JSON.parse(localStorage.getItem("expense")) || [];
    
    Updatetotal();  // Update the total on page load
    RenderExpense();  // Render saved expenses on page load

    // Event listener for form submission
    Expenseform.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        
        const name = ExpenseName.value.trim();
        const amount = parseFloat(Expenseamount.value.trim());

        // Validate the input fields
        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };

            expense.push(newExpense);  // Add the new expense to the array
            saveExpensetoLocal();      // Save the updated expenses to localStorage
            RenderExpense();           // Re-render the updated expense list
            Updatetotal();             // Update the total after adding new expense

            // Clear the input fields
            ExpenseName.value = "";    
            Expenseamount.value = "";
        }
    });

    // Function to calculate the total amount
    function CalculateTotal() {
        return expense.reduce((acc, curr) => acc + curr.amount, 0);  // Sum up all the amounts
    }

    // Function to update the total amount
    function Updatetotal() {
        const Total = CalculateTotal();
        TotalAmount.textContent = `$${Total.toFixed(2)}`;  // Display the total
    }

    // Function to save expenses to localStorage
    function saveExpensetoLocal() {
        localStorage.setItem("expense", JSON.stringify(expense));
    }

    // Function to render the list of expenses
    function RenderExpense() {
        ExpenseList.textContent = ""; // Clear the list before rendering
        
        expense.forEach((expenseItem) => {
            const li = document.createElement("li");
            li.innerHTML = `${expenseItem.name} - $${expenseItem.amount.toFixed(2)}
            <button data-id="${expenseItem.id}">Delete</button>`;
        
            // Add delete functionality
            li.querySelector("button").addEventListener("click", () => {
                deleteExpense(expenseItem.id);
            });
            
            ExpenseList.appendChild(li);
        });
    }

    // Function to delete an expense
    function deleteExpense(id) {
        expense = expense.filter(item => item.id !== id); // Remove the item from the array
        saveExpensetoLocal();                             // Save the updated array to localStorage
        RenderExpense();                                  // Re-render the expense list
        Updatetotal();                                    // Update the total after deletion
    }

});
