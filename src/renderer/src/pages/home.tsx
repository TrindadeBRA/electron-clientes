export default function Home() {



  async function handleFetchUsers() {
    const users = await window.api.fetchUsers()
    console.log(users)
  }
  
  return (
    <div className="">
      <h3>Home</h3>
      <button onClick={handleFetchUsers}>Fetch Users</button>
    </div>
  )
}
