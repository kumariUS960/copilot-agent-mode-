import ResourceList from './ResourceList.jsx'

// endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
export default function Teams() {
  return <ResourceList resource="teams" title="Teams" description="Build a little momentum with your community." />
}
