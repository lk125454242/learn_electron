const { app, BrowserWindow, BrowserView } = require('electron');
import { getPrinter } from './tools/print'

// 安装/卸载时处理在Windows上创建/删除快捷方式。
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// window 对象如果不被全局引用，当JS垃圾回收机制回收时会被自动关闭
let mainWindow;

const createWindow = () => {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    title: '打印',
    width: 1200,
    height: 600,
    center: true, // 窗口屏幕居中
    minWidth: 1200,
    minHeight: 500,
    backgroundColor: '#FFFFFF',
    hasShadow: true, //MAC 上添加阴影
    // show: false,
    webPreferences: {
      // devTools: false, // 开发控制台时候可以打开
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true, // 集成node进程
      nodeIntegrationInWorker: true, // 开启Node多线程
      // preload: '', // 预加载
      enableRemoteModule: true, // 启用 remote 模块
      // session: '', // 设置用户 session
      // partition: '', // 设置用户 session
      webSecurity: false, // 禁用同源策略
      allowRunningInsecureContent: true, // 允许一个 https 页面运行 http url 里的资源
      textAreasAreResizable: false, // 禁止textarea拖拽改变大小
      webgl: false, // 关闭webgl支持
      plugins: false, // 是否支持插件
      scrollBounce: false, // 是否启动弹性滚动
      // webviewTag: true // 是否启用 <webview> tag标签
    }
  });

  // 并加载应用程序的index.html。
  // mainWindow.loadFile('./public/index.html')
  console.log(
    'MAIN_WINDOW_WEBPACK_ENTRY', MAIN_WINDOW_WEBPACK_ENTRY
  )
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL('https://github.com')

  // console.log('getPrinter', getPrinter(mainWindow))

  // 打开 DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    console.log('####', 'closed')
    // 取消对窗口对象的引用，如果应用程序支持多个窗口，则通常会将窗口存储在数组中，此时应删除相应的元素。
    mainWindow = null;
  });
};

// 初始化并准备创建窗口
app.on('ready', createWindow);

// 关闭所有窗口后退出 MAC中切换并不会调用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当点击dock图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (mainWindow === null) {
    createWindow();
  }
});

// 在此文件中，您可以包含应用程序的其他特定主进程代码。您也可以将它们放在单独的文件中，并在这里require它们。


