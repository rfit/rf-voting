import React, {PropTypes} from 'react'

import {Item} from './Item.component'
import {Submit}   from './Submit.component'

export const Poll = (props) => {
  let pollError
  if (props.pollError) {
    pollError = 'Please select 3 projects'
  }

  return (
    <div>
      <h1>This is RF Poll!</h1>
      <p>Take a look at our project thingies:</p>
      {
        props.items.map((item) => {
          let selected = false
          if (props.selectedItems.indexOf(item.id) > -1) {
            selected = true
          }

          return (
            <div key={item.id}>
              <Item
                name={item.name}
                id={item.id}
                onButtonClick={(e) => props.itemSelect(e)} // eslint-disable-line
                selected={selected} />
              <br />
            </div>
          )
        })
      }
      <br />
      <h4 style={{'color': 'red'}}>{pollError}</h4>
      <Submit submitAction={props.submitAction} />
    </div>
  )
}

Poll.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  submitAction: PropTypes.func.isRequired,
  itemSelect: PropTypes.func.isRequired,
  pollError: PropTypes.bool.isRequired
}

Poll.displayName = 'Poll'
