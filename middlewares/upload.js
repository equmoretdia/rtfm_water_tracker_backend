import multer from 'multer';
import * as path from 'node:path';
import * as crypto from 'node:crypto';

const storage = multer.diskStorage ({
    destination(req, file, callback) {
        callback(null, path.join(process.cwd(), 'tmp'));
    }, 
    filename(req, file, callback) {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID(); 
        callback(null, `${basename}-${suffix}${extname}`);
    }
});

const upload = multer({ storage });

export default upload;