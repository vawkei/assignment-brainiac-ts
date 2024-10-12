import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import authService from "./authService";

interface User {
  uid: string;
  email: string;
  displayName: string;
  isAuthenticated: boolean;
  provider: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: any
  user: User | null;
}

interface UserData {
  email: string;
  password: string;
}

interface ErrorPayload {
  msg: string;
}

const initialAuthState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  user: null,
};

//register==========================================================================>>
export const register = createAsyncThunk(
  "auth/register",
  async (userData: UserData, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      // Assert the type of error as `any` or a more specific type
      const err = error as any;
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.msg ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//login============================================================================>>
export const login = createAsyncThunk(
  "auth/login",
  async (userData: UserData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      // Assert the type of error as `any` or a more specific type
      const err = error as any;
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.msg ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

//logout======================================================================>>
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return await authService.logout();
  } catch (error) {
    // Assert the type of error as `any` or a more specific type
    const err = error as any;
    const message =
      (err.response && err.response.data && err.response.data.msg) ||
      err.msg ||
      err.toString();
    return thunkApi.rejectWithValue(message);
  }
});

//getLoginStatus===============================================================>>
export const getLoginStatus = createAsyncThunk(
  "auth/getLoginStatus",
  async (_, thunkApi) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      // Assert the type of error as `any` or a more specific type
      const err = error as any;
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.msg ||
        err.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    RESET_AUTH(state) {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
    //mind you this handles google firebase stuff right here.
    SET_USER(state, action: PayloadAction<User>) {
      if (action.payload) {
        (state.user = action.payload),
          (state.isLoggedIn = true), //as soon as ders action.payload, we confirm the user is logged in succesfully byy setting to tru.
          (state.user.isAuthenticated = action.payload.isAuthenticated);
        console.log("isAuthenticated:", state.user.isAuthenticated);
      } else {
        (state.user = null), (state.isLoggedIn = false), (state.user = null);
        console.log("isAuthenticated:", state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //register=================================================================:
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isLoggedIn = true;
        state.user = action.payload;
        state.message = action.payload.msg;
        console.log(action.payload);
        toast.success(action.payload.msg, { position: "top-left" });
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        console.log(action.payload);

        state.message = action.payload
        console.log(state.message);
        toast.error(state.message, { position: "top-left" });
      })
      //login==================================================================:
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        console.log("redux:",state.isLoggedIn)
        state.isSuccess = true;
        console.log("redux:",state.isSuccess)
        state.message = action.payload.msg;
        state.isError = false;
        state.user = action.payload.user;
        console.log(action.payload);
        toast.success(action.payload.msg, { position: "top-left" });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        // Type assertion or type guard
        const errorPayload = action.payload as ErrorPayload;

        console.log(errorPayload);
        state.message = errorPayload;
        toast.error(errorPayload.msg, { position: "top-left" });
      })
      //logout===================================================================:
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload.msg;
        console.log(action.payload);
        toast.success(action.payload.msg, { position: "top-left" });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);

        // Type assertion or type guard
        const errorPayload = action.payload as ErrorPayload;

        console.log(errorPayload);
        toast.error(errorPayload.msg, { position: "top-left" });
      })
      //getLoginStatus===========================================================:
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;

        // Check if the payload is a boolean from the server or a user object from Firebase==>>
        if (typeof action.payload === "boolean") {
          // Handling server response==========================>
          state.isLoggedIn = action.payload;
        } else if (action.payload && action.payload.uid) {
          // Handling Firebase response============================>
          state.isLoggedIn = true;
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
            isAuthenticated: true,
            provider: "firebase",
          };
        } else {
          state.isLoggedIn = false;
          state.user = null;
        }
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        console.log(action.payload);
      
      });
  },
});

//export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
export const { RESET_AUTH } = authSlice.actions;
export const { SET_USER } = authSlice.actions;
