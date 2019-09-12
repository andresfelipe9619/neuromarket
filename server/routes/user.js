const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const ObjectId = require('mongodb').ObjectID;

const User = require('../models/user');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/users', verificaToken, (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    user.find({ state: true }, 'name email role state google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            user.count({ state: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });


});

app.post('/users', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        phone: body.phone,
        interestCategories: body.interestCategories
    });


    user.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: usuarioDB
        });


    });


});

app.put('/user/:id', function(req, res) {

    let id = ObjectId(req.params.id);
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    user.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            user: usuarioDB
        });

    })

});

app.delete('/user/:id', [verificaToken, verificaAdmin_Role], function(req, res) {


    let id = req.params.id;

    // user.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        state: false
    };

    user.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            user: usuarioBorrado
        });

    });



});



module.exports = app;