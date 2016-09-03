import Reqwest from 'reqwest'

export const submitHandler = (selectedItems) => {
  Reqwest({
    url: '/api/submit',
    method: 'POST',
    type: 'CORS',
    data: {items: selectedItems}
  })
  .then((resp) => {
    console.log('Server replied with:', resp)
  })
  .fail((err, msg) => {
    console.warn('Error:', err)
    console.warn('Server replied with error message:', msg)
  })
}
