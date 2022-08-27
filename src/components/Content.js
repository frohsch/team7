// import React, { Component } from 'react'; 
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));

// class Content extends Component {
//     constructor(props) {

//       super(props);

//       this.state = {
//         id: props.id,
//         content: props.content,
//         handleWYSIWYGInput: props.handleWYSIWYGInput,
//         editor: ClassicEditor
//       } 

//     } 

//     render() {
//         return (
//             <div className="Editor-content">
//                 <CKEditor
//                     editor={ this.state.editor }
//                     data={this.state.content}
//                     config={{ckfinder: {
//                       // Upload the images to the server using the CKFinder QuickUpload command.
//                       uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
//                     }}}
//                     onInit={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         //this.state.handleWYSIWYGInput(this.props.id, data);
//                         console.log( { event, editor, data } );
//                         console.log(this.state.content);
//                     } }
//                     onBlur={ editor => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ editor => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//         );
//     }
// }

// export default Content;

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";


const Content = () => {

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, editor.t);
        }
    }

    return (
        <>
        <h1>컨텐츠</h1>
        <div>
        <CKEditor
            editor={ClassicEditor}
            data='<p>Hello from CKEditor 5!</p>'
            // config={editor => {
            //     plugins: [ MyCustomUploadAdapterPlugin(editor) ]
            // }}
            config={{
                extraPlugins: [ MyCustomUploadAdapterPlugin],
            } }
            onInit={editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
            }}
            onBlur={editor => {
                console.log('Blur.', editor );
            } }
            onFocus={editor => {
                console.log('Focus.', editor );
            } }
        />
        </div>
        </>
    );
};

export default Content;
