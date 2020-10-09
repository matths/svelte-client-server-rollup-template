import path from 'path';
import fs from 'fs';

export default path.dirname(fs.realpathSync(__filename));
