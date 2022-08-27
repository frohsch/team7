import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { dbService } from "../firebase_";

const Home = () => {
	const [newProjects, setNewProjects] = useState([]);

	useEffect(() => {
		dbService
			.collection("projectforms")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				const newArray = snapshot.docs.map((document) => ({
					id: document.id,
					...document.data()
				}));
			setNewProjects(newArray);
		});
	}, []);

	const onClick = (event) => {
		const {
			target : {name}
		} = event;

		console.log(event);
		console.log(event.target.className);
	}
	

	return (
		<div>
			<div>
				<div style={{ marginTop: 30 }}>
					{newProjects.map((newProject) => (

						<span className={newProject.projectId} onClick={onClick}>

						<Link to="/project_items" state={{data: newProject.projectId}}>
							<div className="project_container">
								<h1>{newProject.title}</h1>
							</div>
						</Link>
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;