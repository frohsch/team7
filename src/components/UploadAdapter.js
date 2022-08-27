// class UploadAdapter {
//     //생성자 클래스 정의
//     constructor(loader) {
//         this.loader = loader;
//     }

//     // Starts the upload process.
//     upload() {
//         return this.loader.file.then( file => new Promise(((resolve, reject) => {
//             this._initRequest();
//             this._initListeners( resolve, reject, file );
//             this._sendRequest( file );
//         })))
//     }

//     // Aborts the upload process.
//     abort() {
//         if ( this.xhr ) {
//             this.xhr.abort();
//         }
//     }

//     _initRequest() {
//         const xhr = this.xhr = new XMLHttpRequest();
//         xhr.open('POST', 'http://localhost:3000/getimage', true);
//         xhr.responseType = 'json';
//     }

//     _initListeners(resolve, reject, file) {
//         const xhr = this.xhr;
//         const loader = this.loader;
//         const genericErrorText = '파일을 업로드 할 수 없습니다.'

//         xhr.addEventListener('error', () => {reject(genericErrorText)})
//         xhr.addEventListener('abort', () => reject())
//         xhr.addEventListener('load', () => {
//             const response = xhr.response
//             if(!response || response.error) {
//                 return reject( response && response.error ? response.error.message : genericErrorText );
//             }

//             resolve({
//                 default: response.url //업로드된 파일 주소
//             })
//         })
//     }

//     _sendRequest(file) {
//         const data = new FormData()
//         data.append('upload',file)
//         this.xhr.send(data)
//     }
// }

import {storageService} from "../firebase_";
import {v4 as uuidv4} from 'uuid';

class UploadAdapter {
	constructor(loader, t) {
		this.loader = loader;
		this.t = t;
	}

	upload() {
		var urlData = null;
		let attachmentUrl = "";

		return new Promise((resolve, reject) => {
			const reader = this.reader = new FileReader();

			reader.onload = function () {
				resolve({default: reader.result});
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
				reader.addEventListener("loadend", (event) => {
					console.log(event.target.result);
					urlData = event.target.result;
				});
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