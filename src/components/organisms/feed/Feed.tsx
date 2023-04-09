// import styled from "styled-components";

import { FlatFeed, StatusUpdateForm, StreamApp } from "react-activity-feed";
import users from "../../../users";
import { getFromStorage } from "../../../utils/storage";

// import users from "../../../users";
// import { saveToStorage } from "../../../utils/storage";

// const Main = styled.main`
// 	background-color: black;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	width: 100%;
// 	height: 100vh;
// 	flex-direction: column;

// 	h1 {
// 		text-align: center;
// 		color: white;
// 		font-size: 20px;
// 		margin-bottom: 20px;
// 	}

// 	.users {
// 		display: flex;
// 		align-items: center;
// 		justify-content: space-between;
// 		width: 300px;
// 		margin: 0 auto;

// 		&__user {
// 			display: flex;
// 			flex-direction: column;
// 			img {
// 				width: 50px;
// 				height: 50px;
// 				border-radius: 50%;
// 				margin-bottom: 5px;
// 			}
// 			.name {
// 				margin: 10px auto;
// 				color: white;
// 				text-align: center;
// 			}
// 		}
// 	}
// `;

// const Feed = () => {
// 	const onClickUser = (id: any) => {
// 		saveToStorage("user", id);
// 		window.location.href = "/home";
// 	};

// 	return (
// 		<Main>
// 			<h1>Select a user</h1>
// 			<div className="users">
// 				{users.map((u) => (
// 					<button
// 						onClick={() => onClickUser(u.id)}
// 						className="users__user"
// 						key={u.id}
// 					>
// 						<img src={u.image} alt="" />
// 						<span className="name">{u.name}</span>
// 					</button>
// 				))}
// 			</div>
// 		</Main>
// 	);
// };

// export default Feed;

const APP_ID = "1224549";
const API_KEY = "fy8wtknhfqxy";

const Feed = () => {
	const userId = getFromStorage("user");

	const user = users.find((u) => u.id === userId) || users[0];

	return (
		<StreamApp apiKey={API_KEY} appId={APP_ID} token={user.token}>
			<StatusUpdateForm />
			<FlatFeed feedGroup="timeline" notify />
		</StreamApp>
	);
};

export default Feed;
