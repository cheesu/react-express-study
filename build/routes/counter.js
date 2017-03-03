'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = counter;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function counter(data) {

    function getIP(req) {
        return req.connection.remoteAddress.split(":").pop();
    }

    var router = _express2.default.Router();

    router.post('/', function (req, res) {
        console.log(_colors2.default.green('[INC]'), ++data.number, getIP(req));
        return res.json({ number: data.number });
    });

    router.get('/', function (req, res) {
        console.log(_colors2.default.yellow('[REQ]'), data.number, getIP(req));
        return res.json({ number: data.number });
    });

    return router;
}