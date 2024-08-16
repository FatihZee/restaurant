const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const pembeliRoutes = require('./routes/pembeliRoutes');
const authRoutes = require('./routes/authRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes'); // Import transaksi routes
const midtransRoutes = require('./routes/midtransRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();


// Initialize Sequelize
const sequelize = new Sequelize('mydatabase', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
            description: 'API documentation for my application',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use(menuRoutes);
app.use(pembeliRoutes);
app.use(authRoutes);
app.use(transaksiRoutes); // Use transaksi routes
app.use(midtransRoutes);

// Connect to database and start server
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Swagger UI is available on http://localhost:${PORT}/api-docs`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
