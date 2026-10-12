import { createSlice, nanoid } from '@reduxjs/toolkit'

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload)
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions

export const addExpenseThunk = (expense) => (dispatch) => {
  dispatch(addExpense({ ...expense, id: nanoid() }))
}

export const selectExpenses = (state) => state.expenses.items

export default expenseSlice.reducer
