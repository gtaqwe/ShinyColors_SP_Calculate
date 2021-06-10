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
    var totalFanNum = totalFanNumCal(fanNum)
    var fanSp = fanSpCal(totalFanNum)

    var totalSp = calSp(nowSp, winSp, affectionSp, fanSp)

    changeNowSP(nowSp)
    changeWinSP(winSp)
    changeaffectionSP(affectionSp, affectionNum)
    changeFanSP(fanSp, totalFanNum)

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

function fanSpCal(totalFanNum) {
    var fanSp = (Math.floor(totalFanNum/10000))*3
    if (fanSp >= 300) return 300
    else return fanSp
}

function totalFanNumCal(fanNum) {
    var totalFanNum = fanNum
    var bonus_length = document.getElementsByName("bonusFanNum").length;
  
    for (var i=0; i<bonus_length; i++) {
        if (document.getElementsByName("bonusFanNum")[i].checked == true) {
            totalFanNum += Number(document.getElementsByName("bonusFanNum")[i].value)
        }
    }

    return totalFanNum
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

    if (affectionNum >= 100) {
        affectionDetailStr = "Lv : Max"
    }
    else {
        for (var i = affectionLvValList.length - 1 ; i >= 0; i--) {
            if (affectionNum < affectionLvValList[i]) {
                affectionDetailLv = i
                affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum
                affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext
            }
        }
    }

    document.getElementById("affectionHead").innerText = "(" + affectionDetailStr + ")"
    document.getElementById("calaffectionSp").innerText = affectionSp
}

function changeFanSP(fanSp, totalFanNum) {
    document.getElementById("fanNumHead").innerText = "(총 " + numberWithCommas(totalFanNum) + "명)"
    document.getElementById("calFanSp").innerText = fanSp
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}