const express = require('express');
const app = express();
const port = 3000; 

// Middleware for all requests
app.use((req, res, next) => {
    next();
});

// Define a route for greeting users
app.get('/greetings/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello there, ${username}!`);
});

// Define a route for rolling the dice
app.get('/roll/:number', (req, res) => {
    const { number } = req.params;

    // Validate if the parameter is a positive integer
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber) || parsedNumber <= 0) {
        res.status(400).send('You must specify a number.');
        return;
    }

    // Generate a random whole number between 0 and the given number
    const rolledNumber = Math.floor(Math.random() * (parsedNumber + 1));

    res.send(`You rolled a ${rolledNumber}.`);
});


// Data array of collectibles
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Define a route for collectibles
app.get('/collectibles/:index', (req, res) => {
    const { index } = req.params;

    // Validate if the index is within bounds
    const parsedIndex = parseInt(index, 10);
    if (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= collectibles.length) {
        res.status(404).send('This item is not yet in stock. Check back soon!');
        return;
    }

    // Get the collectible at the specified index
    const { name, price } = collectibles[parsedIndex];
    res.send(`So, you want the ${name}? For ${price}, it can be yours!`);
});


// Define Name and age 
app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

// Data array of shoes
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Define a route for /shoes
app.get('/shoes', (req, res) => {
    const { minPrice, maxPrice, type } = req.query;

    // Filter shoes based on query parameters
    let filteredShoes = shoes;

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseInt(minPrice, 10));
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseInt(maxPrice, 10));
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.json(filteredShoes);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
