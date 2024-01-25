const showForm = ()=>{
    document.getElementById('login').style.display="flex"
    document.getElementById('goToForm').style.display="none"
}

const formulario = document.querySelector('#form')
formulario.addEventListener('submit', async(evento) =>{
    evento.preventDefault()


    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const users = await (await fetch('http://localhost:3000/Users')).json()
    let usuario =[]
    
    users.forEach(element => {
        if(element.email === email  && element.password === password){
            usuario.push(element)
            }}
        )
    
    if (usuario.length > 0){
        window.location = `../home/home.html?id=${usuario[0].id}`
    }else{
        alert("Usuario ou contrasenha incorretos")
    }
})