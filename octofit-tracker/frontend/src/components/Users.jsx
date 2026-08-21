import ResourceList from './ResourceList.jsx'

// endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
export default function Users() {
  return <ResourceList resource="users" title="Users" description="Keep profiles and participation easy to find." />
}
