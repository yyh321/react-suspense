import React, { lazy, Suspense, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { fetchPokemon, suspenseify, fetchPokemonCollection } from './api'
const PokemonDetail = lazy(() => import('./pokemon-detail'))

let initialPokemon = suspenseify(fetchPokemon(1))
let initialCollection = suspenseify(fetchPokemonCollection())

function PokemonCollection() {
  return (
    <div>
      {initialCollection.read().results.map(pokemon => (
        <li key={pokemon.name}> {pokemon.name} </li>
      ))}
    </div>
  )
}

export default function App() {
  let [pokemon, setPokemon] = useState(initialPokemon)
  let deferredPokemon = React.useDeferredValue(pokemon, { timeoutMs: 3000 })
  let deferredPokemonIsStale = deferredPokemon !== pokemon
  let [startTransition] = React.useTransition()
  return (
    <div>
      <h1>Pokedex</h1>
      <React.SuspenseList revealOrder="forwards">
        <Suspense fallback={<div>Fetch Pokemon...</div>}>
          <ErrorBoundary fallback="Something is Wrong!">
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
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={<div>Fetching the Database...</div>}>
          <ErrorBoundary fallback={"Couldn't catch em all"}>
            <PokemonCollection />
          </ErrorBoundary>
        </Suspense>
      </React.SuspenseList>
    </div>
  )
}
