import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status : false,
    postData : null
}

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers: {
        createPost: ( state, action ) => {
            state.status = true;
            state.postData = action.payload.postData; 

        },
        deletePost: (state) => {
            state.status = false;
            state.postData = null;
        }
    }
})

export default postSlice.reducer;

export const { createPost, deletePost } = postSlice.actions;