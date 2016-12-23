/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();

router.get('/whoami', (req, res, next) => {
    let ip = req.ip;
    let os, lanuage;
    // test if there is an IPv6 string and trim it
    if (ip.indexOf(":") > -1) {
        ip = ip.split(":").reverse()[0];
    }
    try {
        os = req.headers['user-agent'].split(/[\(\)]/)[1] || "Unknown";
    } catch(e) {
        console.error(e);
        os = "Unknown";
    }
    try {
        language = req.headers['accept-language'].split(",")[0] || "Unknown";
    } catch(e) {
        console.error(e);
        language = "Unknown";
    }
    res.send({
        ipaddress: ip,
        language: language,
        software: os
    });
});

module.exports = router;
