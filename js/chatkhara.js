const productContainer = document.querySelector('.product-container')


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
        // debugger
        console.log(products)
        let result = '';
        products.chatkharaMealProducts.forEach(item => {
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
                    <a href="#" class="product-btn" data-id=${item.id}><i class="fas fa-list-ul"></i> Wishlist</a>
                    <a href="${item.view}" class="product-btn"><i class="fas fa-eye"></i> View</a>
                </div>
                <div class="add-container">
                    <a href="#" class="product-btn cart-btn"><i class="fas fa-cart-plus"></i> Add to Cart</a>
                </div>
            </div>
        </div>
            `;
        });
        productContainer.innerHTML = result;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const products = new Products()

    //get all Products
    products.getProducts()
        .then(data => ui.displayProduct(data))
})