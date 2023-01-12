import { configureStore } from "@reduxjs/toolkit";

import {
    userReducer,
    postOfFollowingReducer,
    allUsersReducer,

} from "./Reducers/User.js";


import {
    likeReducer,
    myPostsReducer,
} from "./Reducers/Post.js";

export const store = configureStore({
    reducer: {
        userReducer,
        postOfFollowingReducer,
        allUsersReducer,
        likeReducer,
        myPostsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
