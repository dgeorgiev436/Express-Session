const express = require("express");
const app = express();
const session = require("express-session")

// SESSION MIDDLEWARE 
app.use(session(
	{
		secret: "thesecret",
		resave: false,
		saveUninitialized: false
	}
));

app.get("/viewcount", (req,res) => {
	if(req.session.count){
		req.session.count += 1;
	}else{
		req.session.count = 1;
	}
	res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES`)
})

app.get("/register", (req,res) => {
	const {username = "Anonymous"} = req.query;
	req.session.username = username;
	res.redirect("/greet")
})

app.get("/greet", (req,res) => {
	res.send(`HELLO DEAR ${req.session.username} YOU HAVE VISITED ${req.session.count} TIMES`)
})

app.listen(3000, () => {
	console.log("SERVER LISTENING ON PORT 3000");
})