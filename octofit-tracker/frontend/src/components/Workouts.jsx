import ResourceList from './ResourceList.jsx'

// endpoint: /api/workouts/
export default function Workouts() {
  return <ResourceList resource="workouts" title="Workouts" description="Find the next challenge that fits your goals." />
}
