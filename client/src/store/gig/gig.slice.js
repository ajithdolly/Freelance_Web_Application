import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const gigSlice = createSlice({
    name : 'gig',
    initialState : INITIAL_STATE,
    reducers : {
        changeInput : (state,action) => {
            const {name,value} = action.payload;
            state[name] = value;
        },
        addImages : (state,action) => {
            const {cover,images} = action.payload;
            state.cover = cover;
            state.images = images;
        },
        addFeature : (state,action) => {
            state.features.push(action.payload);
        },
        removeFeature : (state,action) => {
            const newArray = state.features.filter((feature)=> feature !== action.payload);
            state.features = newArray;
        }
    }
})


export const {changeInput,addImages,addFeature,removeFeature} = gigSlice.actions;

export const gigReducer = gigSlice.reducer;