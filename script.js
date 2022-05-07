import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDiGQKJkDSCzEIEu8ufg_MU3xtGfT1n9jE",
      authDomain: "final-8848d.firebaseapp.com",
      projectId: "final-8848d",
      storageBucket: "final-8848d.appspot.com",
      messagingSenderId: "596067224223",
      appId: "1:596067224223:web:b173418ac52abe09d630aa"
    };
   
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);   

    

  
    

  let transof = document.getElementById('POSTa')
  
  



const db= getFirestore();


const marcar = async()=>{
  let confirmar = confirm("estas seguro que deseas marcar la hora");
  if(confirmar){
    try {
      var options = {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition( success, error, options );
    
      async function success(position) {
        var coordenadas = position.coords;
      
        console.log('Tu posición actual es:');
        let lati  = (coordenadas.latitude);
        let coodi = (coordenadas.longitude);
        console.log('Más o menos ' + coordenadas.accuracy + ' metros.');
        const response = await axios.get('https://api.ipify.org?format=json');
        let ip = response.data.ip
        let dia = new Date().toDateString()
        let hora = new Date().toTimeString()
        let datos ={ip: ip, dia: dia, hora: hora,latitud: lati, longitude: coodi}
        await addDoc(collection(db, "llegada"),datos) 
      };
      
      function error(error) {
        console.warn('ERROR(' + error.code + '): ' + error.message);
      };

 
      alert("hora marcada con exito")    
    } catch (error) {
      alert("hora marcada con exito") 
    }

  }
}



  let transofa = document.getElementById('POSTaa')
  
  transofa.addEventListener("click",(e)=>{
    e.preventDefault()
   marcar()
  })  



  let animal = []
  let html =[]
  
  window.onload = function agregar(){
  let vender = confirm("vendiste algo?")
  if(vender){

  let cedula=prompt("nombre del cliente");
  let nombre = prompt("cedula del cliente")
   document.getElementById('dis').innerHTML= "Nombre:" + cedula;
   document.getElementById('diss').innerHTML= "Cedula:" + nombre;
   
  // document.getElementById("dia").innerHTML= new Date().toLocaleDateString()
 let producto= prompt("que producto vendiste");
 let cantidad= prompt("cantidad");
 let precio = prompt("precio");
 animal.push({producto:producto,precio:precio,cantidad:cantidad});
 let confirmar = confirm("vendista otra cosa");
 console.log(confirmar)
 while (confirmar) {
  let producto= prompt("que producto vendiste");
  let cantidad= prompt("cantidad");
  let precio = prompt("precio");
  animal.push({producto:producto,precio:precio,cantidad:cantidad});
  let confirmara = confirm("vendista otra cosa");
  if(confirmara){
    console.log(confirmara)
  }else(confirmar=false
    )
 }
 console.log(animal)
 document.getElementById('di').innerHTML = new Date().toLocaleDateString()+" a las " +new Date().toLocaleTimeString()
  animal.forEach(element => {
          
         html.push(`
         <tr>
         <td class="cantidad">${element.cantidad}</td>
         <td class="producto">${element.producto}</td>
         <td class="precio">${element.precio}</td>
         </tr>
         `)
  }); 
  document.getElementById('listado').innerHTML = html
   }
}


function imprimir() {
  console.log(animal)
 // window.print();
}

transof.addEventListener("click",async(e)=>{

  e.preventDefault();
if(animal===[]){


try {

  let datos ={
    producto: animal,
    fecha: new Date().toLocaleDateString(),
    hora: new Date().toLocaleTimeString()
  }

  await addDoc(collection(db, "facturas"),datos) 

  imprimir()

  alert("todo paso bien")

} catch (error) {

  alert("ocurrio un error")

}
}else{
  alert("no estas vendiendo nada")
  location.reload();
}

})
