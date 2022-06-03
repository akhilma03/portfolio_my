const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const subjectField = document.getElementById("subject");
const messageField = document.getElementById("message");
const inputList = document.getElementsByClassName("form-control");
const formElm = document.getElementById("form");

function sendMail(params) {
    let tempParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
    emailjs.send("service_gfjufdb", "template_h4obref", tempParams,"ej3kxFWYMqDkrIPzZ").then((res) => {
      alert("Your message has been sent. Thank you!");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    });
  }

formElm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("clicked");
    validateForms();
  });
  
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const success = (element, message) => {
    element.style.border = "2px solid green";
    element.nextElementSibling.innerText = "";
  };
  const error = (element, message) => {
    element.style.border = "2px solid red";
    element.nextElementSibling.innerText = message;
  };
  
  function validateForms() {
    const nameValue = nameField.value.trim();
    const emailValue = emailField.value.trim();
    const subjectValue = subjectField.value.trim();
    const messageVlaue = messageField.value.trim();
    let nameVerified = false,
      emailVerified = false,
      subjectVerified = false,
      messageVerified = false;
  
    if (nameValue == "") {
      error(nameField, "Name should not be empty");
    } else {
      // console.log(!isNaN(nameValue));
      if (!isNaN(nameValue)) {
        error(nameField, "Name must a character");
      } else if (nameValue.length >= 3) {
        success(nameField, "");
        nameVerified = true;
      } else {
        error(nameField, "Name length should be atleast 3 letters");
      }
    }
  
    if (emailValue == "") {
      error(emailField, "Email should not be empty");
    } else {
      if (validateEmail(emailValue)) {
        success(emailField, "");
        emailVerified = true;
      } else {
        error(emailField, "Email format is not correct");
      }
    }
  
    if (subjectValue == "") {
      error(subjectField, "Subject should not be empty");
    } else {
      success(subjectField, "");
      subjectVerified = true;
    }
  
    if (messageVlaue == "") {
      error(messageField, "Message should not be empty");
    } else {
      success(messageField, "");
      messageVerified = true;
    }
  
    if (nameVerified && emailVerified && messageVerified && subjectVerified) {
      sendMail();
    }
  }