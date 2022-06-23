const Access_Key = `9VLgVsvIPbEgvJR-liIN0t9jRPAYXTPqdffPEeb2wHc`
const Secret_key = `iJ_e7tEIr0BDoTw2zjqtzyaKbpvApNV4OFloG1raPRY`

const my_nbr_images = 30



const parent_collection = document.getElementById('parentCollection');

const collections = [
    'animal','car','People','model man',
    'sport','historic','3D Renders','Wallpapers',
    'Business Work','Fashion','Textures & Patterns    ',
    'Experimental','Architecture','Nature',
    'Athletics','Arts & Culture','Spirituality ','Animals','Travel',
    'Street Photography','Interiors','Health & Wellness','Food & Drink  ',
    ,'Experimental    ','Editorial    '

];


function create_img(id,url_full,url_small,alt,parent,callback_overlay){
    const image  = document.createElement('img')
    image.setAttribute('id',  id ) 
    image.setAttribute('data-urlFull',url_full) 
    image.setAttribute('onclick',callback_overlay) 
    image.style.height = '200px'
    image.src = url_small
    image.alt = alt
    parent.appendChild(image)

}


for(let c in collections) {


    const xhttp = new XMLHttpRequest()
    function sendReauest(myAccess_Key,collection,nbr_images){
    xhttp.open("GET" ,
     `https://api.unsplash.com/search/photos/?query=${collection}&per_page=${nbr_images}&client_id=${myAccess_Key}`,
      true )
     xhttp.send()
     }      
     sendReauest(Access_Key,collections[c],my_nbr_images)
     

     xhttp.onreadystatechange = function () {
         if (this.readyState === 4 && this.status === 200) {
             data = JSON.parse(this.responseText);
        // console.log(  collections[c]  , data  )

           parent_collection.innerHTML += `
           <section id="${collections[c]}">
               <h1 class="title">${collections[c]}</h1>
               <article id="article_images${collections[c]}" >  </article>
           </section>`;

           const article_images_parent = document.getElementById(`article_images${collections[c]}`)

           for(let x in data.results) {

            create_img(`id_${data.results[x].id}`,`${data.results[x].urls.full}`,data.results[x].urls.small,data.results[x].description,article_images_parent,`overlay('id_${data.results[x].id}')` ) 
            }            
        }
    }

}


    

const iconclose = document.querySelector('svg')
iconclose.style.display = 'none'

function overlay(id_img){
    
    const img = document.querySelector(`#${id_img}`)
    console.log(img)



    let popupBox = document.createElement("div")
    popupBox.className = 'popup-box1'
    let imgHeading = document.createElement("h3")
    let imgText = document.createTextNode(img.alt)
    imgHeading.appendChild(imgText)
    popupBox.appendChild(imgHeading)

    let parent_popupBox = document.createElement("div")
    parent_popupBox.className = 'parent_popupBox'
   
    let pupopImage = document.createElement("img")
    pupopImage.src = img.getAttribute('data-urlFull')
    popupBox.appendChild(pupopImage)
    parent_popupBox.appendChild(popupBox)
    document.body.appendChild(parent_popupBox)

    iconclose.style.display = 'block'
    document.body.appendChild(iconclose)




document.addEventListener("click" , function(e){
    if( e.target.className == 'parent_popupBox'  ){
        document.querySelector(".popup-box1").remove()
        document.querySelector(".parent_popupBox").remove()
        iconclose.style.display = 'none'
    }
})
iconclose.addEventListener('click',function(){
    document.querySelector(".popup-box1").remove()
    document.querySelector(".parent_popupBox").remove()
    iconclose.style.display = 'none'

})

}


