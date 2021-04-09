const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
	const primernombre = req.body.nombre;
	const apellido = req.body.apellido;
	const correo = req.body.correo;

	const data = {
		members: [
			{
				email_address: correo,
				status: 'subscribed',
				merge_fields: {
					FNAME: primernombre,
					LNAME: apellido,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = 'https://us1.api.mailchimp.com/3.0/lists/a9faa84fbb';

	const options = {
		method: 'POST',
		auth: 'davidperjac:f70dc67bb6534b0cf795da4c1f563682-us1',
	};

	const request = https.request(url, options, function (response) {
		if (response.statusCode == 200) {
			res.sendFile(__dirname + '/success.html');
		} else {
			res.sendFile(__dirname + '/failure.html');
		}

		response.on('data', function (data) {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.post('/failure', function (req, res) {
	res.redirect('/');
});

app.post('/success', function (req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT, function () {
	console.log('Estoy funcionando en el Puerto ');
});

// f70dc67bb6534b0cf795da4c1f563682-us1

// a9faa84fbb
