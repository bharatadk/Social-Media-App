import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {};

//////////////////////////

const likeRequest = createAction("likeRequest");
const likeSuccess = createAction("likeSuccess");
const likeFailure = createAction("likeFailure");
const addCommentRequest = createAction("addCommentRequest");
const addCommentSuccess = createAction("addCommentSuccess");
const addCommentFailure = createAction("addCommentFailure");
const deleteCommentRequest = createAction("deleteCommentRequest");
const deleteCommentSuccess = createAction("deleteCommentSuccess");
const deleteCommentFailure = createAction("deleteCommentFailure");
const addPostRequest = createAction("addPostRequest");
const addPostSuccess = createAction("addPostSuccess");
const addPostFailure = createAction("addPostFailure");
const updateCaptionRequest = createAction("updateCaptionRequest");
const updateCaptionSuccess = createAction("updateCaptionSuccess");
const updateCaptionFailure = createAction("updateCaptionFailure");
const deleteCaptionRequest = createAction("deleteCaptionRequest");
const deleteCaptionSuccess = createAction("deleteCaptionSuccess");
const deleteCaptionFailure = createAction("deleteCaptionFailure");
const clearErrors = createAction("clearErrors");
const clearMessage = createAction("clearMessage");



export const likeReducer = createReducer(initialState, 

	(builder) => {


    builder

        .addCase(likeRequest, (state) => {
            state.loading = true;
        })
        .addCase(likeSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(likeFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })



        .addCase(addCommentRequest, (state) => {
            state.loading = true;
        })
        .addCase(addCommentSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addCommentFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })



        .addCase(deleteCommentRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteCommentSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteCommentFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(addPostRequest, (state) => {
            state.loading = true;
        })
        .addCase(addPostSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addPostFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(updateCaptionRequest, (state) => {
            state.loading = true;
        })
        .addCase(updateCaptionSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateCaptionFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(deleteCaptionRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteCaptionSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteCaptionFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(clearErrors, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
});




////////////////

const myPostsRequest = createAction("myPostsRequest");
const myPostsSuccess = createAction("myPostsSuccess");
const myPostsFailure = createAction("myPostsFailure");


export const myPostsReducer = createReducer(initialState, 

	(builder) => {

		
    builder

        .addCase(myPostsRequest, (state) => {
            state.loading = true;
        })
        .addCase(myPostsSuccess, (state, action) => {
            state.loading = false;
            state.posts  = action.payload;
        })
        .addCase(myPostsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        .addCase(clearErrors, (state) => {
            state.error = null;
        })

});



////////////////

const UserPostsRequest = createAction("UserPostsRequest");
const UserPostsSuccess = createAction("UserPostsSuccess");
const UserPostsFailure = createAction("UserPostsFailure");


export const userPostsReducer = createReducer(initialState, 

    (builder) => {

        
    builder

        .addCase(UserPostsRequest, (state) => {
            state.loading = true;
        })
        .addCase(UserPostsSuccess, (state, action) => {
            state.loading = false;
            state.posts  = action.payload;
        })
        .addCase(UserPostsFailure, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


});