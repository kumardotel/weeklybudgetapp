//classes
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetleft = this.budget;
  }

  //subtract from the budget
  subtractFromBudget(amount) {
    return (this.budgetleft -= amount);
  }
}

//Everything related to HTML
class HTML {
  //insert the budget when user submits it
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetLeft.innerHTML = `${amount}`;
  }

  //Displays a message (for correct data or invalid data)
  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    //to insert into the html
    document
      .querySelector(".primary")
      //while using insert before method second parameter is the child node before which I would like to insert my new node.
      .insertBefore(messageWrapper, addExpenseForm);

    //to clear the error
    setTimeout(function () {
      document.querySelector(".alert").remove();
      addExpenseForm.reset();
    }, 2000);
  }

  //To display the expenses from the form to the list (we have created empty ul in html doc.)
  addExpenseToList(name, amount) {
    const expensesList = document.querySelector("#expenses ul");
    //create an li
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    //Create the template
    li.innerHTML = `
        ${name}
        <span class = "badge badge-primary badge-pill">$ ${amount} </span>
        `;
    //Insert into the html
    expensesList.appendChild(li);
  }

  //to subtract expense from the budget amount.
  trackBudget(amount) {
    const budgetLeftDollars = budget.subtractFromBudget(amount);
    budgetLeft.innerHTML = `${budgetLeftDollars}`;

    //To check when 25% is left
    if (budget.budget / 4 > budgetLeftDollars) {
      //Add some classes and remove some for the background property of the budget
      //We get to the main parent element of the value using DOM traversing.
      budgetLeft.parentElement.parentElement.classList.remove(
        "alert-success",
        "alert-warning"
      );
      budgetLeft.parentElement.parentElement.classList.add("alert-danger");
    } else if (budget.budget / 2 > budgetLeftDollars) {
      //again change classlist to change the background color property
      budgetLeft.parentElement.parentElement.classList.remove("alert-success");
      budgetLeft.parentElement.parentElement.classList.add("alert-warning");
    }
  }
}

//variables
const addExpenseForm = document.querySelector("#add-expense");
const budgetTotal = document.querySelector("span#total");
const budgetLeft = document.querySelector("span#left");

let budget, userBudget;

const html = new HTML();

//event listeners
eventListeners();
function eventListeners() {
  //App Init 111111111111111
  document.addEventListener("DOMContentLoaded", function () {
    //ask the visitor the weekly budget
    userBudget = prompt(`What's your budget for this week`);
    //validate the userBudget
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      //budget is valid then instantiate the budget class
      budget = new Budget(userBudget); //----called budget as new budget to create object
      //Instantiate the HTML class
      html.insertBudget(budget.budget);
    }
  });
  //When a new expense is added
  addExpenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    //read the values from budget form
    const expenseName = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;
    if (expenseName === "" || amount === "") {
      html.printMessage(
        "There was an error, all the fields are mandatory",
        "alert-danger"
      );
    } else {
      //Add the expenses into the list
      html.addExpenseToList(expenseName, amount);

      html.trackBudget(amount);
      html.printMessage("Added.......", "alert-success");
    }
  });
}

/*    
Breaking down steps to create Weekly Budget

1. At first when DOMContent is Loaded we need to pass a prompt() {this method displays a dialogue box to enter string data.}




*/
