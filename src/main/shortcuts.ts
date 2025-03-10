import { app, BrowserWindow, globalShortcut } from "electron";

export function registerShortcuts(mainWindow: BrowserWindow) {

    app.on('browser-window-focus', () => {
        globalShortcut.register('CommandOrControl+R', () => {
            mainWindow.reload()
        })

        globalShortcut.register('CommandOrControl+N', () => {
            mainWindow.webContents.send('new-customer')
        })
    })

    app.on('browser-window-blur', () => {
        globalShortcut.unregisterAll()
    })

}