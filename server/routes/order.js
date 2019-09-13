const express = require("express");

const { verificaToken } = require("../middlewares/autenticacion");

let app = express();
let Order = require("../models/order");
let Address = require("../models/address");
let OrderItem = require("../models/orderItem");

// ===========================
//  Obtener orders
// ===========================
app.get("/orders", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Order.find()
    .skip(desde)
    .limit(5)
    .populate("user", "name email")
    .exec((err, orders) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        orders
      });
    });
});

// ===========================
//  Obtener un order por ID
// ===========================
app.get("/orders/:id", (req, res) => {
  let id = req.params.id;

  Order.findById(id)
    .populate("user", "name email")
    .exec((err, orderDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!orderDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "ID no existe"
          }
        });
      }

      res.json({
        ok: true,
        order: orderDB
      });
    });
});

// ===========================
//  Search orders
// ===========================
app.get("/orders/search/:termino", verificaToken, (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  Order.find({ name: regex })
    .populate("category", "name")
    .exec((err, orders) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        orders
      });
    });
});

// ===========================
//  Crear un nuevo order
// ===========================
app.post("/orders", (req, res) => {
  let body = req.body;

  let order = new Order({
    user: body.user,
    address: body.address,
    products: body.products
  });

  order.save((err, orderDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.status(201).json({
      ok: true,
      order: orderDB
    });
  });
});

// ===========================
//  Actualizar un order
// ===========================
app.put("/orders/:id", verificaToken, (req, res) => {
  // grabar el user
  // grabar una category del listado

  let id = req.params.id;
  let body = req.body;

  Order.findById(id, (err, orderDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!orderDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no existe"
        }
      });
    }

    orderDB.name = body.name;
    orderDB.price = body.price;
    orderDB.category = body.category;
    orderDB.availability = body.availability;
    orderDB.description = body.description;

    orderDB.save((err, productoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        order: productoGuardado
      });
    });
  });
});

// ===========================
//  Borrar un order
// ===========================
app.delete("/orders/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Order.findById(id, (err, orderDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!orderDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID no existe"
        }
      });
    }

    orderDB.availability = false;

    orderDB.save((err, deletedOrder) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        order: deletedOrder,
        mensaje: "Order borrado"
      });
    });
  });
});

module.exports = app;
