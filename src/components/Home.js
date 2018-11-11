import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class Home extends React.Component {


  render() {
    const { user } = this.props.stores

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {user.users && user.users.map(user => (
              <UserRow user={user} key={user.phone} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home

const UserRow = ({user}) => (
  <tr>
    <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td><img src={user.picture.large} /></td>
  </tr>
)