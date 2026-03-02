const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ override: true });

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectToMongoDB() {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

app.use(async (req, res, next) => {
    try {
        await connectToMongoDB();
        next();
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/returns', require('./routes/returns'));
app.use('/api/warehouses', require('./routes/warehouses'));
app.use('/api/demo', require('./routes/demo'));

app.get('/', (req, res) => {
    res.json({ message: 'Reverse Logistics API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
