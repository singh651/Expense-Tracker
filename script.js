document.addEventListener("DOMContentLoaded",() => {

    const Expenseform = document.getElementById("Expense-form");
    const ExpenseName = document.getElementById("Expense-name");
    const Expenseamount = document.getElementById("Expense-amount");
    const Expenselist = document.getElementById("Expense-list");
    const TotalAmount = document.getElementById("Total-amount");

    const expense = [];
    const Total = CalculateTotal();

    Expenseform.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = ExpenseName.value.trim();
        const amount = parseFloat(Expenseamount.value.trim());

        if(name != "" && !NaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };
        
            expense.push(newExpense);
            saveExpensetoLocal();

            //Clear Input
            ExpenseName.value = "";
            Expenseamount.value = "";
        }
    });


    function CalculateTotal(){

    };

    function saveExpensetoLocal(){
        localStorage.setItem("expense", JSON.stringify(expense));
    };

})