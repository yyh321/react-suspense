import React, { useState } from 'react'
import { fetchPokemon, suspenseify } from './api'
import { DelaySpinner } from './ui'
let initialPokemon = suspenseify(fetchPokemon(2))

export default function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = useState(initialPokemon)
  let [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 })
  let pokemon = pokemonResource.read()
  return (
    <div>
      <div>
        {pokemon.name} {isPending && <DelaySpinner />}
      </div>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() =>
            setPokemonResource(suspenseify(fetchPokemon(pokemon.id + 1))),
          )
        }
      >
        下一个
      </button>
    </div>
  )
}
