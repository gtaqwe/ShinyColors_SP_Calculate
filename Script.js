var nowSpNum;
var winSel;
var affectionNum;
var fanNum;
const addFansChkBoxList = [];

class AddFans {
  constructor(id, value, description) {
    this.id = id;
    this.value = value;
    this.description = description;
  }
}

function setAddFansChkBoxList() {
  addFansChkBoxList.push(new AddFans(1, 10000, "W.I.N.G. 우승 (+10,000)"));
  addFansChkBoxList.push(new AddFans(2, 100000, "감사제 MVP (+100,000)"));
  addFansChkBoxList.push(new AddFans(3, 20000, "감사제 베스트 보컬 (+20,000)"));
  addFansChkBoxList.push(new AddFans(4, 20000, "감사제 베스트 댄서 (+20,000)"));
  addFansChkBoxList.push(new AddFans(5, 20000, "감사제 베스트 모델 (+20,000)"));
  addFansChkBoxList.push(new AddFans(6, 20000, "감사제 베스트 MC (+20,000)"));
  addFansChkBoxList.push(new AddFans(7, 20000, "감사제 베스트 테크닉 (+20,000)"));
  addFansChkBoxList.push(
    new AddFans(8, 10000, "감사제 열심히 잘한 상 (がんばったで賞) (+10,000)")
  );
  addFansChkBoxList.push(new AddFans(9, 10000, "G.R.A.D. 우승 (+10,000)"));
  addFansChkBoxList.push(new AddFans(10, 10000, "Landing Point 라이브 대성공 (+10,000)"));
}

init();

function init() {
  mainInputUpdate();
  setAddFansChkBoxList();
  generateAdditionalFansCheckbox();
}

function generateAdditionalFansCheckbox() {
  addFansChkBoxList.forEach((addFansChk) => {
    $("#additionalFans")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `bonus${addFansChk.id}`,
          name: "bonusFanNum",
          value: addFansChk.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `bonus${addFansChk.id}`,
          text: ` ${addFansChk.description}`,
        }).append("<br />")
      );
  });
}

function mainInputUpdate() {
  initNumVal();
  winSel = $("#winSel").val();

  applyChangeSP();
}

function initNumVal() {
  nowSpNum = chkNumRange("#nowSpNum");
  $("#nowSpNum").val(nowSpNum);

  affectionNum = chkNumRange("#affectionNum");
  $("#affectionNum").val(affectionNum);

  fanNum = chkNumRange("#fanNum");
  $("#fanNum").val(fanNum);
}

function chkNumRange(targetId) {
  var min = Number($(targetId).attr("min"));
  var max = Number($(targetId).attr("max"));

  var num;
  var target;
  // 입력 데이터가 숫자가 아닐시 최소값으로 변경
  if (isNaN($(targetId).val())) {
    num = min;
    target = min;
  } else {
    num = Number($(targetId).val());
    target = Number($(targetId).val());
  }

  if (target < min) {
    num = min;
  }

  if (target > max) {
    num = max;
  }

  return num;
}

function applyChangeSP() {
  var nowSp = nowSpNum;
  var winSp = winSpCal(winSel);
  var affectionSp = affectionNum;
  var totalFanNum = totalFanNumCal(fanNum);
  var fanSp = fanSpCal(totalFanNum);

  var totalSp = calSp(nowSp, winSp, affectionSp, fanSp);

  $("#calNowSp").text(nowSp);
  $("#calWinSp").text(winSp);
  changeaffectionSP(affectionSp, affectionNum);
  changeFanSP(fanSp, totalFanNum);

  $("#resultSP").text(totalSp);
}

function calSp(nowSp, winSp, affectionSp, fanSp) {
  var totalSp = nowSp + winSp + affectionSp + fanSp;
  return totalSp;
}

function winSpCal(result) {
  return result == "win" ? 60 : 0;
}

function fanSpCal(totalFanNum) {
  var fanSp = Math.floor(totalFanNum / 10000) * 3;
  if (fanSp >= 300) return 300;
  else return fanSp;
}

function totalFanNumCal(fanNum) {
  var totalFanNum = fanNum;
  var addFansBonus = $(`input[name="bonusFanNum"]`);

  for (var i = 0; i < addFansBonus.length; i++) {
    if (addFansBonus.eq(i).is(":checked") == true) {
      totalFanNum += Number(addFansBonus.eq(i).val());
    }
  }

  return totalFanNum;
}

function changeaffectionSP(affectionSp, affectionNum) {
  var affectionLvValList = [1, 25, 50, 75, 100];
  var affectionDetailLv;
  var affectionDetailNext;
  var affectionDetailStr;

  if (affectionNum >= 100) {
    affectionDetailStr = "Lv : Max";
  } else {
    for (var i = affectionLvValList.length - 1; i >= 0; i--) {
      if (affectionNum < affectionLvValList[i]) {
        affectionDetailLv = i;
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum;
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext;
      }
    }
  }

  $("#affectionHead").text(`(${affectionDetailStr})`);
  $("#calaffectionSp").text(affectionSp);
}

function changeFanSP(fanSp, totalFanNum) {
  $("#fanNumHead").text(`(총 ${numberWithCommas(totalFanNum)}명)`);
  $("#calFanSp").text(fanSp);
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
