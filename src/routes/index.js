const router = require('express').Router();

router.use("/blogs", require("./blogs"));

module.exports = router;