const normas = require("../models/normasModel.js");

exports.listarNormas = (req, res) => {
    res.json(normas);
};

exports.adicionarNorma = (req, res) => {res.send("adicionarNorma")};

exports.buscarNormaPorNumero = (req, res) => {}; //faço por ID, por nome ou por todos os campos?

exports.modificarNorma = (req, res) => {};

exports.excluirNorma = (req, res) => {};

exports.verPDF = (req, res) => {};

