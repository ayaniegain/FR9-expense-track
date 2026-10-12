import { useState } from 'react'

const today = () => {
  const date = new Date()
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export default function ExpenseForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    date: initialData?.date ?? today(),
    amount: initialData?.amount != null ? String(initialData.amount) : '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = form.name.trim()
    const amount = Number(form.amount)
    const parsedDate = new Date(`${form.date}T00:00:00`)

    if (!name) {
      setError('Please enter an expense name.')
      return
    }
    if (!form.date || Number.isNaN(parsedDate.getTime())) {
      setError('Please select a valid date.')
      return
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be greater than zero.')
      return
    }

    onSubmit({ name, date: form.date, amount })
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="expense-name">Expense name</label>
        <input
          id="expense-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Weekly groceries"
          maxLength={100}
          autoFocus
          required
        />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            max={today()}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="expense-amount">Amount <span>(INR)</span></label>
          <div className="amount-input">
            <span aria-hidden="true">₹</span>
            <input
              id="expense-amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0.01"
              max="1000000000"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button className="button button-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="button button-primary" type="submit">
          {initialData ? 'Save changes' : 'Add expense'}
        </button>
      </div>
    </form>
  )
}
