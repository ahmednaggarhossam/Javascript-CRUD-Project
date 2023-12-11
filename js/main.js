var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var mainBtn = document.getElementById('btn');

mainBtn.addEventListener("click",function()  {
    if(mainBtn.innerText == "Add Product"){
        addProduct(productList);
    }
    else{
        saveUpdate();
    }
});
var editIndex = 0;


var productList;

if(localStorage.getItem("products") == null){
    productList = [];
}
else{
    productList = JSON.parse(localStorage.getItem("products"));
    displayProducts(productList);
}

function addProduct() {
    if(validateProductName()){
        var product ={
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        }
        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList));
        displayProducts(productList);
        clearForm();
    }
    else{
        alert('invalid Product Name')
    }
}

function displayProducts(productList){
    var cartoona = ``;
    for (let i = 0; i < productList.length; i++) {
        cartoona += `<tr>
        <th scope="row">${i+1}</th>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td><button onclick="updateProducts(${i})" class="btn btn-warning"><i class="fa-regular fa-pen-to-square me-2"></i>Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</button></td>
    </tr>`; 
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}


function clearForm(){
    productNameInput.value = ``;
    productPriceInput.value = ``;
    productCategoryInput.value = ``;
    productDescriptionInput.value = ``;
}


function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("products", JSON.stringify(productList));
    displayProducts(productList);
}

function searchProduct(term){
    var searchProducts = [];
    for (let i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            searchProducts.push(productList[i]);

        }
    }
    displayProducts(searchProducts);
}

function updateProducts(index){
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value =  productList[index].category;
    productDescriptionInput.value = productList[index].description;
    mainBtn.innerText = 'Update Product';
    editIndex = index;
}

function saveUpdate(){
    var product ={
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }
    productList[editIndex] = product;
    localStorage.setItem("products", JSON.stringify(productList));
    displayProducts(productList);
    clearForm();
}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,10}$/;
    if(regex.test(productNameInput.value) == true){
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        return true;
    }
    else{
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.add("is-invalid");
        return false;
    }
}
productNameInput.addEventListener("keyup",validateProductName);

///////////////////////////////////////////////////////////////////////

// var elements = document.querySelectorAll('h3');

// for (let i = 0; i < elements.length; i++) {
//     elements[i].addEventListener("click",function(){alert('Hello')})
// }

// document.body.addEventListener("click",function(eventInfo){
//     console.log(eventInfo.clientX , eventInfo.clientY);
// });

// document.body.addEventListener("click",function(eventInfo){
//     console.log(eventInfo.target);
// });

// document.body.addEventListener("keydown",function(eventInfo){
//     if(eventInfo.key == 'y'){
//         console.log("Mar7abaaaa");
//     }
//     else{
//         console.log("wrooooong");
//     }
// });

document.body.addEventListener("contextmenu", function(eventInfo){
    eventInfo.preventDefault();
});