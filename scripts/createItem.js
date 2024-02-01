class Item{
    constructor(name,price,description,image){
        this.name=name
        this.price = price
        this.description= description
        this.image= image
    }
}

const toBack = () =>{
    window.location = '../open/open.html'
}
const form = document.getElementById('form')
form.addEventListener("submit",async(event) =>{
    event.preventDefault()

    const name = form.elements['name'].value
    const price = form.elements['price'].value
    const descr = form.elements["description"].value
    const img = form.elements['image'].value

    const item = new Item(name,price,descr,img)
    await fetch(`https://carlosapi.onrender.com/Store`,{
    method:'POST',
    headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json'
    },
    body: JSON.stringify(item)
    })
    alert('Item cadastrado com sucesso')
    window.location.reload()
})