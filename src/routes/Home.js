import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import Kuromi from "components/Kuromi";
import KuromiFactory from "components/KuromiFactory"

const Home = ({ userObj }) => {
    const [kuromis, setKuromis] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "kuromis"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const kuromiArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setKuromis(kuromiArr);
        });
    }, []);

    return (
        <div className="container">
            <KuromiFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {kuromis.map((kuromi) => (
                    <Kuromi
                        key={kuromi.id}
                        kuromiObj={kuromi}
                        isOwner={kuromi.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;