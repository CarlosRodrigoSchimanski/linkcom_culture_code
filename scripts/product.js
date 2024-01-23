const applyUserProperties = (user) =>{ //recebe o usuario e coloca nos campos os devidos valores
    const divProfile = document.getElementById('navProfile')

    //coloca imagem de login e nome
    divProfile.innerHTML += 
    `
        <img class="image" src="${user.imageLogim}" alt="foto de perfil"/>
        <h2>Ola,${user.name}</h2>
    `
}

const loadElement = async(url) =>{ // pega o item no banco de dados atraves do id podendo ser o usuario ou o produto 
    const user = await(await fetch(url)).json() // pego o item pelo id ja convertendo para json
    return user
}

const back = (id) =>{
    window.location = `../home/home.html?id=${id}`
}

const registerBalace = async(user,price,product) =>{
    let itens = user.itens
    itens.push(product)
    const newUser = {
        "name":user.name,
        "email":user.email,
        "password":user.password,
        "imageLogim":user.imageLogim,
        "points" : `${(parseInt(user.points) - price)}`,
        "itens":itens
    }

    await fetch(`http://localhost:3000/Users/${user.id}`,{
    method:'PUT',
    headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(newUser)
})
}

const buyItem = async(productID,userID) =>{
    const user = await loadElement(`http://localhost:3000/Users/${userID}`)
    const product = await loadElement(`http://localhost:3000/Store/${productID}`)

    if (parseInt(user.points) >= parseInt(product.price)){

        registerBalace(user,parseInt(product.price),product)

        const content = document.getElementById('content')
        content.innerHTML = ``
        content.innerHTML =
        `
            <img class="item" src="../../static/gout.png" alt="grout"/>
            <div id="cardBody">
                <h2>Produto Resgatado com sucesso!</h2>
                <div class="content">
                    <img class="newItem" src="${product.image}" alt="${product.name}"/>
                    <div>
                        <h2>${product.name}</h2>
                        <h3>Por: ${product.price} joias</h3>
                    </div>
                </div>
                <p>O pedido sera enviado para o RH</p>
                <h3>Meu saldo ${user.points} pontos</h3>
                <button id="back" class="voltar" onclick="back('${user.id}')">Voltar</button>
            </div>
        `
    }else{
        alert("Saldo insuficiente")
    }
    
}

const showCard = (product,user) =>{ // com o produto eu pego as caracteristicar e coloco no card
    const content = document.getElementById('content')
    content.innerHTML += 
        `
            <img class="item" src="${product.image}" alt="${product.name}"/>
            <div id="cardBody">
                <h2>${product.name}</h2>
                <h3>Por: ${product.price} joias</h3>
                <p>${product.description}</p>
                <h3>Voce possui ${user.points} pontos</h3>
                <button id="resgatar" class="resgatar" onclick="buyItem('${product.id}','${user.id}')">Resgatar</button>
            </div>
        `
}

const loadData = async() =>{
    const parametros = new URLSearchParams(window.location.search)

    const userID = parametros.get('user')
    const productID = parametros.get('product')

    const user = await loadElement(`http://localhost:3000/Users/${userID}`)
    const product = await loadElement(`http://localhost:3000/Store/${productID}`)

    applyUserProperties(user)
    showCard(product,user)
}

loadData()