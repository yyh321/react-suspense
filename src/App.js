import React, { lazy, Suspense, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'
import { fetchPokemon, suspenseify, fetchPokemonCollection } from './api'
const PokemonDetail = lazy(() => import('./pokemon-detail'))

let initialPokemon = suspenseify(fetchPokemon(1))
let initialCollection = suspenseify(fetchPokemonCollection())

function PokemonCollection(props) {
  return <List items={initialCollection.read().results} {...props} />
}

function List({
  as: As = React.Fragment,
  items = [],
  renderItem = item => <div>{item.name}</div>,
}) {
  return <As>{items.map(renderItem)}</As>
}

export default function App() {
  let [pokemon, setPokemon] = useState(initialPokemon)
  // let [collection, setCollection] = useState(initialCollection)
  let deferredPokemon = React.useDeferredValue(pokemon, { timeoutMs: 3000 })
  let deferredPokemonIsStale = deferredPokemon !== pokemon
  let [startTransition] = React.useTransition()
  return (
    <div>
      <h1>Pokedex</h1>
      <React.SuspenseList revealOrder="forwards" tail="collapsed">
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
            <PokemonCollection
              renderItem={pokemon => (
                <li style={{ listStyle: 'none' }} key={pokemon.name}>
                  <button
                    style={{
                      padding: '5px',
                      margin: '4px',
                      width: '80px',
                      color: 'red',
                    }}
                    type="button"
                    onClick={() =>
                      startTransition(() =>
                        setPokemon(suspenseify(fetchPokemon(pokemon.id))),
                      )
                    }
                  >
                    {' '}
                    {pokemon.name}{' '}
                  </button>
                </li>
              )}
            />
          </ErrorBoundary>
        </Suspense>
      </React.SuspenseList>
    </div>
  )
}
