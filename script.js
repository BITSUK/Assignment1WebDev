const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".copy-btn"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");
iconImage = document.querySelector(".image");

const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "%@#"
}

const generatePassword = () => {

    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
   
    //** Umesh : image animation */
    iconImage.style.transform = "rotate(90deg)";
    setTimeout(() => {iconImage.style.transform = "rotate(0deg)",5000});
    //** End */

    options.forEach(option => { // looping through each option's checkbox
        if(option.checked) { // if checkbox is checked
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                // adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") { // if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `; // adding space at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        // getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            // if randomPassword doesn't contains the current random character or randomChar is equal
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; // passing randomPassword to passwordInput value
}

const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
  // Umesh : line commented  generatePassword();
}
updateSlider();

// Umesh: function amended
const CopyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // copying random password
    copyIcon.innerText = "COPIED"; // changing copy icon to tick
    copyIcon.style.color = "#00ff00";
    
    const timeoutPointer = setTimeout(() => { // after 500 ms, changing tick icon back to copy
                                                copyIcon.innerText = "COPY";
                                                copyIcon.style.color = "#fff";
                                            }, 500);
}

copyIcon.addEventListener("click", CopyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

function ValidateInput() {
    var Option1 = document.getElementById("numbers");
    var Option2 = document.getElementById("lowercase");
    var Option3 = document.getElementById("uppercase");
    var Option4 = document.getElementById("symbols");

    if ((Option1.checked == false) & (Option2.checked == false) & (Option3.checked == false) & (Option3.checked == false)) {
        document.getElementById("numbers").checked = true;
    }

}