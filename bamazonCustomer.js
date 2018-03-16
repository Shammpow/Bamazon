var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Password123",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    userQuery();

});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res, null, 2));
        buyStuff();
        
    });
}

function userQuery() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Welcome to Bamazon, what would you like to do?',
            name: 'buyOrBrowse',
            choices: ['I know what I want, let me buy my stuff!', 'I would like to browse your selection.']
        }
    ]).then(function (answer) {
        var choiceA = 'I know what I want, let me buy my stuff!'
        var choiceB = 'I would like to browse your selection.'
        if (answer.buyOrBrowse === choiceA) {
            buyStuff();
        }
        else if (answer.buyOrBrowse === choiceB) {
            displayProducts();
        }

    })
}

function buyStuff() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What would you like to buy?',
            name: 'insertProduct'
        },
        {
            type: 'input',
            message: 'How many would you like to buy?',
            name: 'amountToBuy'
        }
    ]).then(function (answer) {
        connection.query({
            sql: `SELECT * FROM products WHERE product_name = ?`,
            values: [answer.insertProduct]
        }, function (err, results) {
            var productOrdered = results[0]['product_name'];
            if (results[0]['stock_quantity'] < answer.amountToBuy) {
                console.log('Not enough ' + productOrdered + ' for that big of an order! Try again please...')
                userQuery();
            }
            else {
                console.log('Thanks for ordering ' + answer.amountToBuy + ' ' + productOrdered + '. Come again!');
                connection.end();
            }
        })

    })

}