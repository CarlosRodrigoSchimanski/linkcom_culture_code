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
    let items = store.filter((item,index)=>{
        return index < 8
    })

    const content = document.getElementById('content')
    items.forEach(element => {
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

const search = (store,user) =>{
    const inputSearch = document.getElementById('inputSearch')// pego o input para verificar os eventos
    const divSearch = document.getElementById('search2')// pego a div que vou inserir o html
    let itens = []

    inputSearch.addEventListener('keydown', (event) =>{ // crio um evento do tipo key
        let filter = event.target.value.toUpperCase()// pego o valor digitado e dou um upercase 
        divSearch.innerHTML = ''

        let products = store.filter((item, index)=>{ // filtro todos os produtos
            return item.name.toUpperCase().indexOf(filter)>-1
        })
        products.forEach(item => {
            divSearch.innerHTML += `<button id='buttonPesquisa' onclick="showCard('${item.id}','${user.id}')">${item.name}</button>`
        })
        if(inputSearch.value === ''){
            divSearch.innerHTML = ''
        }
    })
}

const loadData = async() =>{
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get('id')
    nav(id)
    const user = await loadElement(`http://localhost:3000/Users/${id}`)
    applyUserProperties(user)
    const store = await loadElement(`http://localhost:3000/Store`)
    applyStoreItems(store,id)
    search(store,user)
}

loadData()