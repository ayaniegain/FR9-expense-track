const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export default function ExpenseTable({ expenses, onEdit, onDelete, readOnly = false }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">₹</span>
        <h3>No expenses yet</h3>
        <p>Your expenses will show up here once you add your first one.</p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="expense-table">
        <thead>
          <tr>
            <th scope="col">Expense</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            {!readOnly && <th scope="col" className="actions-heading">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                <div className="expense-name-cell">
                  <span className="expense-avatar" aria-hidden="true">
                    {expense.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="expense-name">{expense.name}</span>
                </div>
              </td>
              <td className="date-cell">
                {dateFormat.format(new Date(`${expense.date}T00:00:00`))}
              </td>
              <td className="amount-cell">{currency.format(expense.amount)}</td>
              {!readOnly && (
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="row-action edit-action"
                      onClick={() => onEdit(expense)}
                      aria-label={`Edit ${expense.name}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="row-action delete-action"
                      onClick={() => onDelete(expense.id)}
                      aria-label={`Delete ${expense.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
