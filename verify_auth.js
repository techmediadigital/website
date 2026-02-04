const http = require('http');

const data = JSON.stringify({
    username: 'techmediadigital.com',
    password: 'techmedia321'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        try {
            const json = JSON.parse(responseData);
            if (json.token) {
                console.log('Login Successful! Token received.');
            } else {
                console.log('Login Failed:', json);
            }
        } catch (e) {
            console.log('Error parsing response:', e.message);
            console.log('Raw Response:', responseData);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
