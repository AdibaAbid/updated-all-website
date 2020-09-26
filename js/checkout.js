const subTotal = document.querySelector('.Total')
const spanCartItems = document.querySelector('.span-cart')
const displayCartTable = document.querySelector('.displayCart')
const grandTotalAmount = document.querySelector('.grandTotal')
const checkoutValidation = document.querySelector('.checkout-validation')

let cart =[]

cart =JSON.parse( localStorage.getItem("cart"))
console.log(cart)
setCartValue(cart)

function  showProducts(cart) {
 
    let result = ""
    cart.forEach((item, index)=>{
        result += `
        <tr>
        <th>${index + 1}</th>
        <th scope="col"><img src=${item.image} alt="product-img" width="50" id="table-img"></th>
        <td data-label="Item Name" colspan="2">${item.title}</td>
        <td data-label="Price" colspan="2">${item.price} /-PKR</td>
        <td data-label="Quantity" colspan="2"><i class="fas fa-chevron-left"></i> <b class='quantity '>${item.amount}</b>  <i class="fas fa-chevron-right"></i></td>
        <td data-label="Sub Total" colspan="2">${item.price * item.amount} /-PKR</td>
        <td><i class="fas fa-trash-alt"></i></td>
        </tr>
        `
    })
    displayCartTable.innerHTML = result
}

function setCartValue(cart){
    let tempTotal =0
    let itemsTotal =0
    if(cart === null){
        swal({
            title: "There is no ITEM in your cart!",
            icon: "info",
          })
    }else{
        cart.map((item)=>{
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        if(tempTotal<300){
            checkoutValidation.style.display = " block "
        }
            spanCartItems.innerText = itemsTotal 
            subTotal.innerText = tempTotal+ " /-PKR"
            grandTotalAmount.innerText = tempTotal +200 + " /-PKR"
            showProducts(cart)
        }
    
    }
 
