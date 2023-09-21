import { Router } from "express";

const router = Router();

router.app.get('/products', async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit)) {
    const limitedProducts = NewProductManager.getProducts().slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(NewProductManager.getProducts());
  }
});

export default router;
