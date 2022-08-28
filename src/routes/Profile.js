import React, { useEffect, useState } from "react";
import { authService, dbService } from "firebase_";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "components/UploadAdapter";
import ReactHtmlParser from "html-react-parser";
import BoxItem from "components/BoxItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 10vh 0 0 0;
  justify-content: center;
  align-items: center;
`

const ProfileDiv = styled.div`
width: 100vw;
display: flex;
`

const ProfileContainer = styled.div`
width: 573px;
float: left;

`

const ProfileFormCss= styled.div`
width: 40vw;
  height: 25px;
  margin: 50px 0 0 0;
  border-bottom: 1px solid #464646;
  display: flex;
//   flex-direction: column;
  
`
const ProfileTitle= styled.div`
color: black;
  width: 100px;
  font-size: 14px;
  height: auto;
  margin-bottom: 20px
`

const EditBtnDiv=styled.div`
font-size: 14px;
  width: 80px;
  height: 40px;
  color: #707070;
  background-color: #CCE8FF;
  border-radius: 20px;
  text-align: center;
  margin: 50px 45vw 0 0;
  padding: 12px;
  cursor: pointer;
`

const Profile = ({ refreshUser, userObj }) => {
    const navigate = useNavigate();

	const nowUserId = userObj.uid;

	const [userProfile, setUserProfile] = useState({
		id: "",
		displayName: "",
		email: "",
		bio: ""
	});

	const [newDisplayName, setNewDisplayName] = useState(null);
	const [newBio, setNewBio] = useState(null);
	const [userPortfolio, setUserPortfolio] = useState(null);

	const [profileOwner, setProfileOwner] = useState(false);
	const [profileEditing, setProfileEditing] = useState(false);

	useEffect(() => {
		dbService
			.collection("users")
			.where("userId", "==", nowUserId)
			.get()
			.then(function(querySnapshot){
				const newArray = querySnapshot.docs.map((document) => ({
					id: document.id,
					...document.data()
				}));

				setUserProfile({
					id: newArray[0].id,
					displayName: newArray[0].displayName,
					email: newArray[0].email,
					bio: newArray[0].bio
				})
				setNewDisplayName(newArray[0].displayName);
				setNewBio(newArray[0].bio);

				if (nowUserId === userObj.uid){
					setProfileOwner(true);
				}
				else{
					setProfileOwner(false);
				}
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});

		dbService
			.collection("projectforms")
			.where("creatorId", "==", nowUserId)
			.get()
			.then(function(querySnapshot){
				const newArray = querySnapshot.docs.map((document) => ({
					id: document.id,
					...document.data()
				}));
				setUserPortfolio(newArray);
				console.log(newArray);
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error);
			});
    }, []);

	console.log(userPortfolio);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/profile");
    };

    const toggleEditing = () => setProfileEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;

		switch (event.target.id){
			case "editDisplayName":
				setNewDisplayName(value);
				break;

			case "editBio":
				setNewBio(value);
				break;
		}
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        await dbService.doc(`users/${userProfile.id}`).update({
			displayName: newDisplayName,
			bio: newBio
		});

		setUserProfile({
			id: userProfile.id,
			displayName: newDisplayName,
			email: userProfile.email,
			bio: newBio
		});

		setProfileEditing(false);
		await userObj.updateProfile({displayName: newDisplayName});
		refreshUser();
    };

	const cancelEditing = () => {
		setNewDisplayName(userProfile.displayName);
		setNewBio(userProfile.bio);
		setProfileEditing((prev) => !prev);
	}

	function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, editor.t);
        }
    }
	
	// console.log(userPortfolio);

    return (
        <Container>
            <ProfileDiv>
                <span className="profileMainTitile">Profile</span>

				{profileOwner &&
					<EditBtnDiv>
						<span onClick={toggleEditing}>Edit</span>
					</EditBtnDiv>
				}
            </ProfileDiv>

			{!profileEditing ? (
				<ProfileContainer>
                
					<ProfileFormCss>
						<ProfileTitle><span>Name</span></ProfileTitle>
						<span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {`${userProfile.displayName}`} </span>
					</ProfileFormCss>

					<ProfileFormCss>
						<ProfileTitle><span>E Mail</span></ProfileTitle>
						<span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {`${userProfile.email}`} </span>
					</ProfileFormCss>

					<ProfileFormCss>
						<ProfileTitle><span>Bio</span></ProfileTitle>
						<span className="profilecss" style={{ fontsize: "14px", color: "#464646"}}> {ReactHtmlParser(userProfile.bio)} </span>
					</ProfileFormCss>

				</ProfileContainer>

			) : (
					<ProfileContainer>
						<form onSubmit={onSubmit} className="profileForm">
							<div>
								<ProfileFormCss>
									<ProfileTitle><span>Name</span></ProfileTitle>
									<input 
										className="profilecss" 
										style={{ fontsize: "14px", color: "#464646", width: "100%"}}
										type="text"
										onChange={onChange}
										id="editDisplayName"
										placeholder="Display name"
										required
										autoFocus
										value={newDisplayName}
									/>
								</ProfileFormCss>

								<ProfileFormCss>
									<ProfileTitle><span>E Mail</span></ProfileTitle>
									<input 
										className="profilecss" 
										style={{ fontsize: "14px", color: "#464646", width: "100%"}}
										type="text"
										onChange={onChange}
										required
										autoFocus
										value={userProfile.email}
										disabled
									/>
								</ProfileFormCss>
								
								<ProfileFormCss>
									<span><ProfileTitle>Bio</ProfileTitle></span>
									<CKEditor
										editor={ClassicEditor}
										data={newBio}

										config={{
											extraPlugins: [ MyCustomUploadAdapterPlugin],
										} }
										onInit={editor => {
											// You can store the "editor" and use when it is needed.
											console.log( 'Editor is ready to use!', editor );
										} }
										onChange={(event, editor) => {
											const data = editor.getData();
											setNewBio(data);
										}}
										onBlur={editor => {
											// console.log('Blur.', editor );
										} }
										onFocus={editor => {
											// console.log('Focus.', editor );
										} }
									/>
								</ProfileFormCss>
							</div>
							<div>
								<input type="submit" value="Update Profile" className="formBtn cancelBtn logOut" />
							</div>
							
						</form>

						<div>
							<button onClick={cancelEditing} className="formBtn cancelBtn logOut">Cancel</button>
						</div>

					</ProfileContainer>
				
			)}
            {console.log(userPortfolio)}
            <ProfileDiv>
                <span className="profileMainTitile">Portfolio</span>
				{userPortfolio && 
				<div>
					{userPortfolio.map((portfolio) => (
					<BoxItem userObj={userObj} listObj={portfolio} isOwner={true} />
					))}
				</div>
				
				}
				
            </ProfileDiv>

			{profileOwner && 
				<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
					Log Out
				</span>
			}
           
        </Container>
    );
};

export default Profile;


