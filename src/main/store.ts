import { app, ipcMain } from "electron"
import PouchDB from "pouchdb"
import path from "node:path"
import fs from "node:fs"
import { Customer, NewCustomer } from "../shared/types/ipc"
import { randomUUID } from "node:crypto"

//Determinar caminmho base para o db no OS
let dbPath
if(process.platform === "darwin") {
    dbPath = path.join(app.getPath("appData"), "devclientes", "my_db")
} else {
    dbPath = path.join(app.getPath("userData"), "my_db")
}

//verificar se o db existe
const dbDir = path.dirname(dbPath)
if(!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
}

//criar o db
const db = new PouchDB<Customer>(dbPath)


//funcao para add no db
const addCustomer = async (doc: NewCustomer): Promise<PouchDB.Core.Response | void> => {
    const id = randomUUID();

    const data: Customer = {
        ...doc,
        _id: id,
    }

    return db.put(data)
        .then((res) => res)
        .catch((err) => console.error("Erro ao adicionar cliente", err))
}

ipcMain.handle("add-customer", async (event, doc: NewCustomer) => {
    const result = await addCustomer(doc);
    return result;
})


//funcao para buscar todos os clientes
async function fetchAllCustomers(): Promise<Customer[]> {
    
    try {
        const result = await db.allDocs({ include_docs: true })
        return result.rows.map((row) => row.doc as Customer)
    } catch (error) {
        console.error("Erro ao buscar todos os clientes", error)
        return []
    }


}

ipcMain.handle("fetch-all-customers", async () => {
    const result = await fetchAllCustomers();
    return result;
})



//buscar cliente por id
async function fetchCustomerById(docId: string): Promise<Customer | null> {
    return db.get(docId)
        .then((res) => res)
        .catch((err) => {
            console.error("Erro ao buscar cliente por id", err)
            return null
        })
}

ipcMain.handle("fetch-customer-id", async (event, docId: string) => {
    const result = await fetchCustomerById(docId);
    return result;
})


//remover cliente
async function deleteCustomer(docId: string): Promise<PouchDB.Core.Response | null> {

    try {
        const doc = await db.get(docId)
        const result = await db.remove(doc?._id, doc?._rev)
        return result
    } catch (error) {
        console.error("Erro ao remover cliente", error)
        return null
    }


}

ipcMain.handle("delete-customer", async (event, docId: string): Promise<PouchDB.Core.Response | null> => {
    const result = await deleteCustomer(docId);
    return result;
})