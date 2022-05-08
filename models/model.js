const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema ({
    name: String,
    email: String,
    phone: String,
    message: String
});

const orderSchema = new mongoose.Schema ({
    name: String,
    phone: String,
    address: String,
    order: [{
        burgers: String,
        pizzas: String,
        momos: String,
        idli: String,
        dosa: String,
        littis: String
    }]
});

exports.contact = contactSchema;
exports.order = orderSchema;