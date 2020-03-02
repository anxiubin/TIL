const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const LStransactions = JSON.parse(localStorage.getItem('LStransaction'));

let transactions = localStorage.getItem('LStransaction') !== null ? LStransactions : [];

function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: parseInt(amount.value)
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();
        
        updateLocalStorage();
        
        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, money) => (acc += money), 0).toFixed(2);

    const income = amounts
    .filter(money => money > 0)
    .reduce((acc, money) => (acc += money), 0).toFixed(2);

    const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = total >= 0 ? `$${total}` : `-$${Math.abs(total)}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }

function updateLocalStorage() {
    localStorage.setItem('LStransaction', JSON.stringify(transactions));
}
  

function init() {
    list.innerHTML = '';
  
    transactions.forEach(addTransactionDOM);
    updateValues();
}
  
init();
  
form.addEventListener('submit', addTransaction);