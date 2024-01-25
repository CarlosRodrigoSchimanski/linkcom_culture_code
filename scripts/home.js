const nav = (id) =>{
    const profile = document.getElementById('myProfile')
    profile.addEventListener("click", ()=>{
        window.location = `../profile/profile.html?id=${id}`
    })
}

const loadElement = async(url) =>{
    const user = await(await fetch(url)).json()
    return user
}

const applyUserProperties = async(user) =>{ //recebe o usuario e coloca nos campos os devidos valores
    const divProfile = document.getElementById('navProfile')
    const score = document.getElementById('score')

    //coloca imagem de login e nome
    divProfile.innerHTML += 
    `
        <img class="imagem" src="${user.imageLogim}" alt="foto de perfil"/>
        <h2>Ola,${user.name}</h2>
    `

    //coloca os pontos
    score.innerHTML +=
    `
        <h3>${user.points}</h3>
        <h4>Jóias</h4>
    `

}

const applyStoreItems = async(store,id) =>{
    const content = document.getElementById('content')
    store.forEach(element => {
        content.innerHTML += 
        `
        <div id="card">
            <img src="${element.image}" alt="${element.name}"/>
            <h2>${element.name}</h2>
            <p>${element.price} joias</p>
            <button onclick="showCard('${element.id}','${id}')">Resgatar</button>
        </div>
        `
    })
}

const showCard = async(product,user) =>{
    window.location = `../produtc/produtc.html?user=${user}&product=${product}` // quando for passar mais de um parametro não usa um segundo ? e sim um &
}

const loadData = async() =>{
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get('id')
    nav(id)
    const user = await loadElement(`http://localhost:3000/Users/${id}`)
    applyUserProperties(user)
    const store = await loadElement(`http://localhost:3000/Store`)
    applyStoreItems(store,id)
}

loadData()