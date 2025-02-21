import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchUsers = createAsyncThunk<
  any, // Define the return type (you can replace `any` with a proper type)
  number // Define the argument type (userId is a number)
>("users/fetchUsers", async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (response.ok) {
    return await response.json();
  }
});

export const loadAll = createAsyncThunk("users/loadAll", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (response.ok) {
    return await response.json();
  }
});

export interface UserState {
  users: any[];
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
      state.users = [...state.users, action.payload];
      console.log(current(state));
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {});

    builder.addCase(loadAll.fulfilled, (state, action) => {
      state.users = [...action.payload];
      console.log(current(state));
    });
    builder.addCase(loadAll.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
