document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("detailsform");
    const submitBtn = document.getElementById("submitBtn");

    const nameInput = document.getElementById("inputname");
    const emailInput = document.getElementById("inputemail");
    const passwordInput = document.getElementById("inputpassword");
    const confirmPasswordInput = document.getElementById("inputconfirmpassword");
    const phoneInput = document.getElementById("inputnumber");
    const dobInput = document.getElementById("inputdob");

    const validateName = () => {
        const name = nameInput.value.trim();
        const nameError = document.getElementById("name-error");

        if (name === "") {
            nameError.textContent = ""; 
            return false;
        } else if (name.length < 3 || !/[A-Z]/.test(name)) {
            nameError.textContent = "Name should be at least 3 characters long and include capital letters";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();
        const emailError = document.getElementById("email-error");
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = ""; 
            return false;
        } else if (!regex.test(email)) {
            emailError.textContent = "Please enter a valid email address";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    };

    const validatePassword = () => {
        passwordInput.addEventListener("input", updatePasswordStrength);
        const password = passwordInput.value.trim();
        const passwordError = document.getElementById("password-error");
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;

        if (password === "") {
            passwordError.textContent = "";
            return false;
        } else if (!regex.test(password)) {
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    };

    const validateConfirmPassword = () => {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const confirmPasswordError = document.getElementById("confirmpassword-error");

        if (confirmPassword === "") {
            confirmPasswordError.textContent = ""; 
            return false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match";
            return false;
        } else {
            confirmPasswordError.textContent = "";
            return true;
        }
    };


    const passwordStrengthElement = document.getElementById("password-strength");

    const calculatePasswordStrength = (password) => {
        
        const strength = Math.min(password.length / 8, 1);
        return strength;
    };

    const updatePasswordStrength = () => {
        const password = passwordInput.value.trim();
        const strength = calculatePasswordStrength(password);
      
        const dynamicWidth = `${strength * 20}%`;
    
        
        passwordStrengthElement.style.width = dynamicWidth;
    
        if (strength < 0.3) {
            passwordStrengthElement.style.backgroundColor = "red";
        } else if (strength < 0.7) {
            passwordStrengthElement.style.backgroundColor = "yellow";
        } else {
            passwordStrengthElement.style.backgroundColor = "green";
        }
    };
    
      

    passwordInput.addEventListener("input", () => {
        updatePasswordStrength();
        updateSubmitButton(); 
    });

    
    

    const validatePhoneNumber = () => {
        const phoneNumber = phoneInput.value.trim();
        const phoneNumberError = document.getElementById("phone-error");
        const regex = /^[0-9]+$/;

        if (phoneNumber === "") {
            phoneNumberError.textContent = ""; 
            return false;
        } else if (!regex.test(phoneNumber)) {
            phoneNumberError.textContent = "Please enter a valid phone number";
            return false;
        } else {
            phoneNumberError.textContent = "";
            return true;
        }
    };

    const validateDOB = () => {
        const dob = dobInput.value.trim();
        const dobError = document.getElementById("dob-error");
        const regex = /^\d{4}(-\d{2}){2}$/;

        if (dob === "") {
            dobError.textContent = ""; 
            return false;
        } else {
            const currentDate = new Date();
            const inputDate = new Date(dob);

            if (inputDate >= currentDate) {
                dobError.textContent = "Please enter a date of birth in the past";
                return false;
            } else if (!regex.test(dob)) {
                dobError.textContent = "Please enter a valid date of birth in YYYY-MM-DD format";
                return false;
            } else {
                dobError.textContent = "";
                return true;
            }
        }
    };

    const validateForm = () => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneNumberValid = validatePhoneNumber();
        const isDOBValid = validateDOB();

        return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneNumberValid && isDOBValid;
    };

    const updateSubmitButton = () => {
        submitBtn.disabled = !validateForm();
    };

    nameInput.addEventListener("input", updateSubmitButton);
    emailInput.addEventListener("input", updateSubmitButton);
    passwordInput.addEventListener("input", updateSubmitButton);
    confirmPasswordInput.addEventListener("input", updateSubmitButton);
    phoneInput.addEventListener("input", updateSubmitButton);
    dobInput.addEventListener("input", updateSubmitButton);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (submitBtn.disabled) {
            alert("Please fill in all fields correctly.");
        } else {
          
            alert("Form submitted successfully!");
        }
    });
});
