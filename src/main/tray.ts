import { Tray, Menu, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export default function createTray(mainWindow: BrowserWindow) {
    const appIcon = path.join(__dirname, 'resources', 'menu-template.png')
    let icon = nativeImage.createFromPath(appIcon)

    const tray = new Tray(icon)

    const menu = Menu.buildFromTemplate([
        {
            label: 'Dev Clientes',
            enabled: false,
        },
        {
            type: "separator"
        },
    ])

    tray.setContextMenu(menu)

}