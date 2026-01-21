const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();
const TryonKey = require('../../models/TryonKey')
const getCustomMulter = require('../../utils/customMulter')

const getTryonKey = async () => {
    const keyDoc = await TryonKey.findOne();
    return keyDoc?.serverKey || null;
};


exports.getTryOnResult = (req, res) => {
    try {
        // Dummy response data
        const response = {
            success: true,
            message: "Shoes try-on result received successfully.",
            data: "https://40e507dd0272b7bb46d376a326e6cb3c.cdn.bubble.io/f1762771571370x115021385705457840/output_0.png"
        };

        // Return response
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error in try-on controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.tryOnClothes = async (req, res) => {
    try {

        const apiKey = await getTryonKey();
        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "Server Failure"
            });
        }

        // console.log("Using Tryon API Key:", apiKey);
        const {
            model_photo,
            clothing_photo,
            ratio = "auto",
            prompt = "fit the image on my model",
        } = req.body;

        // Basic validation
        if (!model_photo || !clothing_photo) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }
        const formData = new FormData();
        formData.append("model_photo", model_photo);
        formData.append("clothing_photo", clothing_photo);
        formData.append("ratio", ratio);
        formData.append("prompt", prompt);

        const response = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto_stream?api_key=${apiKey}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Try-on error:", error?.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Virtual try-on failed",
            error: error?.response?.data || error.message,
        });
    }
};

exports.tryOnJewelry = async (req, res) => {
    try {

        const apiKey = await getTryonKey();
        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "Server Failure"
            });
        }

        const {
            model_photo,
            jewelry_photo,
            description,
        } = req.body;

        // Validation
        if (!model_photo || !jewelry_photo || !description) {
            return res.status(400).json({
                success: false,
                message: "model_photo, jewelry_photo, and description are required",
            });
        }

        const formData = new FormData();
        formData.append("model_photo", model_photo);
        formData.append("jewelry_photo", jewelry_photo);
        formData.append("description", description);

        const response = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto-jewelry?api_key=${apiKey}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Jewelry try-on error:", error?.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Jewelry try-on failed",
            error: error?.response?.data || error.message,
        });
    }
};

exports.tryOnBag = async (req, res) => {
    try {
        const apiKey = await getTryonKey();
        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "Server Failure"
            });
        }

        const {
            model_photo,
            bag_photo,
            description,
        } = req.body;

        // Validation
        if (!model_photo || !bag_photo || !description) {
            return res.status(400).json({
                success: false,
                message: "model_photo, bag_photo, and description are required",
            });
        }

        const formData = new FormData();
        formData.append("model_photo", model_photo);
        formData.append("bag_photo", bag_photo);
        formData.append("description", description);

        const response = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto-bag?api_key=${apiKey}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Bag try-on error:", error?.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Bag try-on failed",
            error: error?.response?.data || error.message,
        });
    }
};

exports.tryOnAccessory = async (req, res) => {
    try {
        const apiKey = await getTryonKey();
        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "Server Failure"
            });
        }

        const {
            model_photo,
            accessory_photo,
            description,
        } = req.body;

        // Validation
        if (!model_photo || !accessory_photo || !description) {
            return res.status(400).json({
                success: false,
                message: "model_photo, accessory_photo, and description are required",
            });
        }

        const formData = new FormData();
        formData.append("model_photo", model_photo);
        formData.append("accessory_photo", accessory_photo);
        formData.append("description", description);

        const response = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto-accessory?api_key=${apiKey}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Accessory try-on error:", error?.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Accessory try-on failed",
            error: error?.response?.data || error.message,
        });
    }
};

exports.tryOnShoes = async (req, res) => {
    try {
        const apiKey = await getTryonKey();
        if (!apiKey) {
            return res.status(400).json({
                success: false,
                message: "Server Failure"
            });
        }

        const {
            model_photo,
            shoes_photo,
        } = req.body;

        // Validation
        if (!model_photo || !shoes_photo) {
            return res.status(400).json({
                success: false,
                message: "model_photo and shoes_photo are required",
            });
        }

        const formData = new FormData();
        formData.append("model_photo", model_photo);
        formData.append("shoes_photo", shoes_photo);

        const response = await axios.post(
            `https://thenewblack.ai/api/1.1/wf/vto-shoes?api_key=${apiKey}`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                maxBodyLength: Infinity,
            }
        );

        return res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("Shoes try-on error:", error?.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message: "Shoes try-on failed",
            error: error?.response?.data || error.message,
        });
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: 'No file uploaded',
                data: null
            });
        }

        const BASE_URL = 'https://trymart.alphawizzserver.com:5009';
        const imageUrl = `${BASE_URL}/uploads/tryon/${req.file.filename}`;

        return res.status(200).json({
            status: true,
            message: 'Success',
            data: imageUrl
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message || 'Upload failed',
            data: null
        });
    }
};

exports.storeTryonKey = async (req, res) => {
    try {
        const { serverKey } = req.body

        if (!serverKey) {
            return res.status(400).json({
                status: false,
                message: 'serverKey is required'
            })
        }

        // Check if key already exists
        let key = await TryonKey.findOne()

        if (key) {
            // Update existing key
            key.serverKey = serverKey
            await key.save()

            return res.json({
                status: true,
                message: 'Tryon key updated successfully',
                data: key
            })
        }

        key = await TryonKey.create({ serverKey })

        res.status(201).json({
            status: true,
            message: 'Tryon key created successfully',
            data: key
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Server error',
            error: error.message
        })
    }
}



exports.uploadMiddleware = getCustomMulter('tryon').single('file');