// //* Call Main fucntion

const proxy = 'https://leetcode-streaks.vercel.app/'

let timeInterval = async () => { await chrome.storage.local.get('interval') }
chrome.storage.local.set({ 'popup': false })

timeInterval = timeInterval.interval


//* Setting timeInterval 

if (timeInterval === undefined) {
    timeInterval = 5000
}

//* SetInterval function to check time for every 5 sec

setInterval(async () => {

    //* check whether we have all info of user leetcode account
    const haveInfo = await chrome.storage.local.get('haveInfo')

    if (haveInfo.haveInfo) {

        //* check whether we should display reminder container
        console.log("Checking Time");
        checkTime()

    }

}, 5000);


async function checkTime() {

    const time = new Date()

    //user SetTime
    const userTime = await chrome.storage.local.get('time')

    const hr = parseInt(userTime.time.split(':')[0])
    const min = parseInt(userTime.time.split(':')[1])

    let userInterval = await chrome.storage.local.get('interval')

    const originalTime = ((hr * 60) + min)
    const now = (time.getHours() * 60) + time.getMinutes()
    const interval = userInterval.interval

    let popup = await chrome.storage.local.get('popup')

    if ((now - originalTime) % interval == 1 && popup.popup) {

        await chrome.storage.local.set({ 'popup': false })

        console.log("Sending Msg");

        //* Sending the msg to content-scripts that show the reminder container
        chrome.windows.getCurrent(w => {
            chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
                const tabId = tabs[0].id;

                chrome.tabs.sendMessage(tabId, { show: false })

            });
        });

    }

    if ((now - originalTime) % interval == 0 && !(popup.popup)) {

        await chrome.storage.local.set({ 'popup': true })


        console.log("sending msg");
        //* Sending the msg to content-scripts that show the reminder container
        chrome.windows.getCurrent(w => {
            chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
                const tabId = tabs[0].id;

                chrome.tabs.sendMessage(tabId, { show: true })

            });
        });

    }



}
