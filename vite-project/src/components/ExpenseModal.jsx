import { useEffect } from 'react'
import ExpenseForm from './ExpenseForm'

export default function ExpenseModal({ isOpen, onClose, expense, onSubmit }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="expense-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">EXPENSE DETAILS</span>
            <h2 id="expense-modal-title">{expense ? 'Edit expense' : 'Add an expense'}</h2>
            <p>Keep the little things in view.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
        </div>
        <ExpenseForm
          key={expense?.id ?? 'new'}
          initialData={expense}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </section>
    </div>
  )
}
