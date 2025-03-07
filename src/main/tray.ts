import { Tray, Menu, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export default function createTray(window: BrowserWindow) {
    const appIcon = path.join(__dirname, 'resources', 'menu-template.png')
    let icon = nativeImage.createFromPath(appIcon)

    const tray = new Tray(icon)

    const menu = Menu.buildFromTemplate([
        {
            label: 'DevClientes',
            enabled: false,
        },
        {
            type: "separator"
        },
        {
            label: 'Cadastrar Cliente',
            click: () => {
                window.webContents.send('new-customer')
                
                if(window.isMinimized()) {
                    window.restore()
                }

                window.focus()
            }
        },
    ])

    tray.setContextMenu(menu)

}