const express = require("express");
const { allowedOrigins } = require("../config/allowedOrigins");

export const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if ((allowedOrigins.includes(origin))) {
        res.header("Access-Control-Allow-Credentials", "true");
    }

    next();
}
