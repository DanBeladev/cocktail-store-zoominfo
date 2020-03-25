import express from "express";
import products from "../controllers/productsController";

const router = express.Router();

router.get("/",products.getProductsFromMemory)

module.exports = router;
