let siteNameInput = document.querySelector("#name");
let urlInput = document.querySelector("#url");
let submitBtn = document.querySelector("#submit");
let index = 0;

let arr = [];
if (localStorage.getItem("name") != null) {
  arr = JSON.parse(localStorage.getItem("name"));
  display();
}
submitBtn.addEventListener("click", function () {
  if (validateName() && validateUrl()) {
    let obj = {
      siteName: siteNameInput.value,
      siteUrl: urlInput.value,
    };
    arr.push(obj);
    localStorage.setItem("name", JSON.stringify(arr));
    display();
    clearInput();
  } else {
    alert("Enter Valid Name");
  }
});

function display() {
  var cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `  <tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].siteName}</td>
                    <td><button onclick='visit(${i})' class="btn btn-warning"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                    <td><button onclick='deleteMark(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`;
  }
  document.querySelector("#tBody").innerHTML = cartona;
}

function clearInput() {
  siteNameInput.value = "";
  urlInput.value = "";
}

function visit(i) {
  const link = document.createElement("a");
  link.href = "https://" + arr[i].siteUrl;
  link.target = "_blank";
  link.click();
  //   window.location.href =   "https://" + arr[i].siteUrl;
}
//====================================================Delete==================================================
function deleteMark(index) {
  arr.splice(index, 1);
  localStorage.setItem("name", JSON.stringify(arr));
  display();
}
//=====================================================Validation===============================================
function validateName() {
  let term = /^[a-zA-z]{3,}$/;
  return term.test(siteNameInput.value);
}

function validateUrl() {
  let term = /^www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
  return term.test(urlInput.value);
}
