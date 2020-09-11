// Getting The Products 
class Products{
    async getProducts(){
        try{
            let result = await fetch('http://localhost:3000/fastFood-Products')
            let data = await result.json()
            return data
        } catch(error){
            console.log(error)
        }
    }
}



document.addEventListener('DOMContentLoaded', ()=>{

        const products = new Products()
    
        //get all Products
        products.getProducts().then(data => console.log('Data***',data))
    })