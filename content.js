const body = document.querySelector("body");

main()


async function main() {

    // `document.querySelector` may return null if the selector doesn't match anything.
    if (body) {

        //Creating Container
        const box = document.createElement('div')
        box.className = " box "

        //Styling Containers
        box.style.display = "block"
        box.style.width = "400px"
        box.style.backgroundColor = "rgb(66 ,66 ,66 , 0.6)"
        box.style.zIndex = "10000"
        box.style.position = "absolute"
        box.style.top = "10px"
        box.style.right = "10px"
        box.style.padding = "20px 10px"
        box.style.color = "#fff"

        //Creating Title
        const title = document.createElement('h3')
        title.textContent = "Leetcode Streaks Reminder"
        
        //Fecthing cat images
        let cat = await fetch('https://api.thecatapi.com/v1/images/search')
        cat = await cat.json()

        //create div tag whom bg image will have cat image
        const imgDiv = document.createElement('div')
        imgDiv.style.width = "100%"
        imgDiv.style.height = "180px"
        imgDiv.style.backgroundImage = `url(${cat[0].url })`
        imgDiv.style.backgroundSize = "cover"
        imgDiv.style.overflow = 'hidden'

        //create a status div
        const status = document.createElement('div')
        status.textContent = "Not Submitted"
        status.style.textAlign = "center"
        status.style.padding = "8px"
        status.style.width = "100%"
        status.style.backgroundColor = "rgb(239, 71, 67 , 0.4)"
        status.style.color = "#fff"
        status.style.marginTop = "10px"

        const randomQueBtn = document.createElement('button')
        randomQueBtn.textContent = "Random Que"
        randomQueBtn.style.textAlign = "center"
        randomQueBtn.style.padding = "8px"
        randomQueBtn.style.width = "100%"
        randomQueBtn.style.backgroundColor = "rgb(255, 192, 30 ,0.6)"
        randomQueBtn.style.color = "#fff"
        randomQueBtn.style.marginTop = "10px"
        randomQueBtn.style.border = "none"
        randomQueBtn.style.outline = "none"
        randomQueBtn.onclick = ()=>{
            goToRandomQue()
        }



        // Append HTML to Body
        box.appendChild(title)
        box.appendChild(imgDiv)
        box.appendChild(status)
        box.appendChild(randomQueBtn)
        body.appendChild(box)

        



    }

}


async function goToRandomQue(){

    console.log("clicked");

    const que = await fetch('https://leetcode.com/api/problems/all/')
    const res = await que.json()    
    
    const arr = res.stat_status_pairs
    let limit = 2600

    
    while( true ){
        
        let item = arr[Math.floor( Math.random() * limit )]

        if ( item.difficulty === 1 ){
            console.log( item );
            break
        }
    }
    


}

