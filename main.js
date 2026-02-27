let quantity = document.querySelector('.quantity');
let list = document.querySelector('.list');
let card = document.querySelector('.card');
let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');

function cartOpen()
{
    card.classList.add('active');
}

function cartClose()
{
    card.classList.remove('active');
}

let htmlProducts = [
    {
        id : 1,
        name : "PRODUCT 1",
        image : "1.png",
        price : 1500
    },
    {
        id : 2,
        name : "PRODUCT 2",
        image : "2.png",
        price : 2500
    },
    {
        id : 3,
        name : "PRODUCT 3",
        image : "3.png",
        price : 3500
    }
]

function addProducts()
{
    htmlProducts.forEach((product,index)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = 
        `
        <img src='${product.image}'>
        <div class='title'>${product.name}</div>
        <div class='price'>${product.price}</div>
        <button onclick='AddToCart(${index})'>Add To Cart</button>
        
        `

        list.appendChild(newDiv);
    });
}


addProducts();

let cartProducts = [];

let AddToCart=(index)=>{

    if(cartProducts[index] == null)
    {
        cartProducts[index] = {...htmlProducts[index],quantity:1};
    }
    else
    {
        cartProducts[index].quantity++;
        cartProducts[index].price = cartProducts[index].quantity * htmlProducts[index].price;
    }

    cartReload();
}


let cartReload=()=>{
    listCard.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    cartProducts.forEach((item,index)=>{
        if(item != null)
        {
            totalQuantity = totalQuantity + item.quantity;
            totalPrice = totalPrice + item.price;

            let newDiv = document.createElement('li');
            newDiv.innerHTML =
            `
            <div><img src='${item.image}'></div>
            <div class='cardTitle'>${item.name}</div>
            <div class='cardPrice'>${item.price}</div>
            <div>
            <button style='background-color: #560bad;' class='cardButton' onclick='changeQuantity(${index},${item.quantity - 1})'>-</button>
            <div class='count'>${item.quantity}</div>
            <button style='background-color: #560bad;' class='cardButton' onclick='changeQuantity(${index},${item.quantity + 1})'>+</button>
            
            `

            listCard.appendChild(newDiv);

        }
    });


    total.innerHTML = totalPrice;
    quantity.innerHTML = totalQuantity;

}


let changeQuantity = (index,newQuantity) =>{
    if(newQuantity <= 0)
    {
        delete cartProducts[index];
    }
    else
    {
        cartProducts[index].quantity = newQuantity;
        cartProducts[index].price = newQuantity * htmlProducts[index].price;
    }
    cartReload();
}

function checkout()
{
    let countitem = listCard.children.length;

    if(countitem > 0)
    {
        alert('THANK YOU FOR SHOPPING');
    }
    else
    {
        alert('PLEASE ADD PRODUCTS TO THE CART FIRST');
    }
}