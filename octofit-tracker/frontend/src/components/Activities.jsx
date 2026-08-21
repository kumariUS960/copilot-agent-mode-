import ResourceList from './ResourceList.jsx'

// endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
export default function Activities() {
  return <ResourceList resource="activities" title="Activities" description="Track movement, effort, and progress in one place." />
}
