import { createServer } from 'https';
import sirv  from 'sirv';
import sslOptions from './ssl_options';
import currentDir from './current_dir';

const server = createServer(sslOptions, (req, res) => {
	res.addListener('finish', () => {
		const ip = req.connection.remoteAddress?req.connection.remoteAddress:'0.0.0.0';
		console.log('access', ip, res.statusCode, req.url); 
	});

	sirv(currentDir+'/../client')(req, res);
});

console.log('running server at https://127.0.0.1:8000/');
server.listen(8000, '0.0.0.0');
