import { NewCustomer } from "~/src/shared/types/ipc"

export default function Create() {

  const handleAddCustomer = async () => {

    const doc: NewCustomer
     = {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      phone: "1234567890",
      address: "1234 Main St, Anytown, USA",
      status: true
    }

    const result = await window.api.addCustomer(doc)
    console.log(result)
  }
  return (
    <>

      <button onClick={handleAddCustomer}>Cadastrar</button>

    </>
  )
}
