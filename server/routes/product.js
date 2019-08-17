const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/product');


// ===========================
//  Obtener productos
// ===========================
app.get('/productos', (req, res) => {
    // trae todos los productos
    // populate: user category
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ availability: true })
        .skip(desde)
        .limit(5)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });


        })

});

// ===========================
//  Obtener un producto por ID
// ===========================
app.get('/productos/:id', (req, res) => {
    // populate: user category
    // paginado
    let id = req.params.id;

    Producto.findById(id)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});

// ===========================
//  Buscar productos
// ===========================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ name: regex })
        .populate('category', 'name')
        .exec((err, productos) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })

        })


});



// ===========================
//  Crear un nuevo producto
// ===========================
app.post('/productos', verificaToken, (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let body = req.body;

    let producto = new Producto({
        user: req.user._id,
        name: body.name,
        price: body.price,
        description: body.description,
        availability: body.availability,
        category: body.category
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

});

// ===========================
//  Actualizar un producto
// ===========================
app.put('/productos/:id', verificaToken, (req, res) => {
    // grabar el user
    // grabar una category del listado 

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.name = body.name;
        productoDB.price = body.price;
        productoDB.category = body.category;
        productoDB.availability = body.availability;
        productoDB.description = body.description;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            });

        });

    });


});

// ===========================
//  Borrar un producto
// ===========================
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.availability = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });

        })

    })


});






module.exports = app;