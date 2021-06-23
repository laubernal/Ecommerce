const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
    <div>
        <input placeholder="Email" />
        <input placeholder="Password" />
        <input placeholder="Password confirmation" />
        <button>Sign up</button>
    </div>
    `);
});

app.listen(3000, () => {
    console.log('hello');
});