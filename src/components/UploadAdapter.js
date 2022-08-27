/*
import { storageService } from "../firebase";
import {v4 as uuidv4} from 'uuid';
import { faSave } from "@fortawesome/free-solid-svg-icons";

class UploadAdapter {
    //생성자 클래스 정의
    // constructor(loader) {
    //     this.loader = loader;
    // }

    constructor(loader, title, index) {
        this.loader = loader;
        this.title = title;
        this.index = index;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            console.log(file.name)
            const theFile = file; 
            console.log(theFile)
            const reader = new FileReader();

            let imageUrl="";
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                imageUrl = result;
                
                let attachmentUrl = "";
                if (imageUrl !== "") {
                    console.log("사진저장")
                    console.log(this.title)
                    const attachmentRef = storageService
                        .ref()
                        .child(`${this.title}/${uuidv4()}`);
                    console.log(attachmentRef.fullPath)
                    const response = attachmentRef.putString(imageUrl, "data_url");
                    // console.log(response)
                    // console.log(response.ref)
                    // attachmentUrl = response.ref.getDownloadURL();
                    // console.log(attachmentUrl);
                }
            };
            reader.readAsDataURL(theFile);

            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        })))
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        console.log(xhr)
        xhr.open('GET', '/getimage', true);
        //xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '파일을 업로드 할 수 없습니다.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if(!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve({
                default: response.url //업로드된 파일 주소
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('upload',file)
        this.xhr.send(data)
    }
}

export default UploadAdapter;
*/

import { storageService } from "../firebase";
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