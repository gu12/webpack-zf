let express = require('express')



let app = express()

app.get('/user',(req,res)=>{
    res.json({
        name:'zcxiao',
        age:18
    })
})


app.listen(3000)
console.log(express)