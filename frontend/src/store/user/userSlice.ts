import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    userId: number;
    name: string;
    email: string;
    walletId: number;
    wallet_number: string;
    profileImage: string;
    amount: string;
}

const initialState: UserState = {
    userId: 0,
    name: "",
    email: "",
    walletId: 0,
    wallet_number: "",
    profileImage: "",
    amount: "",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.walletId = action.payload.walletId;
            state.wallet_number = action.payload.wallet_number;
            state.profileImage = action.payload.profileImage;
            state.amount = action.payload.amount;
        }
    }
})

export default userSlice
export const { setUserState } = userSlice.actions