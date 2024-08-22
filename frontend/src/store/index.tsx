import { createSlice, PayloadAction } from "@reduxjs/toolkit";



// ListSlice==================================================================>>
interface List{
    listState:string
};

const initialListState:List = { listState: "" };

export const listSlice = createSlice({
    name:"list",
    initialState:initialListState,
    reducers:{
        
        SET_LISTSTATE_HANDLER(state,action: PayloadAction<List>){
           const {listState}  = action.payload;
           console.log(listState)
            state.listState = listState
        },
    }
});

// AuthFormSlice==================================================================>>

interface AuthForm{
    showForm:boolean,
    showMobileLogin:boolean
};

const initialAuthFormState:AuthForm = {showForm:false,showMobileLogin:false};

export const authFormSlice = createSlice({
    name:"authForm",
    initialState:initialAuthFormState,
    reducers:{
        SHOW_FORM(state){
            state.showForm = true
        },
        HIDE_FORM(state){
            state.showForm = false;
        },
        // mobile login button
        SHOW_MOBILE_LOGIN_BTN(state){
            state.showMobileLogin = true;
        },
        HIDE_MOBILE_LOGIN_BTN(state){
            state.showMobileLogin = false
        },
        TOGGLE_MOBILE_BTN(state){
            state.showMobileLogin= !state.showMobileLogin
        }
    }
})

// export default listSlice.reducer;

export const listActions = listSlice.actions;
export const authFormActions = authFormSlice.actions;
