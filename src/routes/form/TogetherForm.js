import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { dbService, storageService } from "../../firebase_";
import {v4 as uuidv4} from 'uuid';
import UploadAdapter from "../../components/UploadAdapter";
import { useNavigate,useLocation } from "react-router-dom";


const TogetherForm = ({userObj}) => {
	const navigate = useNavigate();

    const [title, setTitle] = useState(""); //제목
	const [introduce, setIntroduce] = useState(""); //한줄소개
    const [member, setMember] = useState(""); //멤버
    const [memberList, setMemberList] = useState([]); //멤버리스트
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
        else if (event.target.id === "memberText") {
            setMember(value);
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

    //멤버 리스트에 추가
    const onKeyPressMem = (event) => {  
        if (event.target.value.length !== 0 && event.key === 'Enter') {
            setMemberList([...memberList, member])
            setMember("")
        }
    }

    //firebase에 저장
    const onSubmit = async (event) => {
        //버튼을 클릭한 경우에만 제출하도록 변경
        event.preventDefault(); //새로고침 방지

        const TogetherFormObj = {
            projectId: projectId,
            title: title,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			introduce: introduce,
            member: memberList,
            tagList: tagList,
            data: data,
            view: 0,
        };
        await dbService.collection("participateforms").add(TogetherFormObj);
		setProjectId(uuidv4());
		

        setTitle("");
        setMember("");
        setData("");
		setIntroduce("");
        setTag("");
        setMemberList([]);
        setTagList([]);

		navigate(`/together_items`, {
            replace: false,
            state: { data: TogetherFormObj.projectId },
        });
    };

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, title)
        }
    }
    
    return (
        <>
            <h1>함께해요 작성폼</h1>
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
                    <span className="span_tag">멤버</span><hr></hr>
                    <div style={{ display: "inline-block" }}>
                        <input
                            type="text"
                            title="멤버"
                            name="memberText"
                            id="memberText"
                            placeholder="멤버추가"
                            value={member}
                            onChange={onChange}
                            onKeyPress={onKeyPressMem}
                            style={{ boxsizing: "content-box", width: "47px", border: "none" }}
                        />
                    </div>
                    <div>
                        {memberList.map((item, idx) => {
                            return (
                                <span className="txt_tag">
                                    <span key={idx}>{item} </span>
                                </span>
                            )
                        })}
                    </div>
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
                                </span>
                            )
                        })}
                    </div>
                </div>
            </form>
            <div>
                <button className="default_Btn_Right" type="submit" onClick={onSubmit}>제출</button>
            </div>
        </>
    );
}

export default TogetherForm;