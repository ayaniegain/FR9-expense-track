import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>This page took a wrong turn.</h1>
      <p>The page you’re looking for doesn’t exist or may have moved.</p>
      <Link className="button button-primary" to="/">Back to overview</Link>
    </section>
  )
}
