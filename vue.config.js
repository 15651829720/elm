const mockdata = require('./src/mock/index.json');
module.exports = { 
    baseUrl: '/elmReraw/',
    outputDir: 'elmReraw',    
    lintOnSave: false,
    devServer: {
      port:8080,
      before(app){
        app.post('/gaoxiang/initInfo/info.do',(req,res, next)=>{//get请求不行
          res.json(mockdata);
        })
      }
    }
  }
  
  
  