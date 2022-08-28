import BoxItem from "components/BoxItem";
import BoxItemAd from "components/BoxItemAd";
import BoxItemTo from "components/BoxItemTo";
import { dbService } from "firebase_";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
`

const MainLemona = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
`

const LemonaSec = styled.div`
  width: 40vw;
  height: 200px;
  border: 1px solid black;
  margin: 70px;
`

const Search = styled.div`
height: 50px;
  width: 80%;
  border: 1px solid black;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  display:flex;
  align-items:center; 
`

const Hot = styled.div`
font-size: 14px;
  width: 90px;
  height: 40px;
  color: #707070;
  background-color: #CCE8FF;
  border-radius: 20px;
  text-align: center;
  margin: 50px 85vw 50px 0;
  padding: 12px;
`
const PostListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size:: small;
  row-gap: 8x;
  grid-template-columns: repeat(1, auto);
  flex-direction: column;
//   border: 1px solid blue;
`;

const MainPost = styled.div`
  display: grid;
  border: 1px;
  width: 30vw;
  height: auto;
//   border: 1px solid black;
  margin: 30px;
  justify-content: flex-start;
`;

const PostContainer = styled.div`
  width: 100%;
//   border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;`


const Home = ({ userObj }) => {
    const [search, setSearch] = useState("");
    const [projects, setProjects] = useState([]); //모든 프로젝트 게시글
    const [togethers, setTogethers] = useState([]); //모든 구인게시글
    const [ads, setAds] = useState([]); //모든 홍보게시글

    //모든 프로젝트 불러오기
    useEffect(() => {
        dbService.collection("projectforms").orderBy("view", "desc")
            .onSnapshot((snapshot) => {
                const postObj = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjects(postObj);
            });

        dbService.collection("participateforms").orderBy("view", "desc")
            .onSnapshot((snapshot) => {
                const postObj = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTogethers(postObj);
            });

        dbService.collection("adforms").orderBy("view", "desc")
            .onSnapshot((snapshot) => {
                const postObj = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAds(postObj);
            });
    }, []);

    return (
        <Container>
            <MainLemona>
                <LemonaSec></LemonaSec>
                <LemonaSec></LemonaSec>
            </MainLemona>

            <Search>
                <input
                    className="searchInput"
                    placeholder="Search"
                    required
                    defaultValue={search}
                    style={{
                        height: "40px",
                        width: "90%",
                        borderradius: "20px",
                        marginleft: "25px",
                        fontsize: "14px",
                        display: "inline-block",
                    }} />
                <button
                    className="searchBtn"
                    style={{
                        height: "40px",
                        width: "70px",
                        borderradius: "20px",
                        fontsize: "14px",
                        border: "none",
                        backgroundcolor: "#AAAAAA",
                        cursor: "pointer",
                        display: "inline-block",
                    }}
                >
                    🔍
                </button>
            </Search>
            <Hot>
                <span className="hotSpan" style={{ margin: "5px" }}>🔥HOT</span>
            </Hot>

            <PostContainer>
                <MainPost>
                    <PostListWrapper>
                        {projects.map((list) => (
                            <BoxItem
                                key={list.id}
                                userObj={userObj}
                                listObj={list}
                                isOwner={list.creatorId === userObj.uid}
                                {...list}
                            />
                        ))}
                    </PostListWrapper>
                </MainPost>

                <MainPost>
                    <PostListWrapper>
                        {togethers.map((list) => (
                            <BoxItemTo
                                key={list.id}
                                userObj={userObj}
                                listObj={list}
                                isOwner={list.creatorId === userObj.uid}
                                {...list}
                            />
                        ))}
                    </PostListWrapper>
                </MainPost>

                <MainPost>
                    <PostListWrapper>
                        {ads.map((list) => (
                            <BoxItemAd
                                key={list.id}
                                userObj={userObj}
                                listObj={list}
                                isOwner={list.creatorId === userObj.uid}
                                {...list}
                            />
                        ))}
                    </PostListWrapper>
                </MainPost>

            </PostContainer>
        </Container>
    );
};
export default Home;