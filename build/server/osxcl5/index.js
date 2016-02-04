//-----------------------------------
// Copyright(c) 2015 Neko
//-----------------------------------
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var connectHandler_1 = require('./connectHandler');
var socks5constant_1 = require('../../common/socks5constant');
var socks5Helper = require('../../common/socks5helper');
var addressHelper_1 = require('../lib/addressHelper');
function handleOSXSocks5(client, data, options) {
    let dst = socks5Helper.refineDestination(data);
    if (!dst)
        return false;
    if (addressHelper_1.isIllegalAddress(dst.addr)) {
        client.dispose();
        return true;
    }
    switch (dst.cmd) {
        case socks5constant_1.REQUEST_CMD.CONNECT:
            connectHandler_1.connect(client, data, dst, options);
            break;
        case socks5constant_1.REQUEST_CMD.BIND:
            break;
        case socks5constant_1.REQUEST_CMD.UDP_ASSOCIATE:
            break;
        default:
            return false;
    }
    return true;
}
exports.handleOSXSocks5 = handleOSXSocks5;
