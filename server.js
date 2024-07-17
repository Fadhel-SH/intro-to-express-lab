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

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
