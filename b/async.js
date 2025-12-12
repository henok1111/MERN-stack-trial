function sum (x,y,d){
    let b = x +y
    d(b)
    console.log(`this sum is ${b}`)
} 

function d(e){
let g = e/10
console.log(g)
}
sum(3,8)