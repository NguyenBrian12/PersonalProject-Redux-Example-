const router = require("express").Router();

const validateBody = require("../filters/validate.body");
const ChineseZodiacs = require("../models/chineseZodiacs");
const chineseZodiacsController = require("../controllers/chineseZodiacs.controller");
module.exports = router;

router.get("/:id(\\d+)", chineseZodiacsController.getById);

router.post("/", validateBody(ChineseZodiacs), chineseZodiacsController.post);
router.put(
  "/:id(\\d+)",
  validateBody(ChineseZodiacs),
  chineseZodiacsController.put
);
router.delete("/:id(\\d+)", chineseZodiacsController.del);
router.get(
  "/:year(\\d+)/:month(\\d+)/:day(\\d+)/",
  chineseZodiacsController.getZodiac
);
router.get("/webScrapper", chineseZodiacsController.getWebScrapper);
