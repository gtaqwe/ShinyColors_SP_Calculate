var nowSpNum;
var winSel;
var affectionNum;
var fanNum;
var extraSpNum;
var subSpNum;
var skillSpNum;
let totalAddFansChkBoxList = [];

const wingFansChkBoxList = [];
const fanFestivalFansChkBoxList = [];
const gradFansChkBoxList = [];
const lpFansChkBoxList = [];

class AddFans {
  constructor(value, description) {
    this.value = value;
    this.description = description;
  }
}

function setAddFansChkBoxList() {
  // WING
  wingFansChkBoxList.push(new AddFans(10000, "W.I.N.G. 우승 (+10,000)"));

  // 감사제
  fanFestivalFansChkBoxList.push(new AddFans(100000, "감사제 MVP (+100,000)"));
  fanFestivalFansChkBoxList.push(new AddFans(20000, "감사제 베스트 보컬 (+20,000)"));
  fanFestivalFansChkBoxList.push(new AddFans(20000, "감사제 베스트 댄서 (+20,000)"));
  fanFestivalFansChkBoxList.push(new AddFans(20000, "감사제 베스트 모델 (+20,000)"));
  fanFestivalFansChkBoxList.push(new AddFans(20000, "감사제 베스트 MC (+20,000)"));
  fanFestivalFansChkBoxList.push(new AddFans(20000, "감사제 베스트 테크닉 (+20,000)"));
  fanFestivalFansChkBoxList.push(
    new AddFans(10000, "감사제 열심히 잘한 상 (がんばったで賞) (+10,000)")
  );

  // GRAD
  gradFansChkBoxList.push(new AddFans(10000, "G.R.A.D. 우승 (+10,000)"));

  // Landing Point
  lpFansChkBoxList.push(new AddFans(10000, "Landing Point 라이브 대성공 (+10,000)"));

  // 종합
  totalAddFansChkBoxList.push(wingFansChkBoxList);
  totalAddFansChkBoxList.push(fanFestivalFansChkBoxList);
  totalAddFansChkBoxList.push(gradFansChkBoxList);
  totalAddFansChkBoxList.push(lpFansChkBoxList);

  totalAddFansChkBoxList = totalAddFansChkBoxList.flat();
}

$().ready(function () {
  init();
});

function init() {
  nowSpNum = 0;
  affectionNum = 0;
  fanNum = 0;
  extraSpNum = 0;
  subSpNum = 0;
  skillSpNum = 0;

  mainInputUpdate();
  setAddFansChkBoxList();
  generateAdditionalFansCheckbox();
  createPanel();
}

function changeProduceMode() {
  generateAdditionalFansCheckbox();
  finalTitleChange();
  mainInputUpdate();
}

function changeFinalWin() {
  finalTitleChange();
  mainInputUpdate();
}

function finalTitleChange() {
  var produceMode = $("#produceSel").val();
  var addedText = "";
  if (produceMode == 0) {
    $("#finalTitle").text("결승 / 본방 / 본선");
  } else if (produceMode == 1) {
    if ($("#winSel").val() == "win") addedText = "우승";
    else addedText = "패배";
    $("#finalTitle").text("결승").append(`<br /> (${addedText})`);
  } else if (produceMode == 2) {
    if ($("#winSel").val() == "win") addedText = "베스트 테크닉";
    else addedText = "미취득";
    $("#finalTitle").text("본방").append(`<br /> (${addedText})`);
  } else if (produceMode == 3) {
    if ($("#winSel").val() == "win") addedText = "우승";
    else addedText = "패배";
    $("#finalTitle").text("본선").append(`<br /> (${addedText})`);
  } else if (produceMode == 4) {
    if ($("#winSel").val() == "win") addedText = "대성공";
    else addedText = "성공";
    $("#finalTitle").text("본방").append(`<br /> (${addedText})`);
  }
}

function getAddFansChkBox() {
  var produceMode = $("#produceSel").val();
  if (produceMode == 0) {
    return totalAddFansChkBoxList;
  } else if (produceMode == 1) {
    return wingFansChkBoxList;
  } else if (produceMode == 2) {
    return fanFestivalFansChkBoxList;
  } else if (produceMode == 3) {
    return gradFansChkBoxList;
  } else if (produceMode == 4) {
    return lpFansChkBoxList;
  }
}

function generateAdditionalFansCheckbox() {
  chkBoxList = getAddFansChkBox();

  $("#additionalFans").empty();

  chkBoxList.forEach((addFansChk, id) => {
    $("#additionalFans")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `bonus${id}`,
          name: "bonusFanNum",
          value: addFansChk.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `bonus${id}`,
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

  extraSpNum = chkNumRange("#extraSpNum");
  $("#extraSpNum").val(extraSpNum);

  subSpNum = chkNumRange("#subSpNum");
  $("#subSpNum").val(subSpNum);
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
  var extraSp = extraSpNum;

  var subSp = subSpNum;
  var skillSp = skillSpNum;

  // 추가 SP
  $("#calNowSp").text(nowSp);
  $("#calWinSp").text(winSp);
  changeaffectionSP(affectionSp, affectionNum);
  changeFanSP(fanSp, totalFanNum);
  $("#calExtraSp").text(extraSp);

  var addSp = nowSp + winSp + affectionSp + fanSp + extraSp;
  $("#addSP").text(addSp);

  // 삭감 SP
  $("#calSubSp").text(subSp);

  var subtractSp = subSp + skillSp;
  $("#subtractSP").text(subtractSp);

  // 계산 결과 SP
  var totalSp = addSp - subtractSp;
  $("#resultSP").text(totalSp);
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

/**
 * 친애도 SP 계산
 */
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

/**
 * 스킬 패널 생성
 */
function createPanel() {
  $(".panel").append(`<ul>`);
  $(".panel ul").addClass(`container`);

  for (let root = 0; root < 6; root++) {
    for (let i = 2; i <= 5; i++) {
      for (let j = 1; j < i; j++) {
        $(`.panel .container`).append(
          `<li class="item sp${i * 10} hexNoSel" sel="noSel"><span class="inner noselect">${
            i * 10
          }</span></li>`
        );
      }
    }
  }

  // SP20 ~ SP50까지 패널 처리
  for (let i = 2; i <= 5; i++) {
    $(`.sp${i * 10}`).click(function () {
      // 선택->계산 제외
      if ($(this).attr("sel") == "sel") {
        $(this).attr("sel", "noCal");
        $(this).removeClass("hexSel");
        $(this).addClass("hexNoCal");

        // 패널 텍스트 변경
        $(this).children("span").text(0);

        skillSpNum -= i * 10;
      }
      // 계산 제외->미선택
      else if ($(this).attr("sel") == "noCal") {
        $(this).attr("sel", "noSel");
        $(this).removeClass("hexNoCal");
        $(this).addClass("hexNoSel");

        // 패널 텍스트 변경
        $(this)
          .children("span")
          .text(i * 10);
      }
      // 미선택->선택
      else {
        $(this).attr("sel", "sel");
        $(this).removeClass("hexNoSel");
        $(this).addClass("hexSel");
        skillSpNum += i * 10;
      }

      applyChangeSP();
    });
  }
}
