const chineseZodiacsService = require("../services/chineseZodiacs.service");
const responses = require("../models/responses/index");
const getZodiac = (req, res) => {
  console.log(req.params.year);
  chineseZodiacsService
    .getZodiac(req.params.year, req.params.month, req.params.day)
    .then(item => {
      console.log(item);
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const getWebScrapper = (req, res) => {
  chineseZodiacsService
    .getWebScrapper()
    .then(item => {
      console.log(item);
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const getById = (req, res) => {
  chineseZodiacsService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const post = (req, res) => {
  console.log(req);
  console.log(req.model);
  chineseZodiacsService
    .post(req.model)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const put = (req, res) => {
  chineseZodiacsService
    .put(req.model)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const del = (req, res) => {
  chineseZodiacsService
    .del(req.params.id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  getZodiac,
  getWebScrapper,
  getById,
  post,
  put,
  del
};
