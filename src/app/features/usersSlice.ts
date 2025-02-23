import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk<any>( // Define the return type (you can replace `any` with a proper type)
  "users/fetchStudents",
  async () => {
    const response = await fetch(`http://localhost:3000/students`);
    if (response.ok) {
      return await response.json();
    }
  }
);

export const saveStudents = createAsyncThunk<
  any,
  { students: any[]; index: number }
>(
  "users/saveStudents",
  async ({ students, index }: { students: any[]; index: number }) => {
    const studentData = students[index];
    const response = await fetch(
      `http://localhost:3000/students/${studentData.id}`,
      {
        method: "PUT", // or PATCH
        body: JSON.stringify(studentData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { data, index }; // return the data and the index
    }
  }
);

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
  students: any[];
}

const initialState: UserState = {
  users: [],
  students: [],
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
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(saveStudents.fulfilled, (state, action) => {
      state.students[action.payload.index] = action.payload.data;
    });
    builder.addCase(saveStudents.rejected, (state, action) => {
      state.students = [];
    });
  },
});

export default userSlice.reducer;
