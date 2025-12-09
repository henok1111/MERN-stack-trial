function prom(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve('this is from the promice')
        }, 2000);
    })
}    
async function henok() {
    console.log('thsi is befor async await part')
    const n = prom()
    const w = await n;
    console.log(w)
    console.log('this is after the async function')
}
henok()