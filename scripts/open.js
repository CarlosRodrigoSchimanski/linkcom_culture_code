const showForm = ()=>{
    document.getElementById('login').style.display="flex"
    document.getElementById('goToForm').style.display="none"
}

const formulario = document.querySelector('#form')
formulario.addEventListener('submit', async(evento) =>{

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const users = await (await fetch('http://localhost:3000/Users')).json()
    
    users.forEach(element => {
        if(element.email === email  && element.password === password){
            window.location = `../home/home.html?id=${element.id}`
        }else{
            alert("usuario ou senha invalidos")
        }
    })
})