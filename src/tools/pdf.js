const { machineIdSync } = require('node-machine-id')
/**
 * 数据输出为pdf文件
 * @param {Obejct} window mainWindow 窗口化实例
 * @returns {Array} 打印机对象列表
 */
export const toFile = (window, path, data) => {
    return new Promise((resolve, reject) => {
        const content = window.webContents
        content.printToPDF(data, (e, data) => {
            if (e) {
                return reject(e)
            }
            fs.writeFile(path, data, (error) => {
                if (error) {
                    return reject(error)
                }
                // 机器码 TODO
                // let id = machineIdSync()
                // console.log('写文件成功.', id)
                return resolve({})
            })
        })
    })
}