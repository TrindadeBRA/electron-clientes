export default function Home() {



  async function handleFetchUsers() {
    const response = await window.api.fetchAllCustomers()
    console.log(response)
  }
  
  return (
    <div className="">
      <h3>Home</h3>
      <button onClick={handleFetchUsers}>Fetch Users</button>
    </div>
  )
}
