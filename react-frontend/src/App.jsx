import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  
  const hostUrl = import.meta.env.PROD
    ? window.location.href
    : "http://localhost:8080/";
  

  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
  };  
  useEffect(() => {
    fetchUsers();
  }, []);
    return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.isAdmin.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
