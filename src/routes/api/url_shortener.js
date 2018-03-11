const router = require("express").Router();
const urlShortener = require("../../middlewares/url_shortener_middleware");

router.post("/short-url", urlShortener.createShortUrl);
router.get("/long-url", urlShortener.getLongUrl);

module.exports = router;
