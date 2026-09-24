
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <h1 className="text-xl font-bold text-slate-900">
            Cancer Treatment Journey
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome
        </h2>

        <p className="mt-2 text-slate-600">
          Track appointments, treatment progress, medications and
          important health information in one place.
        </p>
      </main>
    </div>
  )
}

export default App