import React, { useState } from 'react'
import { fetchPokemon, suspenseify } from './api'

let initialPokemon = suspenseify(fetchPokemon(2))

export default function PokemonDetail() {
  let [pokemonResource, setPokemonResource] = useState(initialPokemon)
  let [startTransition] = React.useTransition()
  let pokemon = pokemonResource.read()
  return (
    <div>
      {pokemon.name}{' '}
      <button
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
