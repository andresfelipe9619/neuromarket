const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Address = require('../models/address');


// ===========================
//  Obtener addresses
// ===========================
app.get('/addresses', (req, res) => {
    // trae todos los addresses
    // populate: user category
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Address.find()
        .skip(desde)
        .limit(5)
        // .populate('user', 'name email')
        // .populate('category', 'description')
        .exec((err, addresses) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                addresses
            });


        })

});

// ===========================
//  Obtener un address por ID
// ===========================
app.get('/addresses/:id', (req, res) => {
    // populate: user category
    // paginado
    let id = req.params.id;

    Address.findById(id)
        // .populate('user', 'name email')
        // .populate('category', 'name')
        .exec((err, addressDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!addressDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                address: addressDB
            });

        });

});

// ===========================
//  Search addresses
// ===========================
app.get('/addresses/search/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Address.find({ name: regex })
        .populate('category', 'name')
        .exec((err, addresses) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                addresses
            })

        })


});



// ===========================
//  Crear un nuevo address
// ===========================
app.post('/addresses', (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let body = req.body;

    let address = new Address({
        "user": body.user,
        "city": body.city,
        "state": body.state,
        "address": body.address,
        "zip": body.zip,
        "country": body.country
    });

    address.save((err, addressDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            address: addressDB
        });

    });

});

// ===========================
//  Actualizar un address
// ===========================
app.put('/addresses/:id', verificaToken, (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let id = req.params.id;
    let body = req.body;

    Address.findById(id, (err, addressDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!addressDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        addressDB.name = body.name;
        addressDB.price = body.price;
        addressDB.category = body.category;
        addressDB.availability = body.availability;
        addressDB.description = body.description;

        addressDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                address: productoGuardado
            });

        });

    });


});

// ===========================
//  Borrar un address
// ===========================
app.delete('/addresses/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Address.findById(id, (err, addressDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!addressDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        addressDB.availability = false;

        addressDB.save((err, deletedAddress) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                address: deletedAddress,
                mensaje: 'Address borrado'
            });

        })

    })


});






module.exports = app;