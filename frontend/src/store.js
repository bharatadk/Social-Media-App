import { configureStore } from "@reduxjs/toolkit";

import {
    userReducer,
    postOfFollowingReducer,
    allUsersReducer,
    userProfileReducer,
} from "./Reducers/User.js";

import {
    likeReducer,
    myPostsReducer,
    userPostsReducer,
} from "./Reducers/Post.js";

export const store = configureStore({
    reducer: {
        userReducer,
        postOfFollowingReducer,
        allUsersReducer,
        likeReducer,
        myPostsReducer,
        userProfileReducer,
        userPostsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
