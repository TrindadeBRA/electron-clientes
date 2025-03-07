import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function Home() {

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await window.api.fetchAllCustomers()
      return response
    }
  })


  // async function handleFetchUsers() {
  //   const response = await window.api.fetchAllCustomers()
  //   console.log(response)
  // }

  // async function handleFetchCustomerById() {
  //   const response = await window.api.fetchCustomerById("4fcf46ff-e408-4994-b286-26f43c1703ca")
  //   console.log(response)
  // }

  // async function handleDeleteCustomer() {
  //   const response = await window.api.deleteCustomer("4fcf46ff-e408-4994-b286-26f43c1703ca")
  //   console.log(response)
  // }



  return (
    <div className="">
      <div className="flex-1 flex flex-col py-12 text-white">
        <div className="px-10">
          <h1 className="text-xl lg:text-2xl font-semibold mb-4">Todos Clientes</h1>
        </div>

        <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]">
          {data?.map((customer) => (
            <Link key={customer._id} to={`/`} className="bg-gray-800 px-4 py-3 rounded">
              <p className="mb-2 font-semibold text-lg">{customer.name}</p>
              <p><span className="font-semibold">Email:</span> {customer.email}</p>
              {customer.phone && (
                <p><span className="font-semibold">Telefone:</span> {customer.phone}</p>
              )}
            </Link>
          ))}
        </section>
      </div>

    </div>
  )
}
