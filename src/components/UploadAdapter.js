import { storageService } from 'firebase_';
import {v4 as uuidv4} from 'uuid';

class UploadAdapter {
	constructor(loader, title, index) {
        this.loader = loader;
        this.title = title;
        this.index = index;
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

            // console.log(file.name)
            // const theFile = file; 
            // console.log(theFile)
            // const reader = new FileReader();

            let imageUrl="";
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                imageUrl = result;
                console.log(imageUrl)
                let attachmentUrl = "";
                if (imageUrl !== "") {
                    const attachmentRef = storageService
                        .ref()
                        .child(`${this.title}/${uuidv4()}`);
                    const response = attachmentRef.putString(imageUrl, "data_url");
                    //console.log(response.ref.imageUrl);
                    // console.log(response.ref)
                    // attachmentUrl = response.ref.getDownloadURL();
                    // console.log(attachmentUrl);
                }
                // reader.readAsDataURL();
            };

			this.loader.file.then(file => {
                console.log("this.loader.file")
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