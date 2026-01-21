const express = require('express');
const router = express.Router();
const getCustomMulter = require('../utils/customMulter');
const TryOnController = require('../controllers/TryOnController/VirtualTryOn');
const upload = getCustomMulter('tryon');

/* ----------------------- ACCESSORY ----------------------- */
router.post('/tryonKey', TryOnController.storeTryonKey);
router.post('/tryon-accessory', TryOnController.tryOnAccessory);
router.post('/tryon-jewelry', TryOnController.tryOnJewelry);
router.post('/tryon-bag', TryOnController.tryOnBag);
router.post('/tryon-clothes', TryOnController.tryOnClothes);
router.post('/tryon-shoes', TryOnController.tryOnShoes);
router.post('/tryon-image', TryOnController.uploadMiddleware, TryOnController.uploadImage);
module.exports = router;
