const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

const apiRoutes = require('./api-routes');

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

const dbURI =
	'mongodb://mweglarz:jadlbymkapuste88@ds125125.mlab.com:25125/shopping-cart';
mongoose.connect(dbURI, { useNewUrlParser: true }, err => {
	if (err) {
		console.log('Some problem with the connection ' + err);
	} else {
		console.log('The Mongoose connection is ready');
	}
});
let db = mongoose.connection;

let port = process.env.PORT || 8080;
app.get('/', (req, res) => {
	res.send('This is the entry point for backend of shopping cart');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
