const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static("public"));

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");


const todos = {
  "items": [
  {"id": 1, "item":"Wash the car", "complete":true},
  {"id": 2, "item":"Take out the trash", "complete":false}
]
};

app.get('/index', function (req, res) {
  res.render('index', todos);
});

app.post("/", function (req, res) {
  let i =todos.items.length + 1;
  todos.items.push({"id": i, "item": req.body.item, "complete": false});
  res.redirect('/index');
});

app.get("/complete/:id",function (req,res) {
  todos.items[req.params.id -1]. complete =true;
  res.redirect('/index');
});


app.listen(3000, function () {
  console.log("App is running on localhost 3000");
});
