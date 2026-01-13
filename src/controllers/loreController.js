import { loreService } from "../services/loreService.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";

 console.log("IN LORECONTROLLER !")
 
export const loreController = {
    
    async createCreature(req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await loreService.createCreature({
                name:req.body.name,
                origine:req.body.origine,
                creatorId: req.user.id
            });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    },

    async showCreature (req, res, next) {
        try {
            const result = await loreService.showCreature(req.params.id);
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

    async createTestimony (req, res, next) {
        console.log("req body", req.body)
        try {
            const result = await loreService.createTestimony({
                creatureId: req.body.creatureId,
                authorId: req.user.id,
                description: req.body.description,
            });
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }        
    },


         
    async validateTestimony (req, res, next) {
    console.log("salut !")
        try {
            const result = await loreService.validateTestimony(req.params.id, req.body, req.user.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
  },

  async rejectTestimony (req, res, next) {
    console.log("salut !")
        try {
            const result = await loreService.rejectTestimony(req.params.id, req.body, req.user.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
  },
}