const express = require("express");
let app = express();

let Contact = require("../models/contact");
// ===========================
//  Obtener products
// ===========================
app.get("/contact", (req, res) => {
    const { query } = req;

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Contact.find({ categoryId: query.category })
        .skip(desde)
        .limit(40)
        // .populate('user', 'name email')
        // .populate('category', 'description')
        .exec((err, contact) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                contact
            });
        });
});
// ===========================
//  Crear un nuevo Contacto
// ===========================
app.post("/contact", (req, res) => {
    let body = req.body;

    let contact = new Contact({
        name: body.name,
        lastname: body.lastname,
        description: body.description,
        email: body.email,
    });

    console.log(contact);


    contact.save((err, contactDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!contactDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            contact: contactDB
        });
    });
});

module.exports = app;