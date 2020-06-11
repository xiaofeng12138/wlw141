const path = require('path');
console.log(process.env.NODE_ENV)
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /**
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  // chainWebpack: (config) => {
  // },
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],  // 自动添加文件名后缀
      alias: {
        'vue':'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components')
      },
    }
  },
  configureWebpack:{
	    //警告 webpack 的性能提示
	    performance: {
	    	hints:'warning',
	    	//入口起点的最大体积
	    	maxEntrypointSize: 50000000,
	    	//生成文件的最大体积
	    	maxAssetSize: 30000000,
	    	//只给出 js 文件的性能提示
	    	assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
	    }
    

  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
        scss: { 
            // prependData: `@import "./src/styles/main.scss";`
        }
    },
    // 启用 CSS modules for all css / pre-processor files.
     requireModuleExtension: true
   // modules:false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    contentBase:path.resolve(__dirname,'dist'),
    //监听contentBase下面的目录文件，一旦有变化 就会重新reload
    watchContentBase:true,
    compress:true,  //启动gzip压缩
    open: true, // 编译完成是否打开网页
    host: '127.0.0.1', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    hot: true, // 开启热加载
    hotOnly: false,
    // proxy: null, 
    proxy: {     // 设置代理
      '/api':{
        target: 'http://localhost:6032/',  //目标接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api':''   //重写接口
        }
       },
    },
    overlay: { // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    // before: app => {
    // }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {},
}