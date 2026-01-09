import { authService } from "../services/authService.js";

export const authController = {
    async createUser(req, res, next) {
        try {
            const createUser = await userService.createUser(req.body || {});
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

  async login (req, res, next) {
  },

    async me(req, res, next) {
        try {
            const result = await authService.showUser(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async indexUser(req, res, next) {
        console.log("IN INDEXUSER !")
        try {
            const result = await userService.indexUsers({ search: req.query.search });
            res.json(result);
        } catch (err) {
        next(err);
        }
    },

    async patchRole (req, res, next) {
    try {
      const user = await userService.patchUser(req.params.id, req.body || {});
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
}