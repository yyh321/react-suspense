import React, { lazy, Suspense, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { fetchPokemon, suspenseify } from './api'
const PokemonDetail = lazy(() => import('./pokemon-detail'))

let initialPokemon = suspenseify(fetchPokemon(1))

export default function App() {
  let [pokemon, setPokemon] = useState(initialPokemon)
  let deferredPokemon = React.useDeferredValue(pokemon, { timeoutMs: 3000 })
  let deferredPokemonIsStale = deferredPokemon !== pokemon
  let [startTransition] = React.useTransition()
  return (
    <div>
      <h1>Pokedex</h1>
      <ErrorBoundary fallback="Something is Wrong!">
        <Suspense fallback={'Loading your Pokemon...'}>
          <PokemonDetail
            resource={deferredPokemon}
            isStale={deferredPokemonIsStale}
          />
          <button
            type="button"
            disabled={deferredPokemonIsStale}
            onClick={() =>
              startTransition(() =>
                setPokemon(
                  suspenseify(fetchPokemon(deferredPokemon.read().id + 1)),
                ),
              )
            }
          >
            下一个
          </button>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
