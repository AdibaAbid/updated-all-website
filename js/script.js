//Span Cart Item
 const spanCartItems = document.querySelector('.span-cart')
 cart =JSON.parse( localStorage.getItem("cart"))
 setCartValue(cart)
 function setCartValue(cart){
    let itemsTotal =0

    cart.map((item)=>{
        itemsTotal += item.amount
        spanCartItems.innerText = itemsTotal 
 })
}



// Script For Slider
$(document).ready(function () {
    $('.my-slider').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.prev-btn',
        nextArrow: '.next-btn',
        speed: 1000,
    });
});


// Form scripts

const loginToggler = document.getElementById('toggle-login');
const signupToggler = document.getElementById('toggle-signup');

const toggleLoginForm = document.getElementById('formlogIn');
const toggleSignupForm = document.getElementById('formSignUp');

// SignUp Form Appears
loginToggler.onclick = function () {
    toggleLoginForm.style.display = "block";
    toggleSignupForm.style.display = "none";
}

// Login Form Appears
signupToggler.onclick = function () {
    toggleSignupForm.style.display = "block";
    toggleLoginForm.style.display = "none";
}

// Form Scripts Ends


// Model Scripts
// Get the modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let closeModel = document.getElementsByClassName("close")[0];
let closeModel1 = document.getElementsByClassName("close")[1];


// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

closeModel.onclick = function () {
    modal.style.display = "none";
}

closeModel1.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Model Scripts Ends


// Form Validation 
// Log In
const userEmailLi = document.getElementById('userEmailLogIn');
const userPasswordLi = document.getElementById('userPassLogIn');

const logInFormBtn = document.getElementById('logInBtn');

logInFormBtn.addEventListener('click', e => {
    e.preventDefault();

    checkLoginInputs();
    
    emptyLoginInputs();
    console.log('Successfully Loged In');

});

const checkLoginInputs = () => {
    const userEmailValue = userEmailLi.value.trim();
    const userPassValue = userPasswordLi.value.trim();

    if (userEmailValue === '') {
        setErrorFor(userEmailLi, "Email Field Can't Be Blank !!");
    } else if (!isEmail(userEmailValue)) {
        setErrorFor(userEmailLi, "Invalid E-mail !!");
    } else {
        setSuccessFor(userEmailLi);
    }


    if (userPassValue === '') {
        setErrorFor(userPasswordLi, "Password Field Can't Be Blank !!");
    } else {
        setSuccessFor(userPasswordLi);
    }


    if (userEmailValue === localStorage.getItem('userEmail') && userPassValue === localStorage.getItem('userPassword')) {
        alert('Loged In Successfully!!');
    } else if (userEmailValue !== localStorage.getItem('userEmail') && userPassValue !== localStorage.getItem('userPassword')) {
        alert('create Account First!!!');
    } else {
        alert('Plz Resolve The Error !!');
    }

}
    const emptyLoginInputs = () =>{
        document.getElementById('userEmailLogIn').value = '';
        document.getElementById('userPassLogIn').value = '';
    }

// Signup
const userEmailSu = document.getElementById('userEmailSignUp');
const userPasswordSu1 = document.getElementById('userPassSignUp1');
const userPasswordSu2 = document.getElementById('userPassSignUp2');

const signUpFormBtn = document.getElementById('signUpBtn');

let userData = [];
console.log(localStorage.getItem('userData'));


signUpFormBtn.addEventListener('click', e => {
    e.preventDefault();

    checkSignupInputs();
    emptySignupInputs();

});

const checkSignupInputs = () => {
    const userEmailValue = userEmailSu.value.trim();
    const userPassValue1 = userPasswordSu1.value.trim();
    const userPassValue2 = userPasswordSu2.value.trim();

    //Sign up Email Validation
    if (userEmailValue === '') {
        setErrorFor(userEmailSu, "Email Field Can't Be Blank !!");
    } else if (!isEmail(userEmailValue)) {
        setErrorFor(userEmailSu, "Invalid E-mail !!");
    } else {
        setSuccessFor(userEmailSu);
        userData.push(localStorage.setItem('userEmail', userEmailValue));
    }

    // Sign up Password Validation
    if (userPassValue1 === '' && userPassValue2 === '') {
        setErrorFor(userPasswordSu1, "Password Field Can't Be Blank !!");
        setErrorFor(userPasswordSu2, "Password Field Can't Be Blank !!");
    } else if (userPassValue2 === '') {
        setErrorFor(userPasswordSu2, "Again Write Your Password !!");
    } else if (!passwordMatch(userPassValue1, userPassValue2)) {
        setErrorFor(userPasswordSu2, "Password Didn't Match !!");
    } else {
        setSuccessFor(userPasswordSu1);
        setSuccessFor(userPasswordSu2);
        userData.push(localStorage.setItem('userPassword', userPassValue2));
    }

    if (userEmailValue !== '' && userPassValue1 !== '' && userPassValue2 !== '') {
        alert('Registered Successfully!!')
    }

}

    const emptySignupInputs = () =>{
        document.getElementById('userEmailSignUp').value = '';
        document.getElementById('userPassSignUp1').value = '';
        document.getElementById('userPassSignUp2').value = '';
    }


const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

const setSuccessFor = input => {
    const formControl = input.parentElement;

    formControl.className = 'form-control success';
}

const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

const passwordMatch = (pass1, pass2) => {
    return pass1 === pass2;
}