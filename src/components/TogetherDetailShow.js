import ReactHtmlParser from "html-react-parser";
import '../DetailStyle/ProjectDetailShow.css';

const TogetherDetailShow = ({itemDetail}) => {
	return (
		<>
			<div className="list">
				<span>제목</span>
				<div>{`${itemDetail.title}`}</div>
			</div>
				
			<div  className="list">
				<span>멤버</span>
				{itemDetail.member.map((memberName) => (
					<div className="member">{memberName}</div>
				))}
			</div>

			<div className="list">
				<span>한줄소개</span>
				<div>{`${itemDetail.introduce}`}</div>
			</div>
			
			<div className="list">
				<span>해시태그</span>
				{itemDetail.tagList.map((hashtag) => (
					<div className="hashtag">#{hashtag}</div>
				))}
			</div>
			
			<div className="list">
				<span>본문</span>
				<div>{ReactHtmlParser(itemDetail.content)}</div>
			</div>
			
		</>
	);
};

export default TogetherDetailShow;