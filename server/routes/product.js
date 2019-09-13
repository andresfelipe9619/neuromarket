const express = require("express");

const { verificaToken } = require("../middlewares/autenticacion");

let app = express();
let Producto = require("../models/product");

// ===========================
//  Obtener products
// ===========================
app.get("/products", (req, res) => {
  const { query } = req;

  let desde = query.desde || 0;
  desde = Number(desde);

  Producto.find(query.category && { category: query.category })
    .skip(desde)
    .limit(100)
    // .populate('user', 'name email')
    // .populate('category', 'description')
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        products
      });
    });
});

// ===========================
//  Obtener un product por ID
// ===========================
app.get("/products/:id", (req, res) => {
  // populate: user category
  // paginado
  let id = req.params.id;

  Producto.findById(id)
    // .populate('user', 'name email')
    // .populate('category', 'name')
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
            message: "ID no existe"
          }
        });
      }

      res.json({
        ok: true,
        product: productoDB
      });
    });
});

// ===========================
//  Search products
// ===========================
app.get("/products/search/:termino", (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, "i");

  Producto.find({ name: regex }).exec((err, products) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      products
    });
  });
});

// ===========================
//  Crear un nuevo product
// ===========================
app.post("/products", (req, res) => {
  let body = req.body;

  let product = new Producto({
    name: body.name,
    price: body.price,
    description: body.description,
    availability: body.availability,
    category: body.category
  });

  product.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.status(201).json({
      ok: true,
      product: productoDB
    });
  });
});

// ===========================
//  Actualizar un product
// ===========================
app.put("/products/:id", verificaToken, (req, res) => {
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
          message: "El ID no existe"
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
        product: productoGuardado
      });
    });
  });
});

// ===========================
//  Borrar un product
// ===========================
app.delete("/products/:id", verificaToken, (req, res) => {
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
          message: "ID no existe"
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
        product: productoBorrado,
        mensaje: "Producto borrado"
      });
    });
  });
});

module.exports = app;
