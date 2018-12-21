const router = require("express").Router();
chineseZodiacsRoutes = require("./chineseZodiacs.routes");
module.exports = router;

router.use("/api/chineseZodiacs", chineseZodiacsRoutes);
