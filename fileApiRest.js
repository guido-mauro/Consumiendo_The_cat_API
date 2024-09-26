const API_RANDOM = "https://api.thecatapi.com/v1/images/search"

const API_KEY = "live_HrMKZ80PsLxJcqBNEolnFV9yvSGQToTDFZu86DnC6HyT2LbNiUNu3bcTzHiPrIC7"
const API_FAVORITOS = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`


let botonXMLHttpRequest = document.getElementById("boton-XMLHttpRequest")
botonXMLHttpRequest.addEventListener('click',gatitosAleatoriosXMLHttpRequest)


function fetchData(urlApi,callback){

    let xhttp = new XMLHttpRequest()
    xhttp.open('GET',urlApi,true)

    xhttp.onreadystatechange = function(){

        console.log("El valor del readyState es " + xhttp.readyState)

        if(xhttp.readyState === 4){

            if(xhttp.status === 200){

                callback(null,JSON.parse(xhttp.responseText))

            }else{

                const error = new Error("Error " + urlApi)
                callback(error,null)
            }
        }
        
    }

    xhttp.send()

}


function gatitosAleatoriosXMLHttpRequest(){

    fetchData(API_RANDOM,function(error1,data1){

        if(error1){return console.error(error1)}
        console.log("Esta es la respuesta usando XMLHttpRequest")
        console.log(data1)
        crearImagen(data1)
        
    })

}


let botonPromesas = document.getElementById("boton-promesa")
botonPromesas.addEventListener('click',()=>gatitoAleatorioPromesa(API_RANDOM))

function gatitoAleatorioPromesa(urlApi){

    fetch(urlApi)

        .then(res => res.json())
        .then(data =>{

            console.log("Esta es la respuesta de la promesa")
            console.log(data)
            crearImagen(data)
        })
        
        
    ;


}

let botonAsyncAwait = document.getElementById("boton-async-await")
botonAsyncAwait.addEventListener('click',()=>gatitoAleatorioAsyncAwait(API_RANDOM))


async function gatitoAleatorioAsyncAwait(urlApi){

    const response = await fetch(urlApi)
    const data = await response.json()

    console.log("Esta es la respues usando Async y Await")
    console.log(data)
    crearImagen(data)

}

let seccionGatitosAleatorios = document.getElementById("seccionGatitosAleatorios")


function crearImagen(dataObtenida){

    const articulito = document.createElement('article')
    articulito.setAttribute("class","articulito")
    
    const imagenGatito = document.createElement('img')
    imagenGatito.setAttribute("class","imagenGatito")
    imagenGatito.src = dataObtenida[0].url
    
    const botonAgregarAFavoritos = document.createElement('button')
    botonAgregarAFavoritos.setAttribute("class","botonFavorito")
    botonAgregarAFavoritos.addEventListener('click',probando)
    botonAgregarAFavoritos.innerText = "Agregar a Favoritos"


    articulito.appendChild(imagenGatito)
    articulito.appendChild(botonAgregarAFavoritos)
 
    seccionGatitosAleatorios.appendChild(articulito)




}


let botonCargarFavoritos = document.getElementById("boton-cargar-favoritos")
botonCargarFavoritos.addEventListener('click',()=>cargarFavoritos(API_FAVORITOS))

let sectionGatitosFavoritos = document.getElementById("seccionGatitosFavoritos")
sectionGatitosFavoritos.style.display = 'none'


function cargarFavoritos(urlApi){

    fetch(urlApi)
        .then(response => response.json())
        .then(data =>{

            console.log("Estoy cargando los favoritos con sintaxis de Promesa")
            console.log(data)

            data.forEach((gatito) => {
                
                console.log(gatito)
                crearImagenFavoritos(gatito)
            });

        })
    ;

    seccionGatitosAleatorios.style.display = 'none'
    sectionGatitosFavoritos.style.display = 'flex'


}



function probando(){

    alert("El boton anda")

}




function crearImagenFavoritos(dataObtenida){

    const articulito = document.createElement('article')
    articulito.setAttribute("class","articulito")
    
    const imagenGatito = document.createElement('img')
    imagenGatito.setAttribute("class","imagenGatito")
    imagenGatito.src = dataObtenida.image.url
    
    const botonEliminarDeFavoritos = document.createElement('button')
    botonEliminarDeFavoritos.setAttribute("class","botonFavorito")
    botonEliminarDeFavoritos.addEventListener('click',probando)
    botonEliminarDeFavoritos.innerText = "Eliminar de Favoritos"


    articulito.appendChild(imagenGatito)
    articulito.appendChild(botonEliminarDeFavoritos)
 
    sectionGatitosFavoritos.appendChild(articulito)




}









