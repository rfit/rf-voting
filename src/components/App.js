import React from 'react'
import ReactDOM from 'react-dom'

import {Container} from './Container/Container'

// dummy project data
const items = [
  {
    name: 'Mustafas barber salon',
    id: 'mustafa'
  },
  {
    name: 'Silas dansebar',
    id: 'silas'
  },
  {
    name: 'Bojack Horsemans Liquor Store',
    id: 'bojack'
  },
  {
    name: 'The Chinese Emperor',
    id: 'china'
  },
  {
    name: 'Powerpuff Pigerne',
    id: 'powerpuff'
  },
  {
    name: 'Scooby Doo',
    id: 'scooby'
  },
  {
    name: 'Rick and Morty',
    id: 'rickandmorty'
  }
]

ReactDOM.render(
  <Container items={items} />,
  document.getElementById('root')
)
