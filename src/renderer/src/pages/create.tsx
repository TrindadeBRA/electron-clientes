import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { NewCustomer } from "~/src/shared/types/ipc"

interface DataMutation {
  name: string
  email: string
  role: string
  phone: string
  address: string
}

export default function Create() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement | null>(null)
  const addressRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const roleRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)

  const { isPending, mutateAsync: createCustomer } = useMutation({

    mutationFn: async (data: DataMutation) => {
      await window.api.addCustomer({
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        address: data.address,
        status: true
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.error(error)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      navigate('/')
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const role = roleRef.current?.value
    const phone = phoneRef.current?.value
    const address = addressRef.current?.value

    if (!name || !email || !role || !phone || !address) {
      alert("Preencha todos os campos")
      return
    }


  await createCustomer({
      name,
      email,
      role,
      phone,
      address
    })

  }
  return (
    <>
      <div className="flex-1 flex flex-col py-12 text-white items-center">
        <div className="px-10">
          <h1 className="text-xl lg:text-2xl font-semibold mb-4">Cadastrar Cliente</h1>
        </div>


        <form className="w-full max-w-96 mt-4" onSubmit={handleAddCustomer}>

          <div className="mb-2">
            <label className="text-base">Nome</label>
            <input
              type="text"
              placeholder="Digite o nome do cliente"
              className="w-full h-9 rounded-md bg-gray-800 px-2"
              ref={nameRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-base">Endereço</label>
            <input
              type="text"
              placeholder="Digite o endereço do cliente"
              className="w-full h-9 rounded-md bg-gray-800 px-2"
              ref={addressRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-base">Email</label>
            <input
              type="text"
              placeholder="Digite o email do cliente"
              className="w-full h-9 rounded-md bg-gray-800 px-2"
              ref={emailRef}
            />
          </div>

          <div className="mb-2">
            <label className="text-base">Cargo</label>
            <input
              type="text"
              placeholder="Digite o cargo do cliente"
              className="w-full h-9 rounded-md bg-gray-800 px-2"
              ref={roleRef}
            />
          </div>

          <div className="mb-8">
            <label className="text-base">Telefone</label>
            <input
              type="text"
              placeholder="Digite o telefone do cliente"
              className="w-full h-9 rounded-md bg-gray-800 px-2"
              ref={phoneRef}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 rounded flex items-center justify-center w-full h-9"
            disabled={isPending}
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

        </form>
      </div>


    </>
  )
}
