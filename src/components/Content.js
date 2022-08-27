import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Content = () => {
  return (
    <>
    <h1>컨텐츠</h1>
    <div>
      <CKEditor
        editor={ClassicEditor}
        data='<p>Hello from CKEditor 5!</p>'
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
        }}
      />
    </div>
    </>
  );
};

export default Content;
