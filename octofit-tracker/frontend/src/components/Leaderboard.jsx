import ResourceList from './ResourceList.jsx'

// endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  return <ResourceList resource="leaderboard" title="Leaderboard" description="See how teams and students are moving together." />
}
