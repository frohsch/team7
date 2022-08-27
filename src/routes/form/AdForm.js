import React, { useState } from "react";
import styled, { css } from 'styled-components';
import DetailList from "../../components/DetailList";
import { dbService, storageService } from "../../firebase";

const AdForm = ({ userObj }) => {
    //제목, 멤버, 한줄 소개, 썸네일 사진, 해시태그, (기타 플러스 하면 소개 내용 추가되기)
    const [title, setTitle] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);
    const [attachment, setAttachment] = useState("");
    const [header, setHeader] = useState("");
    const [headerList, setHeaderList] = useState([]);
    const [context, setContext] = useState("");
    const [contextList, setContextList] = useState([]);
    const [countList, setCountList] = useState([0])

    const onSubmit = async (event) => {
        event.preventDefault(); //새로고침 방지

        const AdFormObj = {
            title: title,
            introduce: introduce,
            tagList: tagList,
            createdAt: Date.now(),
            counter: countList,
        };
        await dbService.collection("adforms").add(AdFormObj);
        
        setTitle("");
        setIntroduce("");
        setTag("");
        setTagList([]);
    };

    const onKeyPress = (event) => {
        if(event.target.id === "tagText"){
            if (event.target.value.length !== 0 && event.key === 'Enter') {
                submitTagItem()
            }
        }
    }
    const submitTagItem = () => {
        setTagList([...tagList, tag])
        setTag("")
    }
    const deleteTagItem = (event) => {
        const deleteTagItem = event.target.parentElement.firstChild.innerText

        const filteredTagList = tagList.filter(tag => tag !== deleteTagItem)
        setTagList(filteredTagList)
    }

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
        console.log(countList);
      }

    const addMainContext=(event)=> {
        console.log(event.target)
        return(
        <>
        <h1>내용추가</h1>
        <div>
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
            <div>
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
            </div>
        </div>
        </>
        );
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
        <h1>advertisement form page</h1>
        <form className="form_container">
        <p>프로젝트 홍보 글 작성하기</p>
        <p className="openjoin_que">
            <span>제목 </span><hr></hr>
            <input
                className="openjoin_input"
                id="titleText"
                type="text"
                placeholder="제목"
                value={title}
                onChange={onChange}
                required
                style={{border: "none"}}
            />
        </p>
        <p className="openjoin_que">
            <span>한 줄 소개</span><hr></hr>
            <input
                className="openjoin_input"
                id="introduceText"
                type="text"
                placeholder="한 줄 소개"
                value={introduce}
                onChange={onChange}
                required
                style={{border: "none"}}
            />
        </p>
        <p className="openjoin_que">
            <span className="openjoin_long">썸네일 사진 </span><hr></hr>
            <div>
            <input
                className="openjoin_input"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{border: "none"}}
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
            <div className="input_tag">
                <span className="openjoin_input">해시태그</span><hr></hr>
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
                        style={{boxsizing: "content-box", width: "47px", border: "none"}}
                    />
                    <div style={{position: "absolute", top: "0px", left: "0px", visibility: "hidden", height: "0px", overflow: "scroll", whitespace: "pre", fontsize: "13px", fontweight: "400", fontstyle: "normal", letterspacing: "normal", texttransform: "none"}}></div>
                </div>
                <div>
                {tagList.map((item, idx) => {
                    return(
                        <span className="txt_tag">
                            <span key={idx}>#{item}     </span>
                            {/*<button className="btn_delete" onClick={deleteTagItem}>X</button>*/}
                        </span>
                    )
                })}
                </div>
            </div>
            <br></br>
        </div>
        <div className="input_context">
            <span>본문 추가 </span><span onClick={onAddDetailDiv}>add</span><hr></hr>
            <DetailList countList={countList} />
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
export default AdForm;
