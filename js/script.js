let images = document.querySelectorAll(".product-images ul li")
let imageBox = document.querySelector(".product-images .image-box img")
let count = document.querySelector(".count")
let menu = document.querySelector(".menu")
let cart = document.querySelector(".cart")
let cartMenu = document.querySelector(".cart-menu")
let navBar = document.querySelector("nav ul")
let closeMenu = document.querySelector(".close-menu")
let addToCart = document.querySelector(".add-to-cart")
let num = 0

images.forEach(image => {
    image.addEventListener("click", ele => {
        images.forEach(image => {
            image.classList.remove("active")
        })
        ele.currentTarget.classList.add("active")
        imageBox.src = ele.currentTarget.dataset.src
    })
})

count.children[2].onclick = () => {
    count.children[1].innerHTML = +count.children[1].innerHTML + 1
}
count.children[0].onclick = () => {
    if (count.children[1].innerHTML > 0) {
        count.children[1].innerHTML = +count.children[1].innerHTML - 1
    }
}

menu.onclick = () => {
    navBar.style.cssText = "transform: translateX(0)"
}

closeMenu.onclick = () => {
    navBar.style.cssText = "transform: translateX(-100%)"
}

cart.children[0].onclick = () => {
    if (num === 0) {
        cartMenu.style.cssText = "opacity: 1;transform: translate(-50%, 115%)"
        num = 1
    } else {
        cartMenu.style.cssText = "opacity: 0;transform: translate(-50%, 125%)"
        num = 0
    }
}

function createCartItem(product) {
    if (cartMenu.children[1]) {
        cartMenu.children[1].remove()
    }
    let cartItem = document.createElement("div")
    let cartItemImageBox = document.createElement("div")
    let cartItemInfo = document.createElement("div")
    let cartItemDelete = document.createElement("div")
    let cartItemImage = document.createElement("img")
    let cartItemInfoTitle = document.createElement("h5")
    let cartItemInfoPrice = document.createElement("p")
    let cartItemDeleteIcon = document.createElement("i")
    let span = document.createElement("span")


    cartItemImage.src = product.image
    cartItemImageBox.appendChild(cartItemImage)

    cartItemInfoTitle.innerHTML = product.title
    cartItemInfoPrice.innerHTML = '$' + product.price + '.00' + ' x ' + product.count
    span.innerHTML = ' $' + product.total + '.00'
    span.className = "bold"
    cartItemInfoPrice.appendChild(span)
    cartItemInfo.appendChild(cartItemInfoTitle)
    cartItemInfo.appendChild(cartItemInfoPrice)

    cartItemDeleteIcon.classList.add("fa-solid")
    cartItemDeleteIcon.classList.add("fa-trash-can")
    cartItemDelete.appendChild(cartItemDeleteIcon)

    cartItem.appendChild(cartItemImageBox)
    cartItem.appendChild(cartItemInfo)
    cartItem.appendChild(cartItemDelete)
    cartItem.classList.add("cart-item")

    cartMenu.appendChild(cartItem)

    cartItemDelete.onclick = () => {
        cartItem.remove()
        let p = document.createElement("p")
        p.innerHTML = "Your cart is empty."
        cartMenu.appendChild(p)
        window.sessionStorage.clear()
    }
}

addToCart.onclick = () => {
    if (count.children[1].innerHTML > 0) {
        const product = {
            id: 1,
            title: "Fall Limited Edition Sneakers",
            price: 125,
            count: +count.children[1].innerHTML,
            total: 125 * +count.children[1].innerHTML,
            image: "images/image-product-1-thumbnail.jpg"
        }
        window.sessionStorage.setItem("product", JSON.stringify(product))
        createCartItem(product)
    } else {
        console.log("empty");
    }
}

if (window.sessionStorage.getItem("product")) {
    const product = JSON.parse(window.sessionStorage.getItem("product"))
    createCartItem(product)
}

console.log();