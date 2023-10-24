
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    currentPost: null,
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers: {
        createPost: ( state, action ) => {
           state.posts.push(action.payload)
        },
        updatePost: ( state, action ) => {
            //find and update the post in the state
            const uploadedPost = action.payload
            const index = state.posts.findIndex(( post ) => post.$id === uploadedPost.$id)
            if(index !== -1){
                state.posts[index] = uploadedPost;
            }
        },
        deletePost: (state, action) => {
            // removing post from state
            const postIdToDelete = action.payload;
            state.posts = state.posts.filter((post) => post.$id !== postIdToDelete);
        },
        getCurrentPost: (state, action) => {
            // set the current Post for viewing/editing
            state.currentPost = action.payload
        },
        clearCurrentPost: (state) => {
            // clear current post
            state.currentPost = null
        },
    }
})

export default postSlice.reducer;

export const {
    createPost,
    updatePost,
    deletePost,
    getCurrentPost,
    clearCurrentPost,
 } = postSlice.actions;