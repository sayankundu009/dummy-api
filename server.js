const dotenv = require('dotenv');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { responsehelpers } = require('./src/middlewares/helpers');
const routes = require('./src/routes');

// Env
dotenv.config();

const {
    PORT = 5000, 
    SWAGGER_DOC_URL = "/docs", 
    API_BASE_URL = "/v1/api"
} = process.env;

const app = express();

// Middlewares
app.use(responsehelpers);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Routes
app.use(API_BASE_URL, routes);
app.get('/', (req, res) => {
    res.redirect(`http://localhost:${PORT}${SWAGGER_DOC_URL}`)
});

// Swagger
app.use(SWAGGER_DOC_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
});