const express = require('express');
const variatControllers = require("../controllers/variantControllers");
const router = express.Router();


//get all variants
router.route("/getAllVariants").get(variatControllers.getAllVariants)
//get variant by id
router.route("/getVariantById/:id").get(variatControllers.getVariantById)
//create new variant
router.route("/createVariant").post(variatControllers.createVariant)
//update variant
router.route("/updateVariantById/:id").put(variatControllers.updateVariantById)
//delete variant
router.route("/deleteVariant/:id").delete(variatControllers.deleteVariantById)


module.exports = router;