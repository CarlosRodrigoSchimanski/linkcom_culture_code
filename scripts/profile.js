const applyUserProperties = (user) =>{ //recebe o usuario e coloca nos campos os devidos valores
    const divProfile = document.getElementById('navProfile')

    //coloca imagem de login e nome
    divProfile.innerHTML += 
    `
        <img class="image" src="${user.imageLogim}" alt="foto de perfil"/>
        <h2>Ola,${user.name}</h2>
    `
}

const applyMyDate = (user) =>{
    const card = document.getElementById('card')
    const myData = document.getElementById('myData')
    myData.addEventListener("click", ()=>{
        card.style.display="flex"
        card.innerHTML =
        `
        <h2>Meus Dados</h2>
        <img class="cardImg" src="${user.imageLogim}" alt="imagem perfil" />
        <h4>${user.name}</h4>
        <h4>${user.email}</h4>
        `
    })
}

const applyMyItens = (user) =>{
    const card = document.getElementById('card')
    const myItens = document.getElementById('myItens')
    myItens.addEventListener("click", ()=>{
        card.style.display='flex'
        card.innerHTML = '<h2>Meus Resgates</h2> <div id="cardItens"></div>'
        const cardItens = document.getElementById('cardItens')
        user.itens.forEach((item)=>{
            cardItens.innerHTML+=
            `
            <div class="litleCard">
                <p><strong>${item.date}</strong></p>
                <img class="litleCardImg" src="${item.image}" alt="imagem perfil"/>
                <h5>${item.name}</h5>
                <p>${item.price} jóias</p>
            </div>
            
            `
        })

    })
}

const applyMyPoints = () =>{
    const card = document.getElementById('card')
    const myPoints = document.getElementById('myPoints')
    myPoints.addEventListener("click", ()=>{
        card.style.display="flex"
        card.innerHTML = 
        `
        <h2>Minhas jóias</h2>
        <div class="jewels">
            <img class="jewelsYelow" src="../../static/19.png" alt="jóias"/>
            <div class="jewelsDescription">
                <h5>Joia da mente</h5>
                <p>2 jóias</p>
                <p class="jewelsP">
                    O poder dessa joia está na possibilidade de transformar ideias em palavras, com assertividade na transmissão e receptividade das informações.
                </p>
            </div>
        </div>
        <div class="jewels">
            <img class="jewelsPurple" src="../../static/22.png" alt="jóias"/>
            <div class="jewelsDescription">
                <h5>Joia do poder</h5>
                <p>1 jóias</p>
                <p class="jewelsP">
                    Esta poderosa joia traz consigo alto nível de energia e empatia para lidar com colegas de trabalho, aquele que a possui demonstra a capacidade de lidar com diversos perfis, bem como proatividade e compartilhamento de informações.
                </p>
            </div>
        </div>
        <div class="jewels">
            <img class="jewelsPurple" src="../../static/21.png" alt="jóias"/>
            <div class="jewelsDescription">
                <h5>Joia do espaço</h5>
                <p>3 jóias</p>
                <p class="jewelsP">
                    Esta joia traz consigo a capacidade de se adaptar e estimula o interesse por mudanças, variedades de experiências e novas ideias.
                </p>
            </div>
        </div>
        `
    })
}

const closeed = () =>{
    const close = document.getElementById('close')
    close.addEventListener("click", ()=>{
        window.location = "../../open/open.html"
    })}

const loadUser = async(id) =>{ // pega o usuario no banco de dados atraves do id
    const user = await(await fetch(`https://carlosapi.onrender.com/Users/${id}`)).json() // pego o usuario pelo id ja convertendo para json
    return user
}

const nav = (id) =>{
    const home = document.getElementById('home')
    const product = document.getElementById("Products")

    home.addEventListener("click", ()=>{
        window.location = `../home/home.html?id=${id}`
    })
    product.addEventListener("click", ()=>{
        window.location = '../products/products.html'
    })
}

const loadData = async() =>{
    const parametros = new URLSearchParams(window.location.search)

    const userID = parametros.get('id')
    
    const user = await loadUser(userID)
    nav(user.id)
    applyUserProperties(user)
    applyMyDate(user)
    applyMyItens(user)
    applyMyPoints()
    closeed()
}

loadData()