import express from "express";
import { selectCategories } from "../repositories/categoriesRepository.js";
import { authenticationService } from "../services/authenticationService.js";
const Router = express.Router();

Router.get('/', authenticationService, async (req, res) => {
    const categories = await selectCategories();
    return res.status(200).json({
        categories
    })
})


export { Router }
