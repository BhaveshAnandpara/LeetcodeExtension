const body = document.querySelector("body");
const proxy = 'https://leetcode-streaks.vercel.app/'




//* main function that injects the HTML code into the webpage
async function main() {

    // `document.querySelector` may return null if the selector doesn't match anything.
    if (body) {

        //Creating Container
        const box = document.createElement('div')
        box.className = "box"
        box.id = "leetcodeBox"

        //Styling Containersz
        box.style.display = "none"
        box.style.width = "500px"
        box.style.height = "4rem"
        box.style.overflow = "hidden"
        box.style.marginTop = "0rem !important"
        box.style.backgroundColor = "rgba(0,0,0,0.6)"
        box.style.zIndex = "10000"
        box.style.position = "fixed"
        box.style.borderRadius = "8px"
        box.style.top = "10px"
        box.style.right = "10px"
        box.style.padding = "1rem 20px"
        box.style.color = "#fff"
        box.style.fontSize = "1rem"
        box.style.pointerEvents = "none";
        box.style.transform = "translate(100%)";
        box.style.transition = "transform 1.2s ease-out"


        //Creating header
        const header = document.createElement('div')
        header.className = "header"
        header.style.display = "flex"
        header.style.alignItems = "center"
        header.style.flexDirection = "row"
        header.style.marginBottom = "1rem"

        //Creating Title
        const title = document.createElement('h3')
        title.innerHTML = "<p> &#10024; Leetcode Streaks Reminder<p/>"
        title.style.marginRight = "15px"

        //Creating dropdown
        const dropIcon = document.createElement('img')
        const IconSrc = await chrome.runtime.getURL("icons/chevron-down.svg")
        dropIcon.src = IconSrc
        dropIcon.alt = "icons"
        dropIcon.style.width = "1rem"
        dropIcon.style.height = "1rem"
        dropIcon.style.cursor = "pointer"
        dropIcon.style.pointerEvents = "auto"
        dropIcon.onclick = () => {

            let box = document.getElementById('leetcodeBox')

            if (box.style.height !== 'fit-content')
                box.style.height = 'fit-content'
            else {
                box.style.height = '4rem'

            }

        }

        header.appendChild(title)
        header.appendChild(dropIcon)




        //Fecthing cat images

        let dum = await fetch('https://cataas.com/cat?json=true& width=1000')
        dum = await dum.json()
        console.log(dum);

        cat = `https://cataas.com/${dum.url}`

        //create div tag whom bg image will have cat image
        const imgDiv = document.createElement('div')
        imgDiv.style.width = "100%"
        imgDiv.style.height = "240px"
        imgDiv.style.marginTop = "20px"
        imgDiv.style.backgroundImage = `url(${cat})`
        imgDiv.style.backgroundSize = "contain"
        imgDiv.style.backgroundRepeat = "no-repeat"
        imgDiv.style.backgroundPosition = "center"
        imgDiv.style.overflow = 'hidden'

        //create a status div
        const status = document.createElement('div')
        status.textContent = "Not Submitted"
        status.style.fontSize = "1rem"
        status.style.textAlign = "center"
        status.style.padding = "8px 0 8px"
        status.style.width = "100%"
        status.style.backgroundColor = "rgb(239, 71, 67 , 0.4)"
        status.style.color = "#fff"
        status.style.marginTop = "10px"


        //creating and styling randomQueBtn Button
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
        randomQueBtn.style.fontSize = "1rem"
        randomQueBtn.style.cursor = "pointer"
        randomQueBtn.style.pointerEvents = 'auto'
        randomQueBtn.onclick = () => {
            goToRandomQue()
        }

        // Append HTML to Body
        box.appendChild(header)
        box.appendChild(imgDiv)
        box.appendChild(status)
        box.appendChild(randomQueBtn)
        body.appendChild(box)


    }

}

//* Logic to redirect to random que
async function goToRandomQue() {


    const randomQueTitle = await fetch(`${proxy}que/randomEasyQue`).catch(() => { alert('cannot redirect to the Que') })
    const res = await randomQueTitle.json()

    window.open(`https://leetcode.com/problems/${res}/`)


}

//* calling main function 
main()

//* listens to the message from background.js 
chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.show) {
        show()

    }
    if (!msg.show) {
        hide()
    }


})

async function hide() {

    const leetcodeBox = document.getElementById('leetcodeBox')
    leetcodeBox.style.transform = "translateX(100%)"
    leetcodeBox.style.display = "none"

}

async function show() {


    const leetcodeBox = document.getElementById('leetcodeBox')
    leetcodeBox.style.transform = "translateX(0%)"
    leetcodeBox.style.display = "block"

}








