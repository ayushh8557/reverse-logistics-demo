const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ override: true });
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

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
