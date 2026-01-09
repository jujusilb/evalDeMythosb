import { loreService } from "../services/loreService.js";
 console.log("IN LORECONTROLLER !")
 
export const loreController = {
    async showCreature (req, res, next) {
        try {
            const result = await loreService.showUser(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    },

    async indexCreature(req, res, next) {
        try {
            const result = await loreService.indexCreatures(req.query || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },


  async creatureAbout (req, res, next) {
    try {
      const result = await loreService.showTestimony(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

    async createCreature(req, res, next) {
        try {
            const createUser = await loreService.createCreature(req.body || {});
            res.status(201).json(creature);
        } catch (err) {
            next(err);
        }
    },
    async indexTestimony (req, res, next) {
        try {
            const result = await loreService.indexTestimony(req.query || {});
            res.json(result);
        } catch (err) {
            next(err);
        }
    },


  async validateTestimony (req, res, next) {
  },

  async rejectTestimony (req, res, next) {
  }
}