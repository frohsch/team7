import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import styled, { css } from 'styled-components'

const ProjectForm = ({ userObj }) => {
    //제목, 멤버, 한줄 소개, 썸네일 사진, 해시태그, (기타 플러스 하면 소개 내용 추가되기)
    const [title, setTitle] = useState("");
    const [member, setMember] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);
    const [attachment, setAttachment] = useState("");
    const [header, setHeader] = useState("");
    const [headerList, setHeaderList] = useState([]);
    const [context, setContext] = useState("");
    const [contextList, setContextList] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault(); //새로고침 방지
        const ProjectFormObj = {
            title: title,
            introduce: introduce,
        };

        setTitle("");
        setIntroduce("");
        setMember("");
        setTag("");
    };

    const onKeyPress = (event) => {
        if(event.target.id === "tagText"){
            if (event.target.value.length !== 0 && event.key === 'Enter') {
                submitTagItem()
            }
        }
        else if(event.target.id === "headerText"){
            if (event.target.value.length !== 0 && event.key === 'Enter') {
                submitHeaderItem()
            }
        }
        else if(event.target.id === "contextText"){
            if (event.target.value.length !== 0 && event.key === 'Enter') {
                submitContextItem()
            }
        }
        
    }
    const submitTagItem = () => {
        setTagList([...tagList, tag])
        setTag("")
    }
    const submitHeaderItem = () => {
        setHeaderList([...headerList, header])
        setHeader("")
    }
    const submitContextItem = () => {
        setContextList([...contextList, context])
        setContext("")
    }

    const deleteTagItem = (event) => {
        const deleteTagItem = event.target.parentElement.firstChild.innerText

        const filteredTagList = tagList.filter(tag => tag !== deleteTagItem)
        setTagList(filteredTagList)
    }

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
        else if (event.target.id === "headerText") {
            setHeader(value);
        } 
        else if (event.target.id === "contextText") {
            setContext(value);
        } 
    };

    const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
    const onClearAttachment = () => setAttachment(null);

    return (
        <>
        <h1>project form page</h1>
        <form className="form_container">
        <p>프로젝트 소개 작성하기</p>
        <p className="openjoin_que">
            <span>제목 </span><br></br>
            <input
                className="openjoin_input"
                id="titleText"
                type="text"
                placeholder="제목"
                value={title}
                onChange={onChange}
                required
            />
        </p>
        <p className="openjoin_que">
            <span>멤버 </span><br></br>
            <input
                className="openjoin_input"
                id="memberText"
                type="text"
                placeholder="멤버 추가"
                value={member}
                onChange={onChange}
                required
                list="depList"
            />
            <datalist id="depList">
                <option value="컴퓨터공학과"></option>
                <option value="영어영문과"></option>
                <option value="경영학과"></option>
                <option value="사회체육과"></option>
            </datalist>
        </p>
        <p className="openjoin_que">
            <span>한 줄 소개</span><br></br>
            <input
                className="openjoin_input"
                id="introduceText"
                type="text"
                placeholder="한 줄 소개"
                value={introduce}
                onChange={onChange}
                required
            />
        </p>
        <p className="openjoin_que">
            <span className="openjoin_long">썸네일 사진 </span>
            <div>
            <input
                className="openjoin_input"
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            {attachment && (
                <div className="attatchment">
                <img src={attachment} />
                <button className="default_Btn" onClick={onClearAttachment}>
                    Clear
                </button>
                </div>
            )}
            </div>
      </p>
        <div>
        <TagBox>
            <div className="input_tag">
                <span>#</span>
                <div style={{display: "inline-block"}}>
                    <input 
                        type="text" 
                        title="태그" 
                        name="tagText" 
                        id="tagText" 
                        placeholder="태그입력" 
                        value={tag} 
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        style={{boxsizing: "content-box", width: "47px"}}
                    />
                    <div style={{position: "absolute", top: "0px", left: "0px", visibility: "hidden", height: "0px", overflow: "scroll", whitespace: "pre", fontsize: "13px", fontweight: "400", fontstyle: "normal", letterspacing: "normal", texttransform: "none"}}></div>
                </div>
                {tagList.map((item, idx) => {
                    return(
                        <span className="txt_tag">
                            <span key={idx}>#{item}</span>
                            {/*<button className="btn_delete" onClick={deleteTagItem}>X</button>*/}
                        </span>
                    )
                })}
            </div>
        </TagBox>
        </div>
        <div>
        <div className="input_context">
            <span>소제목</span>
            <input 
                type="text" 
                title="소제목추가" 
                name="headerText" 
                id="headerText" 
                placeholder="소제목추가" 
                value={header} 
                onChange={onChange}
                onKeyPress={onKeyPress}
                style={{boxsizing: "content-box", width: "47px"}}
            />
            <input 
                type="text" 
                title="본문추가" 
                name="contextText" 
                id="contextText" 
                placeholder="내용추가" 
                value={context} 
                onChange={onChange}
                onKeyPress={onKeyPress}
                style={{boxsizing: "content-box", width: "47px"}}
            />
        </div>
        {headerList.map((item, idx) => {
            return(
                <span className="txt_tag">
                    <span key={idx}>{item}</span>
                </span>
            )
        })}
        {contextList.map((item, idx) => {
            return(
                <span className="txt_tag">
                    <span key={idx}>{item}</span>
                </span>
            )
        })}
        <br></br>
        </div>
        <div>
            <button className="default_Btn_Right" type="submit" onClick={onSubmit}>
                제출
            </button>
        </div>
        </form>
        </>
    );
}

const TagBox = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
min-height: 50px;
margin: 10px;
padding: 0 10px;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 10px;

&:focus-within {
    border-color: tomato;
}
`

const TagItem = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 5px;
padding: 5px;
background-color: tomato;
border-radius: 5px;
color: white;
font-size: 13px;
`
const Text = styled.span``

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`
export default ProjectForm;
