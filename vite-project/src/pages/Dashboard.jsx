import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ExpenseModal from '../components/ExpenseModal'
import ExpenseTable from '../components/ExpenseTable'
import SummaryCard from '../components/SummaryCard'
import { addExpenseThunk, selectExpenses } from '../features/expenses/expenseSlice'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export default function Dashboard() {
  const dispatch = useDispatch()
  const expenses = useSelector(selectExpenses)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const recentExpenses = [...expenses]
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, 5)

  const handleAddExpense = (expense) => {
    dispatch(addExpenseThunk(expense))
    setIsModalOpen(false)
  }

  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <button className="button welcome-button" type="button" onClick={() => setIsModalOpen(true)}>
            <span aria-hidden="true"></span> Add expense
          </button>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card">
            <div className="art-card-top"><span>THIS MONTH</span><span className="art-dots">•••</span></div>
            <strong>₹ —</strong>
            <div className="art-bars"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <span className="art-spark spark-one">✦</span>
          <span className="art-spark spark-two">✧</span>
        </div>
      </section>

  

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Recent expenses</h2>
          </div>
          <Link to="/expenses" className="text-link">
            See all expenses <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ExpenseTable expenses={recentExpenses} readOnly />
      </section>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expense={null}
        onSubmit={handleAddExpense}
      />
    </div>
  )
}
