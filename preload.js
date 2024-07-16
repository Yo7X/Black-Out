const {ipcRenderer} = require('electron')

console.log('f')

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', () => {
        if (document.getElementById('coverTwoCheck').checked) {
            useSecondCover = true
        } else {
            useSecondCover = false
        }


        ipcRenderer.send('openCoverWindows', document.getElementById('coverOneStart').value, document.getElementById('coverOneEnd').value, useSecondCover, document.getElementById('coverTwoStart').value, document.getElementById('coverTwoEnd').value)
    })
})