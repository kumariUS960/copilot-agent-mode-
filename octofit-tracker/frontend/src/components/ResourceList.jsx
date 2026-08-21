import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

function recordTitle(record, index) {
  return record.name || record.username || record.activity || record.type || record.title || record._id || `Record ${index + 1}`
}

export default function ResourceList({ resource, title, description }) {
  const [state, setState] = useState({ records: [], count: 0, loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchResource(resource)
      .then((result) => {
        if (active) setState({ ...result, loading: false, error: '' })
      })
      .catch((error) => {
        if (active) setState({ records: [], count: 0, loading: false, error: error.message })
      })
    return () => {
      active = false
    }
  }, [resource])

  return (
    <section className="resource-page">
      <div className="page-heading">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {state.loading && <p className="status">Loading {title.toLowerCase()}...</p>}
      {state.error && <p className="status error">{state.error}</p>}
      {!state.loading && !state.error && (
        <>
          <div className="result-summary">{state.count} {state.count === 1 ? 'record' : 'records'}</div>
          {state.records.length === 0 ? (
            <p className="status">No records yet.</p>
          ) : (
            <div className="record-grid">
              {state.records.map((record, index) => (
                <article className="record-card" key={record._id || index}>
                  <h2>{recordTitle(record, index)}</h2>
                  <pre>{JSON.stringify(record, null, 2)}</pre>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
