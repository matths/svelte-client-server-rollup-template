import fs from 'fs';
import path from 'path';
import currentDir from './current_dir';

const key = fs.readFileSync(path.join(currentDir, 'ssl/private/server.key'));
const cert = fs.readFileSync(path.join(currentDir, 'ssl/certs/server.crt'));

export default {
	key: key,
	cert: cert,
	requestCert: false,
	rejectUnauthorized: false
};
