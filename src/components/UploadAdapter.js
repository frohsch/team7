import { storageService } from 'firebase_';
import {v4 as uuidv4} from 'uuid';

class UploadAdapter {
	constructor(loader, title) {
        this.loader = loader;
        this.title = title;
    }

	upload() {
		return new Promise((resolve, reject) => {
			const reader = this.reader = new FileReader();

			reader.onload = function () {
				resolve({ default: reader.result });
			};

			reader.onerror = function (error) {
				reject(error);
			};

			reader.onabort = function () {
				reject();
			};

			this.loader.file.then(file => {
				var size = 1024 * 1024;
				if (file.size > size) {
					reject('Image files can only be up to 1MB.');
					return;
				}

				reader.readAsDataURL(file);
				
				
			});
		});
	}

	abort() {
		if (this.reader) {
			this.reader.abort();
		}
	}
}

export default UploadAdapter;