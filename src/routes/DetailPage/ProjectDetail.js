import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt,faXmark,faCirclePlus,faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { dbService, storageService } from "../../firebase_";

import '../../DetailStyle/ProjectDetail.css';
import React from "react";
import UploadAdapter from "../../components/UploadAdapter";
import ProjectDetailShow from "../../components/ProjectDetailShow";
import Comment from "components/Comment";


const ProjectDetail = ({userObj, listObj}) => {	
	const location = useLocation();
	const nowProjectId = location.state.data;

	// 프로젝트 정보
	const [itemDetail, setItemDetail] = useState({
		id: "",
		thumbnailUrl: "",
		title: "",
		introduce: "",
		member: [],
		tagList: [],
		content: "",
	});

	const [projectOwner, setProjectOwner] = useState(false);
	const [detailEditing, setDetailEditing] = useState(false);

	// 수정 프로젝트 정보
	const [newThumbnailBool, setNewThumbnailBool] = useState(false);
	const [newThumbnail, setNewThumbnail] = useState("");

	const [newTitle, setNewTitle] = useState(null);
	const [newMemberName, setNewMemberName] = useState(null);		
	const [newMember, setNewMember] = useState(null);		
	const [newIntroduce, setNewIntroduce] = useState(null);
	const [newTagListName, setNewTagListName] = useState(null);		
	const [newTagList, setNewTagList] = useState(null);	

	const [newContent, setNewContent] = useState(null);

	
	const [newId, setNewId] = useState(null);

	// 해당 프로젝트 정보 가져오기
	useEffect(() => {
		dbService
		.collection("projectforms")
		.where("projectId", "==", nowProjectId)
		.get()
		.then(function(querySnapshot) {
			const newArray = querySnapshot.docs.map((document) => ({
				id: document.id,
				...document.data()
			}));

			// 현재 프로젝트 정보 저장
			setItemDetail({
				id: newArray[0].id,
				thumbnailUrl: newArray[0].thumbnailUrl,
				title: newArray[0].title,
				introduce: newArray[0].introduce,
				member: newArray[0].member,
				tagList: newArray[0].tagList,
				content: newArray[0].content,
			});

			setNewId(newArray[0].id);
			setNewTitle(newArray[0].title);
			setNewMember([...newArray[0].member]);
			setNewIntroduce(newArray[0].introduce);
			setNewTagList([...newArray[0].tagList]);
			setNewContent(newArray[0].content);
			
			// owner인지 확인
			if (newArray[0].creatorId === userObj.uid){
				setProjectOwner(true);
			}
			else{
				setProjectOwner(false);
			}
		})
		.catch(function(error) {
			console.log("Error getting documents: ", error);
		});
	}, []);

	// 프로젝트 삭제
	const onDeleteClick = async () => {
		const ok = window.confirm("삭제하시겠습니까?");

		if (ok){
			await dbService.doc(`projectforms/${itemDetail.id}`).delete();
			if (itemDetail.thumbnailUrl !== ""){
				await storageService.refFromURL(itemDetail.thumbnailUrl).delete();
			}
			window.location.replace("/");
		}
	};

	// 수정
	const toggleEditing = () => setDetailEditing((prev) => !prev);

	// 수정 입력란
	const onChange = (event) => {
		const {
			target: {value}
		} = event;

		switch (event.target.id){
			case "inputTitle":
				setNewTitle(value);
				break;

			case "inputMember":
				setNewMemberName(value);
				break;
			
			case "inputIntroduce":
				event.target.style.height = "1px";
				event.target.style.height = (12+event.target.scrollHeight)+"px";
				setNewIntroduce(value);
				break;

			case "inputTagList":
				setNewTagListName(value);
				break;
		}
	}

	// 이미지 파일 변경
	const onFileChange = (event) => {
		const {
			target: {files}
		} = event;

		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const{
				currentTarget : {result}
			} = finishedEvent;
			setNewThumbnailBool(true);
			setNewThumbnail(result);
		};
		if (Boolean(theFile)){
			reader.readAsDataURL(theFile);
		}

	};

	// 멤버 추가
	const onAddMemberClick = () => {
		if (newMemberName !== ""){
			setNewMember([...newMember, newMemberName]);
			setNewMemberName("");
		}
	}

	// 멤버 삭제
	const onDeleteMember = (event) => {
		const newMemArray = newMember;
		newMemArray.splice(event.target.id, 1);
		setNewMember([...newMemArray]);
	}

	// 해시태그 추가
	const onAddTagListClick = () => {
		if (newTagListName !== ""){
			setNewTagList([...newTagList, newTagListName]);
			setNewTagListName("");
		}
	}

	// 해시태그 삭제
	const onDeleteTagList = (event) => {
		const newTagArray = newTagList;
		newTagArray.splice(event.target.id, 1);
		setNewTagList([...newTagArray]);
	}

	// 수정 취소
	const cancelEditing = () => {
		setNewThumbnail("");
		setNewThumbnailBool(false);
		setNewTitle(itemDetail.title);
		setNewMember([...itemDetail.member]);
		setNewIntroduce(itemDetail.introduce);
		setNewTagList([...itemDetail.tagList]);
		setNewContent(itemDetail.content);
		setDetailEditing((prev) => !prev);
	}

	function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, editor.t);
        }
    }

	// 수정 제출
	const onSubmit = async (event) => {
		event.preventDefault();
		let newThumbnailUrl = "";
		// 이미지 변경된 경우, storage 이전 이미지 삭제 후 새로운 이미지 저장
		if (newThumbnail !== ""){
			await storageService.refFromURL(itemDetail.thumbnailUrl).delete();

			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
		
			const response = await attachmentRef.putString(newThumbnail, "data_url");
			newThumbnailUrl = await response.ref.getDownloadURL();
		}
		
		// db 업데이트
		await dbService.doc(`projectforms/${itemDetail.id}`).update({
			thumbnailUrl: newThumbnailUrl,
			title: newTitle,
			member: newMember,
			introduce: newIntroduce,
			tagList: newTagList,
			content: newContent
		});

		// 프로젝트 정보 업데이트
		setItemDetail({
			id: itemDetail.id,
			thumbnailUrl: newThumbnailUrl,
			title: newTitle,
			introduce: newIntroduce,
			member: newMember,
			tagList: newTagList,
			content: newContent
		});

		setDetailEditing(false);
		setNewThumbnail("");
		setNewThumbnailBool(false);
	};
		
	return (
		<>
		<div>

			{detailEditing ? (

				<div className="detail_container">
					<form onSubmit={onSubmit}>

						{/* Img */}
						<div style={{paddingBottom:"40px"}}>
							{newThumbnailBool ? (
								<img src={`${newThumbnail}`}/>
							) : (
								<img src={itemDetail.thumbnailUrl}/>
							)}

							<div>
								<label htmlFor="attach-file" className="factoryInput__label">
									<span>Edit Thumbnail</span>
									<FontAwesomeIcon icon={faPlus}/>
								</label>

								<input 
									id="attach-file"
									type="file" 
									accept="image/*"
									onChange={onFileChange}
									style={{
										opacity: 0
									}} 
								/>
							</div>
						</div>
								
						{/* Title */}
						<div className="list_update">
							<span>제목</span>
							<input
								onChange={onChange}
								value={newTitle}
								required
								placeholder="Edit Title"
								autoFocus
								id="inputTitle" 
								style={{ color: "#404040" }}
							/>
						</div>

						{/* Member */}
						<div  className="list_update">

							<span>
								멤버
								<div className="input_member">
									<input 
										type="text" 
										placeholder="Name"
										value={newMemberName}
										maxLength="15" 
										onChange={onChange}
										id="inputMember"
									/>
									<FontAwesomeIcon 
										icon={faCirclePlus} 
										size="1x" 
										style={{paddingLeft:"10px", cursor:"pointer"}}
										onClick={onAddMemberClick}
									/>
								</div>
							</span>

							{newMember.map((memberName, index) => (
								<div className="member">
									{memberName}
									<FontAwesomeIcon id={index} onClick={onDeleteMember} icon={faXmark} size="1x" style={{paddingLeft:"10px", cursor:"pointer"}}  />
								</div>
							))}
						</div>
						
						{/* Introduce */}
						<div className="list_update">
							<span>한줄소개</span>
							<textarea
								onChange={onChange}
								value={newIntroduce}
								required
								placeholder="Edit Introduce"
								autoFocus
								id="inputIntroduce"
							/>
						</div>
						
						{/* tagList */}
						<div className="list_update">
							<span>
								해시태그
								<div className="input_hashtag">
									<input 
										type="text" 
										placeholder="Hashtag"
										value={newTagListName}
										maxLength="15" 
										onChange={onChange}
										id="inputTagList"
									/>
									<FontAwesomeIcon 
										icon={faCirclePlus} 
										size="1x" 
										style={{paddingLeft:"10px", cursor:"pointer"}}
										onClick={onAddTagListClick}
									/>
								</div>
							</span>
							{newTagList.map((hashtag, index) => (
								<div className="hashtag">
									#{hashtag} 
									<FontAwesomeIcon id={index} onClick={onDeleteTagList} icon={faXmark} size="1x" style={{paddingLeft:"10px", cursor:"pointer"}} />
								</div>
							))}
						</div>
						
						{/* Content */}
						<div className="list_update">
							<span>본문 내용</span>
							<CKEditor
								editor={ClassicEditor}
								data={newContent}
								
								config={{
									extraPlugins: [ MyCustomUploadAdapterPlugin],
								} }
								onInit={editor => {
									// You can store the "editor" and use when it is needed.
									console.log( 'Editor is ready to use!', editor );
								} }
								onChange={(event, editor) => {
									const data = editor.getData();
									setNewContent(data);
								}}
								onBlur={editor => {
									// console.log('Blur.', editor );
								} }
								onFocus={editor => {
									// console.log('Focus.', editor );
								} }
							/>
						</div>

						{/* update */}
						<input type="submit" value="Update Project" className="formBtn" />
					</form>

					{/* Cancel */}
					<div>
						<button onClick={cancelEditing} className="formBtn">Cancel</button>
					</div>
				</div >

			) : (
				<div className="detail_container">

					<ProjectDetailShow itemDetail={itemDetail} />
					
					{projectOwner && (
						<div style={{ paddingBottom:"20px"}}>
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} size="2x" style={{ padding:"10px"}}/>
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} size="2x" style={{ padding:"10px"}}/>
							</span>
						</div>
					)}

					
				
				</div >
			)}
		</div>
		{newId &&
		//console.log(newId)
			<Comment 
			userObj={userObj} 
			id={newId} 
			tag="projectforms"
		/>
		}
		
		</>
	);
};

export default ProjectDetail;
