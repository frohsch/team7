import { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import { dbService, storageService } from "../firebase_";
import ReactHtmlParser from "html-react-parser";


const Show = ({userObj}) => {

    const [lists, setLists] = useState([]);

	// 프로젝트 정보
	const [itemDetail, setItemDetail] = useState({
		title: "",
		introduce: "",
		data: ""
	});

	// 해당 프로젝트 정보 가져오기
	useEffect(() => {
        dbService
          .collection("adforms")
          .onSnapshot((snapshot) => {
            const listArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setLists(listArray);
            console.log(lists);
          });
      }, []);

	return (
		<>
        <p>viewContent는 저장된 글 내용을 보여주는 state이며,별도의 버튼에 onClick 이벤트로 글 내용을 state에 저장하게 했다.</p>
        {lists.map((list) => (
            <>
            <h1>{list.title}</h1>
            <p>{list.data}</p>
            <div>{ReactHtmlParser(list.data)}</div>
           </>
        ))}
       
        </>
		
	);
};

export default Show;
