const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//jwttoken - token creator
//cookieparser - token saver in cookies

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const isUserAlreadyExists = await userModel.findOne({
            email: normalizedEmail
        });

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPasssword
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({
            email: email.trim().toLowerCase()
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function registerFoodPartner(req, res) {
    try {
        const { businessName, email, password, phone, address, contactName } = req.body;

        if (!businessName?.trim() || !email?.trim() || !password || !phone?.trim() || !address?.trim() || !contactName?.trim()) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const isAccountAlreadyExists = await foodPartnerModel.findOne({
            email: normalizedEmail
        });

        if (isAccountAlreadyExists) {
            return res.status(400).json({
                message: "Food partner account already exists"
            });
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            businessName: businessName.trim(),
            email: normalizedEmail,
            password: hashedPasssword,
            phone: phone.trim(),
            address: address.trim(),
            contactName: contactName.trim()
        });

        const token = jwt.sign({
            id: foodPartner._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                businessName: foodPartner.businessName,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function loginFoodPartner(req, res) {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const foodPartner = await foodPartnerModel.findOne({
            email: email.trim().toLowerCase()
        })
        if (!foodPartner) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        res.status(200).json({
            message: "Food partner logged in successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                businessName: foodPartner.businessName,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

async function getCurrentUser(req, res) {
    res.status(200).json({
        message: "User is authenticated",
        user: {
            _id: req.user._id,
            email: req.user.email,
            fullName: req.user.fullName
        }
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,

    getCurrentUser
}