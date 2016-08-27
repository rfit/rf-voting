import React from 'react'
import ReactDOM from 'react-dom'

import {Poll} from './Poll/Poll.component'

// dummy project data
const items = [
  {
    name: 'Mustafas barber salon'
  },
  {
    name: 'Silas dansebar'
  },
  {
    name: 'Bojack Horsemans Liquor Store'
  }
]

ReactDOM.render(
  <Poll items={items} />,
  document.getElementById('root')
)
