import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { dbService, storageService } from "../../firebase_";
import {v4 as uuidv4} from 'uuid';
import UploadAdapter from "../../components/UploadAdapter";
import { useNavigate,useLocation } from "react-router-dom";

const AdForm = ({userObj}) => {
	const navigate = useNavigate();

    const [title, setTitle] = useState(""); //제목
    const [introduce, setIntroduce] = useState(""); //한줄소개
    const [thumbNail, setThumbNail] = useState(""); //썸네일사진
    const [tag, setTag] = useState(""); //태그
    const [tagList, setTagList] = useState([]);
    const [data, setData] = useState(""); 
    const [projectId, setProjectId] = useState(uuidv4());

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

        if (event.target.id === "titleText") {
            setTitle(value);
        }
        else if (event.target.id === "introduceText") {
            setIntroduce(value);
        }
        else if (event.target.id === "tagText") {
            setTag(value);
        }
    };

    //태그 리스트에 추가
    const onKeyPressTag = (event) => {  
        if (event.target.value.length !== 0 && event.key === 'Enter') {
            setTagList([...tagList, tag])
            setTag("")
        }
    }

    const onSubmit = async (event) => {
        //버튼을 클릭한 경우에만 제출하도록 변경
        event.preventDefault(); //새로고침 방지

        let attachmentUrl = "";
        if (thumbNail !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);

            const response = await attachmentRef.putString(thumbNail, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        
        const AdFormObj = {
            projectId: projectId,
			createdAt: Date.now(),
			creatorId: userObj.uid,
            title: title,
            introduce: introduce,
            data: data,
            thumbnailUrl: attachmentUrl,
            tagList: tagList,
            view: 0,
        };
        await dbService.collection("adforms").add(AdFormObj);

        setTitle("");
        setIntroduce("");
        setData("");
        setThumbNail("");
        setTagList([]);

		navigate(`/ad_items`, {
            replace: false,
            state: { data: AdFormObj.projectId },
        });
    };

    const onFileChange = (event) => {
        if(event.target.id === "thumbNail"){
            const { 
                target: { files }, 
            } = event;
            
            const theFile = files[0]; 
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                setThumbNail(result);
            };
            reader.readAsDataURL(theFile);
        }
    };

    const onClearAttachment = () => setThumbNail("");

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, title)
        }
    }
    
    return (
        <>
            <h1>홍보해요 작성폼</h1>
            <form className="form_container" onSubmit={false}>
                <div className="input_p">
                    <span>제목 </span><hr></hr>
                    <input
                        className="input_title"
                        id="titleText"
                        type="text"
                        placeholder="제목"
                        size="30"
                        value={title}
                        onChange={onChange}
                        style={{ border: "none" }}
                        required
                    />
                </div>
                <br></br>
                <div className="input_p">
                    <span>한 줄 소개</span><hr></hr>
                    <textarea
                        className="input_intro"
                        id="introduceText"
                        placeholder="한 줄 소개"
                        cols="70"
                        rows="3"
                        value={introduce}
                        onChange={onChange}
                        style={{ border: "none" }}
                        required
                    />
                </div>
                <br></br>
                <div className="input_p">
                    <span className="span_tag">해시태그</span><hr></hr>
                    <span>#</span>
                    <div style={{ display: "inline-block" }}>
                        <input
                            type="text"
                            title="태그"
                            name="tagText"
                            id="tagText"
                            placeholder="태그입력"
                            value={tag}
                            onChange={onChange}
                            onKeyPress={onKeyPressTag}
                            style={{ boxsizing: "content-box", width: "47px", border: "none" }}
                        />
                        <div style={{ position: "absolute", top: "0px", left: "0px", visibility: "hidden", height: "0px", overflow: "scroll", whitespace: "pre", fontsize: "13px", fontweight: "400", fontstyle: "normal", letterspacing: "normal", texttransform: "none" }}></div>
                    </div>
                    <div>
                        {tagList.map((item, idx) => {
                            return (
                                <span className="txt_tag">
                                    <span key={idx}>#{item} </span>
                                    {/*<button className="btn_delete" onClick={deleteTagItem}>X</button>*/}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <br></br>
                <div className="input_p">
                    <span className="span_img">썸네일 사진 </span><hr></hr>
                    <input
                        className="input_img"
                        id="thumbNail"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        required
                        style={{ border: "none" }}
                    />
                    {thumbNail && (
                        <div className="attatchment">
                            <img src={thumbNail} />
                            <button className="default_Btn" onClick={onClearAttachment}>Clear</button>
                        </div>
                    )}
                </div>
                <br></br>
                <div className="input_content">
                    <span>본문 작성</span><hr></hr>
                    <CKEditor
                        editor={ClassicEditor}
						data={data}
                        config={{
                            placeholder: '내용을 입력해 주세요.',
                            extraPlugins: [ MyCustomUploadAdapterPlugin],
                        }}
                        onChange={(event, editor) => {
                            setData(editor.getData());
                        }}
                    />
                </div>
                <br></br>
            </form>
            <div>
                <button className="default_Btn_Right" type="submit" onClick={onSubmit}>제출</button>
            </div>
        </>
    );
}

export default AdForm;



