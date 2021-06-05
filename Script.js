var nowSpNum
var winSel
var affectionNum
var fanNum

init()

function init() {
    mainInputUpdate()
}

function mainInputUpdate() {
    initNumVal()
    winSel = document.getElementById("winSel").value

    // console.log(nowSpNum, winSel, affectionNum, fanNum)

    applyChangeSP()    
}

function initNumVal() {
    nowSpNum = chkNumRange("nowSpNum")
    document.getElementById("nowSpNum").value = nowSpNum

    affectionNum = chkNumRange("affectionNum")
    document.getElementById("affectionNum").value = affectionNum

    fanNum = chkNumRange("fanNum")
    document.getElementById("fanNum").value = fanNum
}

function chkNumRange(targetId) {
    var target = Number(document.getElementById(targetId).value)
    var num = Number(document.getElementById(targetId).value)
    var min = Number(document.getElementById(targetId).min)
    var max = Number(document.getElementById(targetId).max)
    
    if (target < min) {
        num = min
    }

    if (target > max) {
        num = max
    }

    return Number(num)
}

function applyChangeSP() {
    var nowSp = nowSpNum
    var winSp = winSpCal(winSel)
    var affectionSp = affectionNum
    var fanSp = fanSpCal(fanNum)

    var totalSp = calSp(nowSp, winSp, affectionSp, fanSp)


    changeNowSP(nowSp)
    changeWinSP(winSp)
    changeaffectionSP(affectionSp, affectionNum)
    changeFanSP(fanSp)

    document.getElementById("resultSP").innerText = totalSp
}

function calSp(nowSp, winSp, affectionSp, fanSp) {
    var totalSp = nowSp + winSp + affectionSp + fanSp
    return totalSp
}

function winSpCal(result) {
    if (result == "win") return 60
    else return 0
}

function fanSpCal(fanNum) {
    var fanSp = (Math.floor(fanNum/10000))*3
    if (fanSp >= 300) return 300
    else return fanSp
}

function changeNowSP(nowSp) {
    document.getElementById("calNowSp").innerText = nowSp
}

function changeWinSP(winSp) {
    document.getElementById("calWinSp").innerText = winSp
}

function changeaffectionSP(affectionSp, affectionNum) {
    var affectionLvValList = [1, 25, 50, 75, 100]
    var affectionDetailLv
    var affectionDetailNext
    var affectionDetailStr

    if (affectionNum < affectionLvValList[0]) {
        affectionDetailLv = 0
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
    }
    else if (affectionNum < affectionLvValList[1]) {
        affectionDetailLv = 1
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
    }
    else if (affectionNum < affectionLvValList[2]) {
        affectionDetailLv = 2
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
    }
    else if (affectionNum < affectionLvValList[3]) {
        affectionDetailLv = 3
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
    }
    else if (affectionNum < affectionLvValList[4]) {
        affectionDetailLv = 4
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
    }
    else {
        affectionDetailStr = "Lv : Max"
    }

    document.getElementById("affectionHead").innerText = "(" + affectionDetailStr + ")"
    document.getElementById("calaffectionSp").innerText = affectionSp
}

function changeFanSP(fanSp) {
    document.getElementById("calFanSp").innerText = fanSp
}