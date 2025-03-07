import { ipcMain } from 'electron'

ipcMain.handle("fetch-users", () => {
    console.log("Buscando usuários...")

    return [
        {
            id: 1,
            name: "John Doe"
        },
        {
            id: 2,
            name: "Jane Doe"
        },
        {
            id: 3,
            name: "John Smith"
        },
    ]
})  