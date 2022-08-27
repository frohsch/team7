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
            config={{
                extraPlugins: [ MyCustomUploadAdapterPlugin],
            } }
            onChange={(event, editor) => {
                const data = editor.getData();
            }}
            onBlur={editor => {
                // console.log('Blur.', editor );
            } }
            onFocus={editor => {
                // console.log('Focus.', editor );
            } }
        />
        </div>
        </>
    );
};

export default Content;
