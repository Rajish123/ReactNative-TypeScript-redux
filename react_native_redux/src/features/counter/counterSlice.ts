import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface CounterState {
    count:number;
    changeValue:string;
}

const initialState:CounterState={
    count:10,
    changeValue:'1'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        console.log("increment() called with state:", state);
        return {
          ...state,
          count: state.count + parseInt(state.changeValue),
        };
      },
      decrement: (state) => {
        return {
          ...state,
          count: state.count - parseInt(state.changeValue)
        };
      },
      changestateValue: (state, action: PayloadAction<{changeValue:string}>) => {
        state.changeValue  = action.payload.changeValue
      },
    },
})

export const { increment, decrement, changestateValue } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.count

export default counterSlice.reducer