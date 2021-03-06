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
// Model Will Open & Close With The Help Of Inline JS

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

    if(checkLoginInputs()){
        swal("Good job!", "Logged In Successfully !!!!", "success");
        greetLoggedInUser();
        emptyLoginInputs();
        setTimeout(()=>{
            document.getElementById("myModal").style.display = "none";
        },1000);
    }
    else{
        return false;
    }
    
    // emptyLoginInputs();

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

    
    if(userEmailValue === '' && userPassValue === '' ){
        swal("Ohh Noo!", "Create Account First !!", "error");
        return false;
    } else if (userEmailValue !== localStorage.getItem('userEmail') ) {
        swal("Invalid E-mail!", "Enter Valid E-mail !!", "error");
        return false;
    } else if( userPassValue !== localStorage.getItem('userPassword')){
        swal("Invalid Password ", "Enter Valid Password !!", "error");
        setErrorFor(userPasswordLi, "Enter Valid Password !");
        return false;
    }
    else if (userEmailValue === localStorage.getItem('userEmail') && userPassValue === localStorage.getItem('userPassword')) {
       return true;
    } else {
        return false;
    }

}
// Revert Back Changes 
const emptyLoginInputs = () => {
    document.getElementById('userEmailLogIn').value = '';
    document.getElementById('userPassLogIn').value = '';
    
}

const greetLoggedInUser =()=>{
    let targetArea = document.getElementById('userGreetingName');
    targetArea.innerHTML = localStorage.getItem('userName'); 
}

// Signup Form

const userNameSu = document.getElementById('userNameSignUp');
const userEmailSu = document.getElementById('userEmailSignUp');
const userPasswordSu1 = document.getElementById('userPassSignUp1');
const userPasswordSu2 = document.getElementById('userPassSignUp2');

const signUpFormBtn = document.getElementById('signUpBtn');

// Local Storage
let userData = [];

signUpFormBtn.addEventListener('click', e => {
    e.preventDefault();

    if(checkSignupInputs()){
        swal("Good job!", "Created Account Successfully !!!!", "success");
        greetUser();
        emptySignupInputs();
        setTimeout(()=>{
            document.getElementById("myModal").style.display = "none";
        },1000);
    }else{
        return false;
    }


});

const checkSignupInputs = () => {
    const userNameValue = userNameSu.value;
    const userEmailValue = userEmailSu.value.trim();
    const userPassValue1 = userPasswordSu1.value.trim();
    const userPassValue2 = userPasswordSu2.value.trim();

    // Signup User Name Validation
    if (userNameValue === '') {
        setErrorFor(userNameSu, "Name Can't Be Blank !!");
    } else {
        setSuccessFor(userNameSu);
        userData.push(localStorage.setItem('userName', userNameValue));
    }


    //Sign up Email Validation
    if (userEmailValue === '') {
        setErrorFor(userEmailSu, "Email Field Can't Be Blank !!");
        return false;
    } else if (!isEmail(userEmailValue)) {
        setErrorFor(userEmailSu, "Invalid E-mail !!");
        return false;
    } else {
        setSuccessFor(userEmailSu);
        userData.push(localStorage.setItem('userEmail', userEmailValue));
    }

    //Sign up Password Validation
    if (userPassValue1 === '' && userPassValue2 === '') {
        setErrorFor(userPasswordSu1, "Password Field Can't Be Blank !!");
        setErrorFor(userPasswordSu2, "Password Field Can't Be Blank !!");
    } else if (userPassValue1 === '') {
        setErrorFor(userPasswordSu1, "Enter YOur Password Your Password !!");
        return false;
    } else if (userPassValue2 === '') {
        setErrorFor(userPasswordSu2, "Again Write Your Password !!");
        return false;
    } else if (!passwordMatch(userPassValue1, userPassValue2)) {
        setErrorFor(userPasswordSu2, "Password Didn't Match !!");
        return false;
    }else {
        setSuccessFor(userPasswordSu1);
        setSuccessFor(userPasswordSu2);
        userData.push(localStorage.setItem('userPassword', userPassValue2));
        return true;
    }

}

// Revert Back Changes
const emptySignupInputs = () => {
    document.getElementById('userNameSignUp').value = '';
    document.getElementById('userEmailSignUp').value = '';
    document.getElementById('userPassSignUp1').value = '';
    document.getElementById('userPassSignUp2').value = '';
}


// Sent Error TO User
const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-control error';
}

// Sent Success Message To User
const setSuccessFor = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check Is Email Valid Or Not
const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Check Password Matches Or Not 
const passwordMatch = (pass1, pass2) => {
    return pass1 === pass2;
}

// Greet USer

const greetUser = () =>{
    let targetArea = document.getElementById('userGreetingName');
    targetArea.innerHTML = localStorage.getItem('userName'); 
}
