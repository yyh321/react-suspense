import React, { useState } from 'react'
import { DelaySpinner } from './ui'

export default function PokemonDetail({ resource, isStale }) {
  let pokeman = resource.read()
  return (
    <div>
      <div style={isStale ? { opacity: 0.5 } : null}>
        {pokeman.name}
        {isStale && <DelaySpinner />}
      </div>
    </div>
  )
}
