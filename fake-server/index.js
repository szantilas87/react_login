const express = require("express");
const bodyParser = require('body-parser');
const fakeUsers = require("./fake-users.json");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/logins", (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        BadRequest(res);
    } else {
        ValidRequest(username, res, password);
    }
});

function ValidRequest(username, res, password) {
    let user = fakeUsers[username];
    if (!user) {
        LoginFailed(res);
        console.log("Login failed for unknown user", username);
    }
    else {
        LoginKnownUser(user, password, res, username);
    }
}

function LoginKnownUser(user, password, res, username) {
    if (user.password === password) {
        LoginSucceeded(res);
        console.log("Login succeeded for", username);
    }
    else {
        LoginFailed(res);
        console.log("Login failed for known user", username);
    }
}

const BadRequest = res => res.status(400).send("Bad request");
const LoginSucceeded = res => res.status(201).send("Login succeeded");
const LoginFailed = res => res.status(403).send("Login failed");

app.listen(port, () => console.log(`Fake login server listening at http://localhost:${port}`));

