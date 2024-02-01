const container = document.getElementById('container')
const showProducts = async() => {
    const products = await(await fetch('https://carlosapi.onrender.com/Store')).json()
    products.forEach(element => {
        console.log(element.name)
        container.innerHTML += 
        `
        <div id="card">
            <img src="${element.image}" alt="${element.name}"/>
            <h2>${element.name}</h2>
            <p>${element.price} joias</p>
        </div>
        `

    })
}

showProducts()
