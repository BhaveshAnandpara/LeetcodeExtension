//* calling main function

main()


async function main() {

    const username = await chrome.storage.local.get('username')
    const userInfo = await chrome.storage.local.get('userInfo')


    if (username.username === undefined || userInfo.userInfo === undefined) {

        document.body.innerHTML = "<p id='not-found-msg'>Please go to Leetcode profile</p>"

        setData().then((username) => {
            console.log("Username Stored")
            userData(username)
        })
    } else {

        showHomePage()

    }



}


async function setData() {

    const proxy = "https://leetcode.com/"

    return new Promise((resolve, reject) => {

        //get url of tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {

            const url = tab[0].url

            //extract leetcode username
            const username = url.split(proxy)[1].split("/")[0]

            // Storing the username in chrome.storage
            chrome.storage.local.set({ username }).then((result) => {
                resolve(username)
            }).catch((err) => {
                console.log("error Occured" + err);
                reject(err)
            });


        });

    })


}

async function userData(username) {

    // Get User Details
    const response = await fetch('http://localhost:8000/user/getUserDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ username })
    })

    //Save User data in chrome.storage
    await response.json().then((res) => {

        chrome.storage.local.set({ userInfo: res }, () => {
            console.log("UserInfo Stored");
        })

    })

}


async function showHomePage() {

    //get stored UserInfo
    const data = await chrome.storage.local.get('userInfo')

    console.log(data.userInfo);

    setPageData(data.userInfo)

}

async function setPageData(data) {

    const totalEasy = 639
    const totalMedium = 1390
    const totalHard = 583

    //Profile
    document.getElementById('profileImg').src = data.matchedUser.profile.userAvatar
    document.getElementById('username').textContent = data.matchedUser.username
    document.getElementById('ranking').textContent = `Ranking : ${data.matchedUser.profile.ranking}`

    //Stats
    document.getElementById('easyLabel').textContent = `Easy ${data.matchedUser.submitStats.acSubmissionNum[1].count} / ${totalEasy}`
    document.getElementById('easyProg').value = data.matchedUser.submitStats.acSubmissionNum[1].count
    document.getElementById('easyProg').max = totalEasy

    document.getElementById('mediumLabel').textContent = `Medium ${data.matchedUser.submitStats.acSubmissionNum[2].count} / ${totalMedium}`
    document.getElementById('mediumProg').value = data.matchedUser.submitStats.acSubmissionNum[2].count
    document.getElementById('mediumProg').max = totalMedium

    document.getElementById('hardLabel').textContent = `Hard ${data.matchedUser.submitStats.acSubmissionNum[3].count} / ${totalHard}`
    document.getElementById('hardProg').value = data.matchedUser.submitStats.acSubmissionNum[3].count
    document.getElementById('hardProg').max = totalHard

    //Status

    await isSafe(data)


    //Inputs

    // SetTime Input
    let setTime
    await chrome.storage.local.get('time').then((res) => { setTime = res.time })

    document.getElementById('setTime').onchange = (e) => {
        console.log(e.target.value);
        chrome.storage.local.set({ 'time': e.target.value }).then(() => console.log("Time Saved"))
    }

    //If time is not undefined
    if (setTime !== undefined)
        document.getElementById('setTime').value = setTime



    // Interval Input
    let interval
    await chrome.storage.local.get('interval').then((res) => { 
            interval = res.interval 
    })

    document.getElementById('interval').onchange = (e) => {
        console.log(e.target.value);
        chrome.storage.local.set({ 'interval': e.target.value }).then(() => console.log("Interval Saved"))
        chrome.storage.local.set({"haveInfo" : true})
    }

    //If time is not undefined
    if (interval !== undefined)
        document.getElementById('interval').value = interval


    // Email Input
    let email
    await chrome.storage.local.get('email').then((res) => { email = res.email })

    document.getElementById('email').onchange = (e) => {
        console.log(e.target.value);
        chrome.storage.local.set({ 'email': e.target.value }).then(() => console.log("Email Saved"))
    }

    //If time is not undefined
    if (email !== undefined)
        document.getElementById('email').value = email

}


async function isSafe(data) {


    try {

        const unordered = JSON.parse(data.matchedUser.submissionCalendar)

        const ordered = Object.keys(unordered).sort().reduce(
            (obj, key) => {
                obj[key] = unordered[key];
                return obj;
            },
            {}
        );

        const today = new Date().getTime()

        if (ordered["" + today] === undefined) {

            const status = document.getElementById('status')
            status.textContent = "Not Submitted"
            status.style.color = "#ef4743"
            status.style.backgroundColor = "rgb(239, 71, 67 , 0.2)"


        }
        else {

            const status = document.getElementById('status')
            status.textContent = "Submitted"
            status.style.color = "#00b8a3"
            status.style.backgroundColor = "rgb(0, 184, 163 , 0.2)"

        }


    } catch (err) {
        console.log(err);
    }


}


async function checkStatus(data) {

    try {

        const unordered = JSON.parse(data.matchedUser.submissionCalendar)

        const ordered = Object.keys(unordered).sort().reduce(
            (obj, key) => {
                obj[key] = unordered[key];
                return obj;
            },
            {}
        );

        const today = new Date().getTime()

        if (ordered["" + today] === undefined) {
            return false            
        }
        else{
            return true
        }

    } catch (err) {
        console.log(err);
    }


}

