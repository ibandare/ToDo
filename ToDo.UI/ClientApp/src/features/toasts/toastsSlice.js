import {createSlice, nanoid} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    toasts: [],
}

const toastsSlice = createSlice({
    name: 'toasts',
    initialState,
    reducers: {
        addToast: (
            state,
            {payload}
        ) => {
            const notification = {
                id: nanoid(),
                ...payload,
            }

            state.toasts.push(notification)
        },
        dismissToast: (
            state,
            {payload}
        ) => {
            const index = state.toasts.findIndex(
                (notification) => notification.id === payload
            )

            if (index !== -1) {
                state.toasts.splice(index, 1)
            }
        },
    },
});

const {reducer, actions} = toastsSlice;

// Actions
export const {addToast, dismissToast} = actions;

// Selectors
const selectToasts = (state) => state.toasts.toasts;

// Hooks
export const useToasts = () => useSelector(selectToasts);

export default reducer;
