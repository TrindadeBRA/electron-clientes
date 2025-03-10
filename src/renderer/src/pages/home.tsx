import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export default function Home() {

  const { data, isFetching } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await window.api.fetchAllCustomers()
      return response
    }
  })

  return (
    <div className="">
      <div className="flex-1 flex flex-col py-12 text-white">
        <div className="px-10">
          <h1 className="text-xl lg:text-2xl font-semibold mb-4">Todos Clientes</h1>
        </div>

        {isFetching && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        <section className="flex flex-col gap-6 w-full h-screen overflow-y-auto px-10 pb-[200px]">
          {data?.map((customer) => (
            <Link key={customer._id} to={`/customer/${customer._id}`} className="bg-gray-800 px-4 py-3 rounded">
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
