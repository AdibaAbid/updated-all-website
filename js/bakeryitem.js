const productContainer = document.querySelector('.product-container')
const spanCartItems = document.querySelector('.span-cart')





let cart = []
let buttonsDOM = []

// Getting The Products 
class Products {
    async getProducts() {
        try {
            let result = await fetch('../db.json')
            let data = await result.json()
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}

//Display Products
class UI {
    displayProduct(products) {
        let result = '';
        products.BakeryItemProducts.forEach((item) => {
            result += `
            <div class="product-item">
            <div class="img-wrapper">
                <img 
                src=${item.image}
                alt="img"
                >
            </div>
            <div class="product-desc">
                <h2 class="product-title">${item.title}</h2>
                <p class="product-price">Rs: ${item.price}.00/-</p>
                <div class="product-btn-container">
                    <a href="#" class="product-btn" ><i class="fas fa-list-ul"></i> Wishlist</a>
                    <a href="${item.view}" class="product-btn"><i class="fas fa-eye"></i> View</a>
                </div>
                <div class="add-container">
                    <a class="product-btn cart-btn" data-id=${item.id}><i class="fas fa-cart-plus"></i> Add to Cart</a>
                </div>
            </div>
        </div>
            `;
        });
        productContainer.innerHTML = result;
    }
    getCartButton() {
        const cartButton = [...document.querySelectorAll('.cart-btn')]
        buttonsDOM = cartButton
        console.log(cartButton)
        cartButton.forEach(item => {
            let id = item.dataset.id
            // debugger
            let inCart = cart.find(item => item.id === id)
            // if(inCart){
            //     debugger
            //     // inCart.amount += 1
            //         item.innerText = 'Already in cart'
            // }
            // else{
            item.addEventListener('click', (event) => {
                console.log('cart amount***', item.amount)
                event.target.innerText = "In Cart"
                //get product from local storage products and adding amount key in object
                //    if(event.target.dataset.id === id)
                let cartItem = { ...Storage.getProductObj(id), amount: 1 }
                console.log('obj of clicked item', cartItem)
                
                // if(event.target.dataset.id === id) {
                //     console.log('amount brhega')
                //     cartItem.amount += 1
                //     // cart = [...cart, cartItem]
                //     console.log('cart array', cart)
                //     //save cart in Local storage
                //     Storage.saveCart(cart)
                //     //set cart value in span
                //     this.setCartValue(cart)
                // } else if(cartItem.amount == undefined){
                    //add product to the cart
                    cart = [...cart, cartItem]
                    console.log('cart array', cart)
                    //save cart in Local storage
                    Storage.saveCart(cart)
                    //set cart value in span
                    this.setCartValue(cart)
                    //display cart item
                    // this.addCartItem(cartItem)

                // }

            })
            // }

        })
    }
    setCartValue(cart) {
        let tempTotal = 0
        let itemsTotal = 0
        cart.map((item) => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        spanCartItems.innerText = itemsTotal;
        console.log('cart value', spanCartItems)
    }
    setupCartData() {
        cart = Storage.getCart()
        this.setCartValue(cart)
    }
}

//Local Storage
class Storage {
    static saveProduct(products) {
        localStorage.setItem('products', JSON.stringify(products))
    }
    static getProductObj(id) {
        let products = JSON.parse(localStorage.getItem('products'))
        let item = products.BakeryItemProducts.find(obj => obj.id === id)
        return item
    }
    static saveCart(cart) {
        // if(cart.amount == 1){
        //     cart.amount += 1
        //     localStorage.setItem("cart", JSON.stringify(cart))
        // }else{
        localStorage.setItem("cart", JSON.stringify(cart))

        // }
    }
    static getCart() {
        return localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
    }

}


document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products()
    //set all data
    ui.setupCartData()
    //get all Products
    products.getProducts()
        .then(data => {
            ui.displayProduct(data)
            Storage.saveProduct(data)
        }).then(() => {
            ui.getCartButton()
        })
})

