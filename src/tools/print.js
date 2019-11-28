/**
 * 获取打印机列表
 * @param {Obejct} window mainWindow 窗口化实例
 * @returns {Array} 打印机对象列表
 */
export const getPrinter = (window) => {
    // 获取打印机
    const content = window.webContents
    return content.getPrinters()
}