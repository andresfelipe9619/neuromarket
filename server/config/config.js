// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 4000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = "48h";

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB =
    "mongodb://superAdmin:superadmin123@ds347665.mlab.com:47665/neuromarket";
} else {
  urlDB = "mongodb://localhost:27017/neuromarket";
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "219758474264-vh1bibcphgvbc32km508lubtqkanikf1.apps.googleusercontent.com";
