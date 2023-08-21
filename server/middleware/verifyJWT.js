const express = require("express");
const { ValidateToken } = require("utils");

export function CheckAuthorization(req, res, next) {
    const token = req.headers["authorization"];
    if (!token?.startsWith("Bearer ")) return res.sendStatus(401);

    const user = ValidateToken(token);

    // Invalid token
    if (!user) {
        return res.sendStatus(403);
    }

    req.user = user.UserInfo.username;
    req.roles = user.UserInfo.roles;
    next();
    return;
}