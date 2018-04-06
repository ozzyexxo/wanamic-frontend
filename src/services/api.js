import axios from "axios";


export default {
	login: credentials =>
		axios({
			method: "post",
			url: "/auth/login",
			data: { credentials: credentials }
		})
			.then( res => res.data )
			.catch( err => console.log( err )),

	signup: credentials =>
		axios({
			method: "post",
			url: "/auth/signup",
			data: { credentials: credentials }
		})
			.then( res => res.data )
			.catch( err => console.log( err )),

	createPost: post =>
		axios({
			method: "post",
			url: "/posts/create",
			data: post
		})
			.then( res => res.data )
			.catch( err => console.log( err )),

	getNewsFeed: () =>
		axios({
			method: "get",
			url: "posts/test@gmail.com"
		})
			.then( res => res )
			.catch( err => console.log( err )),

	deletePost: ( postId ) =>
		axios({
			method: "delete",
			url: "/posts/delete",
			data: { post: { id: postId } }
		})
			.then( res => res )
			.catch( err => console.log( err )),

	updatePost: ( token, postId, content ) =>
		axios({
			method: "patch",
			url: "/posts/update",
			data: { data: {
				token: token,
				post: { id: postId, content: content }
			} }
		})
			.then( res => res )
			.catch( err => console.log( err )),
};
