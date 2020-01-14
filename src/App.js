import React, { lazy, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'
// import PokemonDetail from './pokemon-detail'
// create an import error by giving React.lazy a promise.reject()
const PokemonDetail = lazy(() => import('./pokemon-detail'))

export default function App() {
  return (
    <div>
      <ErrorBoundary fallback="Something is Wrong!">
        <Suspense fallback={'Loading your Pokemon...'}>
          <PokemonDetail />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
