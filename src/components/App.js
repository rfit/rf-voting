import React from 'react'
import ReactDOM from 'react-dom'

import {Poll} from './Poll/Poll.component'

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
  }
]

ReactDOM.render(
  <Poll items={items} />,
  document.getElementById('root')
)
