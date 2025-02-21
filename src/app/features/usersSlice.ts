import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchUsers = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (response.ok) {
      return await response.json();
    } else {
      throw "Error";
    }
  }
);

export interface UserState {
  users: [];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
