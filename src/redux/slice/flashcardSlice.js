import { createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState: {
    flashcard: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setFlashcard: (state, action) => {
      const { flashcard } = action.payload;
      state.flashcard = flashcard;
    },
  },
});

export const { setFlashcard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
