import React from "react";
import AppRouter from "./Router";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function App() {
  return (
    <AppRouter />
  );
}

export default App;

// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const App = () => {
//   return (
//     <div>
//       <CKEditor
//         editor={ClassicEditor}
//         data='<p>Hello from CKEditor 5!</p>'
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log(data);
//         }}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { Component } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import ReactHtmlParser from "react-html-parser";

// class App extends Component {
//     render() {
//         return (
//           <>
//             <div className="App">
//                 <h2>Using CKEditor 5 build in React</h2>
//                 <CKEditor
//                     editor={ ClassicEditor }

//                     config={{
//                       placeholder: "내용을 입력하세요.",
//                   }}
//                     onReady={ editor => {
//                         // You can store the "editor" and use when it is needed.
//                         console.log( 'Editor is ready to use!', editor );
//                     } }
//                     onChange={ ( event, editor ) => {
//                         const data = editor.getData();
//                         console.log( { event, editor, data } );
//                     } }
//                     onBlur={ ( event, editor ) => {
//                         console.log( 'Blur.', editor );
//                     } }
//                     onFocus={ ( event, editor ) => {
//                         console.log( 'Focus.', editor );
//                     } }
//                 />
//             </div>
//           </>
//         );
//     }
// }

// export default App;