import fetch from 'isomorphic-fetch'

export function fetchUsers() {
  return fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(res => res.results)
}
