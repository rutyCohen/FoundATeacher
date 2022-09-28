const express = require('express');
const app = express();
require('./DB/connection');
const { ENVIRONMENT, PORT } = require('./config');
const logconfig = require('./Logger/configuration');
const winston = require('winston')
const logger = winston.createLogger(logconfig);

const user = require('./Router/userRoute');
const areas = require('./Router/areasRoute')
const institution = require('./Router/institutionRoute')
const path = require('path')
const cors = require('cors');

app.use(express.json());
app.use(express.static('./Static'));

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/api/user', user);
app.use('/api/areas', areas);
app.use('/api/institution', institution);

app.use((err, req, res, next) => {
    if (ENVIRONMENT == 'development')
        logger.error(err.message)
    if (err.message == 'user validation failed: email: please enter a valid email')
        res.status(400).send(err.message)
    else
        res.status(500).send(err.message)
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './Static/Html/404.html'));

});

app.listen(PORT, () => logger.info(`server is running on port ${PORT}`));




