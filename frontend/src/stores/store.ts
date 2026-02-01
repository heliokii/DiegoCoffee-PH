import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from "./users/usersSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import menu_itemsSlice from "./menu_items/menu_itemsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import promotionsSlice from "./promotions/promotionsSlice";
import reservationsSlice from "./reservations/reservationsSlice";
import pitchesSlice from "./pitches/pitchesSlice";
import locationsSlice from "./locations/locationsSlice";
import ordersSlice from "./orders/ordersSlice";
import mediaSlice from "./media/mediaSlice";
import pagesSlice from "./pages/pagesSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

users: usersSlice,
roles: rolesSlice,
permissions: permissionsSlice,
menu_items: menu_itemsSlice,
categories: categoriesSlice,
promotions: promotionsSlice,
reservations: reservationsSlice,
pitches: pitchesSlice,
locations: locationsSlice,
orders: ordersSlice,
media: mediaSlice,
pages: pagesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
