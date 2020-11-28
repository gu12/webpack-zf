// const hello = require('./hello')
// const world = require('./world')
//  import $ from 'jquery'
// console.log('window.$',window.$)
// console.log('$',$)
import photo from './mm.png'
let image = new Image()

image.src = photo
// document.body.appendChild(image)

class Log{
     constructor(){
         console.log('error')
     }
}
let log = new Log()

require('./index.css')

let xhr = new XMLHttpRequest()

xhr.open('GET','/api/user',true)
xhr.open('GET','/list',true)
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send()

// // require('./index.less')
//   import './index.css';

// // console.log(hello,world)

// let fn = ()=>{
//     console.log('log')
// }
// fn()

// class A{
//     a = 1
// }