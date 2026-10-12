import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseModal from '../components/ExpenseModal'
import ExpenseTable from '../components/ExpenseTable'
import SearchBar from '../components/SearchBar'
import {
  addExpenseThunk,
  deleteExpense,
  selectExpenses,
  updateExpense,
} from '../features/expenses/expenseSlice'

export default function Expenses() {
  const dispatch = useDispatch()
  const expenses = useSelector(selectExpenses)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)

  const filteredExpenses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return [...expenses]
      .filter((expense) => expense.name.toLowerCase().includes(query))
      .sort((first, second) => second.date.localeCompare(first.date))
  }, [expenses, search])

  const handleAdd = () => {
    setSelectedExpense(null)
    setIsModalOpen(true)
  }

  const handleEdit = (expense) => {
    setSelectedExpense(expense)
    setIsModalOpen(true)
  }

  const handleSubmit = (formData) => {
    if (selectedExpense) {
      dispatch(updateExpense({ ...selectedExpense, ...formData }))
    } else {
      dispatch(addExpenseThunk(formData))
    }
    setIsModalOpen(false)
    setSelectedExpense(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpense(id))
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedExpense(null)
  }

  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <span className="eyebrow">ALL YOUR SPENDING, IN ONE PLACE</span>
          <h1>Expenses</h1>
          <p>Search, update, and manage your expense records.</p>
        </div>
        <button className="button button-primary add-button" type="button" onClick={handleAdd}>
          <span aria-hidden="true">＋</span> Add expense
        </button>
      </section>

      <section className="content-card">
        <div className="section-heading expense-list-heading">
          <div>
            <h2>All records</h2>
            <p>Showing {filteredExpenses.length} of {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}</p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        expense={selectedExpense}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
