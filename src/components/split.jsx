import _ from "underscore";

var personas = [{ 'name': 'John', 'expenses': [25, -105, 10] },
{ 'name': 'Lisa', 'expenses': [80, 195, 20] }, 
{ 'name': 'Michael', 'expenses': [45, 25, 30] },
{ 'name': 'Kurt', 'expenses': [66, 12, -20] },
{ 'name': 'Jerry', 'expenses': [180, 315, 22] },
{ 'name': 'Sevket', 'expenses': [80, -32, 20] },
{ 'name': 'Bahtiyar', 'expenses': [15, 55, 130] },
{ 'name': 'Ilyas', 'expenses': [66, 12, -271] },
{ 'name': 'Menekse', 'expenses': [130, 212, -22] } ,
{ 'name': 'Zuzka', 'expenses': [180, 212, -12] } 
]


let averageCost = 0;
let totalCost = 0 //to accumulate all the costs and to find the average.

const calcTotalAverage = (persons) => {
    persons.forEach(person => { // receiving to each person
        const receipts = person.expenses;
        let personTotalCost = 0; //to calculate total expense of each person

        receipts.forEach(receipt => {
            totalCost += receipt; //adding each expense to the totalCost variable.
            personTotalCost += receipt;
        })
        person["totalExpense"] = personTotalCost // calculate total cost of each person.
    });
    averageCost = totalCost / persons.length;
}

const calcBalance = (persons) => {
    const personsBalance = [];
    persons.forEach(person => {
        person["balance"] = person.totalExpense - averageCost
        personsBalance.push({ "name": person["name"], "balance": person["balance"] });
    });
    return _.sortBy(personsBalance, 'balance');
}


const equalize = (balancedArr) => {
    let newBal = balancedArr;
    let topDebtor = _.first(balancedArr);
    let topCreditor = _.last(balancedArr);
    if (topDebtor.balance === 0 && topCreditor.balance <= 1) {
        console.log("first if");
        return balance = newBal;
    }
    else if (
        Math.abs(topCreditor.balance) > Math.abs(topDebtor.balance)) {
        console.log("last greater than first");
        const logObj = { "sender": topDebtor.name, "receiver": topCreditor.name, "amount": (Math.round( Math.abs(topDebtor.balance) * 10) / 10) }
        transferLog.push(logObj);
        topCreditor.balance += topDebtor.balance;
        topDebtor.balance = 0;
        newBal = _.sortBy(balancedArr, 'balance');
        console.log("new Bal: ",newBal);
        return(equalize(newBal));
    }
    else if (Math.abs(topCreditor.balance) < Math.abs(topDebtor.balance)) {
        console.log("first greater than last");
        const logObj = { "sender": topDebtor.name, "receiver": topCreditor.name, "amount": (Math.round( Math.abs(topCreditor.balance) * 10) / 10) }
        transferLog.push(logObj);
        topDebtor.balance += topCreditor.balance;
        topCreditor.balance = 0;
        newBal = _.sortBy(balancedArr, 'balance');
        return(equalize(newBal));
    }
    else if (Math.abs(topCreditor.balance) === Math.abs(topDebtor.balance)) {
        console.log("first equal to last!")
        const logObj = { "sender": topDebtor.name, "receiver": topCreditor.name, "amount": (Math.round( Math.abs(topDebtor.balance) * 10) / 10) }
        transferLog.push(logObj);
        topDebtor.balance = 0;
        topCreditor.balance = 0;
        newBal = _.sortBy(balancedArr, 'balance');
        return(equalize(newBal));
    }
}

var transferLog = []
calcTotalAverage(personas);
let balance = calcBalance(personas);
equalize(balance);
console.log(transferLog);