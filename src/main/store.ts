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