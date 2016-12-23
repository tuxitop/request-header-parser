/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Tuxitop request header parser microservice',
                          baseURL: req.get('host')});
});

module.exports = router;
