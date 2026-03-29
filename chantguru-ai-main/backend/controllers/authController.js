const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// SIGNUP
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ USE MODEL HERE
        User.createUser(name, email, hashedPassword, (err) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ message: "User registered" });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    // ✅ USE MODEL HERE
    User.getUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0)
            return res.status(400).json({ message: "User not found" });

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    });
};