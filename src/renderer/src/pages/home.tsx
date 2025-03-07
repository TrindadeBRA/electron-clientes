export default function Home() {



  async function handleFetchUsers() {
    const response = await window.api.fetchAllCustomers()
    console.log(response)
  }

  async function handleFetchCustomerById() {
    const response = await window.api.fetchCustomerById("4fcf46ff-e408-4994-b286-26f43c1703ca")
    console.log(response)
  }

  async function handleDeleteCustomer() {
    const response = await window.api.deleteCustomer("4fcf46ff-e408-4994-b286-26f43c1703ca")
    console.log(response)
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>Home</h3>
      <button onClick={handleFetchUsers}>Fetch Users</button>
      <button onClick={handleFetchCustomerById}>Fetch Customer By Id</button>
      <button onClick={handleDeleteCustomer}>Delete Customer</button>
    </div>
  )
}
