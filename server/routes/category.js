const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let category = require('../models/category');

// ============================
// Mostrar todas las categorias
// ============================
app.get('/category', verificaToken, (req, res) => {

    category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        })
});

// ============================
// Mostrar una category por ID
// ============================
app.get('/category/:id', verificaToken, (req, res) => {
    // category.findById(....);

    let id = req.params.id;

    category.findById(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            category: categoriaDB
        });

    });


});

// ============================
// Crear nueva category
// ============================
app.post('/category', verificaToken, (req, res) => {
    // regresa la nueva category
    // req.user._id
    let body = req.body;

    let category = new category({
        description: body.description,
        user: req.user._id
    });


    category.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoriaDB
        });


    });


});

// ============================
// Mostrar todas las categorias
// ============================
app.put('/category/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        description: body.description
    };

    category.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoriaDB
        });

    });


});

// ============================
// Mostrar todas las categorias
// ============================
app.delete('/category/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador puede borrar categorias
    // category.findByIdAndRemove
    let id = req.params.id;

    category.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'category Borrada'
        });

    });


});


module.exports = app;