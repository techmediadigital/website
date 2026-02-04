const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/items',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const items = JSON.parse(data);
            const services = items.filter(i => i.type === 'service');
            const products = items.filter(i => i.type === 'product');
            console.log(`Total Items: ${items.length}`);
            console.log(`Services: ${services.length}`);
            console.log(`Products: ${products.length}`);
            console.log('--- Products List ---');
            products.forEach(p => console.log(`- [${p.id}] ${p.title}`));
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw Data:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
