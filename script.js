let card =  document.querySelector('.card');


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

let list = document.querySelector('.list');

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


let cardProducts = [];


let AddToCart = (index) => {


    if(cardProducts[index] == null)
    {
        cardProducts[index] = {...htmlProducts[index],quantity:1};
    }

    else
    {
        cardProducts[index].quantity++;
        cardProducts[index].price = cardProducts[index].quantity * htmlProducts[index].price;
    }

    cardReload();


}



let listCard = document.querySelector('.listCard');
let quantity = document.querySelector('.quantity');
let total = document.querySelector('.total');


let cardReload = () => {


    listCard.innerHTML = '';

    let totalPrice = 0;
    let totalQuantity = 0;

    cardProducts.forEach((item,index) => {
        if(item!=null)
        {
            totalPrice = totalPrice + item.price;
            totalQuantity = totalQuantity + item.quantity;

            let newDiv = document.createElement('li');

            newDiv.innerHTML = 
            `

            <div> <img src="${item.image}" alt="${item.name}"> </div>
            <di class="cardTitle" > ${item.name} </div>
            <div class="cardPrice">${item.price}</div>

            <div>

            <button class="cardButton" onclick="changeQuantity(${index},${item.quantity -1})">-</button>
            <div class="count">${item.quantity}</div>
            
            <button class="cardButton" onclick="changeQuantity(${index},${item.quantity +1})">+</button>
            </div
            
            
            `

            listCard.appendChild(newDiv);
        }
    });


    total.innerHTML = totalPrice;
    quantity.innerHTML = totalQuantity;


}


let changeQuantity = (index, newQuantity) => {

    if(newQuantity<=0)
    {
        delete cardProducts[index];
    }

    else
    {
        cardProducts[index].quantity = newQuantity;
        cardProducts[index].price =  newQuantity * htmlProducts[index].price;
    }

    cardReload();

}
