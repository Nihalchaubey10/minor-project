require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const db = require('./connections/config');
const schemas = require('./models/model');

const contactSchema = schemas.contact;
const orderSchema = schemas.order;

const Contact = new mongoose.model("Contact", contactSchema);
const Order = new mongoose.model("Order", orderSchema);

let successMessage;
let orderMessage;
app.get("/", function (req, res) {
    res.render('home', { message: successMessage });
});

app.get("/order", function (req, res) {
    res.render('order', {message: orderMessage});
});

app.post("/", function(req, res) {
    const name = req.body.username;
    const email = req.body.userEmail;
    const phone = req.body.userContact;
    const message = req.body.userMessage;
    const newContact = new Contact({ name: name, email: email, phone: phone, message: message });
    newContact.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            successMessage = "Added Successfully!";
            res.render('home', { message: successMessage });
            successMessage = "";
        }
    });
});

app.post("/order", function(req, res) {
    const burgerChecked = req.body.burgerCheckbox;
    const pizzaChecked = req.body.pizzaCheckbox;
    const momosChecked = req.body.momosCheckbox;
    const idliChecked = req.body.idliCheckbox;
    const dosaChecked = req.body.dosaCheckbox;
    const littisChecked = req.body.littiCheckbox;
    let noOfBurgers = req.body.userBurger;
    let noOfPizza = req.body.userPizza;
    let noOfMomos = req.body.userMomos;
    let noOfIdli = req.body.userIdli;
    let noOfDosa = req.body.userDosa;
    let noOfLittis = req.body.userLitti;
    const name = req.body.userName;
    const phone = req.body.userPhone;
    const address = req.body.userAddress;
    const newOrder = new Order({ name: name, phone: phone, address: address });
    if(burgerChecked === undefined) noOfBurgers = 0;
    if(pizzaChecked === undefined) noOfPizza = 0;
    if(momosChecked === undefined) noOfMomos = 0;
    if(idliChecked === undefined) noOfIdli = 0; 
    if(dosaChecked === undefined) noOfDosa = 0;
    if(littisChecked === undefined) noOfLittis = 0;
    const orderObject = {
        burgers: noOfBurgers, pizzas: noOfPizza, momos: noOfMomos,
        idli: noOfIdli, dosa: noOfDosa, littis: noOfLittis
    };
    newOrder.order.push(orderObject);
    newOrder.save((err) => {
        if(err) {
            console.log(err);
        } else {
            orderMessage = "Added Successfully!";
            res.render("order", { message: orderMessage });
            orderMessage = "";
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server is started on PORT ${PORT}.`);
});