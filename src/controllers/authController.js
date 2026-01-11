import { authService } from "../services/authService.js";

export const authController = {
    async register(req, res, next) {
        try {
            const user = await authService.register(req.body || {});
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async me(req, res, next) {
        try {
            res.json({ user: req.user });
        } catch (err) {
            next(err);
        }
    },

    async indexUsers(req, res, next) {
        try {
            const result = await authService.indexUsers({ search: req.query.search });
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async patchRole(req, res, next) {
        try {
            const user = await authService.patchRole(req.params.id, req.body || {});
            res.json(user);
        } catch (err) {
            next(err);
        }
    },
};