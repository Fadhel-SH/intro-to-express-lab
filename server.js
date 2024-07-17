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

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
