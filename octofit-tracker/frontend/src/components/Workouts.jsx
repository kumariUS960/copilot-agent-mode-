import ResourceList from './ResourceList.jsx'

// endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export default function Workouts() {
  return <ResourceList resource="workouts" title="Workouts" description="Find the next challenge that fits your goals." />
}
