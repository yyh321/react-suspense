import React from 'react'
export function DelaySpinner() {
  return (
    <span role="img" aria-label="spinner" className="DelaySpinner">
      <style>
        {`
  .DelaySpinner {
    animation: rotation 1.5s infinite linear;
    display:inline-block;
    font-size:.7rem;
    color: red;
  }
  @keyframes rotation {
    from {transform: rotate(0deg)}
    to {transform: rotate(359deg)}
  }
`}
      </style>
      🌀
    </span>
  )
}
