// const hello = require('./hello')
// const world = require('./world')
//  import $ from 'jquery'
console.log('window.$',window.$)
console.log('$',$)
import photo from './mm.png'
let image = new Image()

image.src = photo
// document.body.appendChild(image)

class Log{
     constructor(){
         console.lo('error')
     }
}
let log = new Log()

require('./index.css')
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