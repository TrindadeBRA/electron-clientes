import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Trash } from 'phosphor-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Detail() {
  const { id } = useParams<{ id: string }>()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data, isFetching } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => window.api.fetchCustomerById(id!),
  })

  const { isPending, mutateAsync: handleDeleteCustomer } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await window.api.deleteCustomer(id)
        console.log("CLIENTE DELETADO COM SUCESSO!")
      } catch (err) {
        console.log(err)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate("/")
    }
  })

  return (
    <div className='flex-1 flex flex-col py-12 px-10 text-white'>
      <Link to="/" className='flex items-center gap-2 mb-2'>
        <ArrowLeft className='size-6 text-white' />
        <span>Voltar</span>
      </Link>

      <h1 className='text-xl font-semibold mb-4'>Detalhes do cliente</h1>

      <section className='flex flex-col gap-6 w-full'>
        {!isFetching && data && (
          <article className='w-full relative flex flex-col gap-1'>
            <section className='☐ bg-gray-800 rounded px-4 py-3'>
              <p className='mb-2 font-semibold text-lg'>{data.name}</p>
              <p>
                <span className='font-semibold'>Email: </span>{data.email}
              </p>
              {data.address && (
                <p>
                  <span className='font-semibold' >Endereço: </span> {data.address}
                </p>
              )}
              {data.phone && (
                <p>
                  <span className='font-semibold'>Telefone: </span>{data.phone}
                </p>
              )}

              <div className='absolute -top-3 right-2'>
                <button className='☐ bg-red-500 ☐ hover:bg-red-600 p-2 rounded-full z-20' onClick={() => handleDeleteCustomer(data._id)} disabled={isPending}>
                  <Trash className='text-white h-6 w-6' />
                </button>
              </div>

            </section>
            <section className='☐ bg-gray-800 rounded px-4 py-3'>
              {data.role && (
                <p>
                  <span className='font-semibold'>Cargo: </span>{data.role}
                </p>
              )}
              <p>
                <span className='font-semibold'>Status Atual: </span>{data.status ? "Ativo" : "Inativo"}
              </p>
            </section>
          </article>
        )}
      </section>
    </div>
  )
}
