import { Movie } from "@/components/GetMovies";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IMovieSlice {
    data: Movie[]
}

const initialState: IMovieSlice = {
    data: []
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Movie[]>)=>{
            state.data = action.payload;
        }
    }
});

export const movieActions = movieSlice.actions;
export const movieReducer = movieSlice.reducer;