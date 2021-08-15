const Card = require('./card')
const FiveCards = require('./fivecards')

function getPairs(list5) { //pair들을 알아내는 함수 no, one, two
  //list5 -- list of five ranks
  if (list5.length < 2) return []
  else {
    if (list5[0] === list5[1]) return [list5[0]].concat(getPairs(list5.slice(2, list5.length)))
    else return getPairs(list5.slice(1, list5.length))
  }
}


function getPairTransform(fcList) { //pair 를 알아냄 no pair, one pair, two pair
  //fclist -- list of fiveCards ranks
  let pairList = getPairs(fcList)
  if (pairList.length === 0) {
    return [1, ...fcList] // no pair
  } else if (pairList.length === 1) {
    return [2, ...pairList, ...fcList.filter((r) => !pairList.includes(r))]
  } else if (pairList.length === 2) {
    // two pair or 4 cards
    if (pairList[0] !== pairList[1]) {
      // two pair
      return [3, ...pairList, ...fcList.filter((r) => !pairList.includes(r))]
    } else {
      // 4 cards
      return [8, pairList[0], ...fcList.filter((r) => !pairList.includes(r))]
    }
  }
  return [1, ...fcList] // no pair
}

const isStraight = (list5) =>
  list5.reduce(//prev랑 i 사이에 원래 curr 있었음
    (prev,curr, i) => (i === list5.length - 1 ? prev : prev && list5[i] === list5[i + 1] + 1),
    true
  )

function changeAceToOne(fcList) {
  //fclist -- list of fiveCards ranks
  let resList = [...fcList]
  let aceIndex = resList.indexOf(14) // has Ace
  if (aceIndex !== -1) {
    resList[aceIndex] = 1
    resList.sort((x, y) => y - x)
  }
  return resList
}
function getStraightScore(fcList) { // rank만 포함. straight아니면 0리턴, straight면 fcList[0]리턴
  //fclist -- list of fiveCards ranks

  // return 0 if not straight 
  // return fcList[0] if straight
  // return newList[0] if has Ace and changed to 1 is straight
  let straight = isStraight(fcList)
  if (straight) return fcList[0]

  let aceIndex = fcList.indexOf(14) // has Ace
  if (aceIndex !== -1) {
    let newList = changeAceToOne(fcList)
    if (isStraight(newList)) return newList[0]
  }
  return 0
}

function getStraightTransform(fcList) {//fcList는 rank만 포함
  //fclist -- list of fiveCards ranks
  let topVal = getStraightScore(fcList) //topVal은 fcList가 straight가 아니면 0이 됨
  return topVal ? [5, topVal] : [0] //topVal이 straight가 아니면 0을 리턴함
}

function getStraightFlush(fiveCards){ //fcList(rank, suit 포함) I made
  //Flush인지 먼저 확인
  let fcList1 = fiveCards.fiveCards.map((ca) => (ca.suit))
  l = getFlush(fcList1) //l은 1아니면 0을 리턴받음
  if (l === 0) //0이라면 Flush 아님(straight은 될 수도 있음)
   return 0
  else //flush라면. 이제 스트레이트 인지 확인하자
  {
    let fcList = fiveCards.fiveCards.map((ca) => (ca.rank === Card.ACE ? Card.KING + 1 : ca.rank))
    l = getStraightScore(fcList) // fcList는 rank만 포함해야. fclist가 스트레이트면 0이 아닌 결과가 나올것
    if(l !== 0)//스트레이트라면
    {
      return 1 //카드 하나 들어있는 리스트를 리턴함
    }
    else //스트레이트가 아니라면
      return 0
  }
}

function getStraightFlushTransForm(fiveCards){//fcList는 rank, suit 포함
  let fcList1 = fiveCards.fiveCards.map((ca) => (ca.rank === Card.ACE ? Card.KING + 1 : ca.rank))
  let pairList = getStraightFlush(fiveCards)//둘다 포함. pairList는 0아니면 1 들어감
  if(pairList === 0) // pairList가 0이면 스트레이트 플러쉬가 아님
    return [1, ...fcList1]
  else{//pairList가 1이면 스트레이트 플러쉬 이다
    if (fcList1[4]===10)
      return [9, fcList1[0]] //14출력
    else if(fcList1[4]===2)
      return [9, fcList1[1]] //5출력
    else
      return [9, fcList1[4]]
  } 
}


function getTriples(list5){ // triple을 알아내는 함수 I made
  if(list5.length < 3) return []
  else{
    if(list5[0]===list5[1] && list5[1]===list5[2]) 
    return [list5[0]].concat(getTriples(list5.slice(3,list5.length)))
    else 
    return getTriples(list5.slice(1,list5.length))
  }
}


function getTripleTransform(fcList) { //I made
  //fclist -- list of fiveCards ranks
  let pairList = getTriples(fcList)
  if (pairList.length !== 0) { // 트리플 일때(4점)
    return [4, ...pairList, ...fcList.filter((r) => !pairList.includes(r))]
  } 
  else //트리플이 아니라면
    return [1, ...fcList] // no pair (1점처리)
}

function getFullHouseTransform(fcList) { //풀 하우스 일 때 I made
  //fclist -- list of fiveCards ranks
  let pairList = getTriples(fcList)
  let l = getPairs(fcList)
  if (pairList.length !== 0 && l.length === 2) { // 풀하우스 조건을 만족한다면(7점)
    return [7, ...pairList, ...l.filter((r) => !pairList.includes(r))]
  } 
  else //풀하우스가 아니라면
  return [1, ...fcList] // no pair (1점처리)
}

function isFlush(fiveCards) {
}


function getFlush(suitList){ // suitList(suit만 포함) I made
  //let fcList = fiveCards.fiveCards.map((ca) => (ca.rank === Card.ACE ? Card.KING + 1 : ca.rank))
  //let suitList = fiveCards.fiveCards.map((ca) => (ca.suit))
  if(suitList.length < 2) 
    return 1
  else{ //카드가 2개 이상이라면 0번째와 1번째 모양을 비교함. 같으면 0번째꺼 자르고 다시확인. 다르면 바로 [] return
    if(suitList[0] === suitList[1]){ // 0,1번째 비교
			suitList = suitList.slice(1,) //맨 앞 요소만 빼기
      //console.log('잘랐습니다',suitList) // 2 2 2 2
      if(suitList[0] === suitList[1]){ // 1,2비교
        suitList = suitList.slice(1)
        //console.log('잘랐습니다',suitList)// 2 2 2
        if(suitList[0] === suitList[1]){ // 2,3 비교
          suitList = suitList.slice(1)
          //console.log('잘랐습니다',suitList)// 2 2
          if(suitList[0] === suitList[1]){// 3,4비교
            suitList = suitList.slice(1)
            //console.log('잘랐습니다',suitList) // 2
            if(suitList.length === 1)
              return 1
          }
          else
            return 0
        }
        else
          return 0
      }
      else
        return 0
    }
    else 
      return 0  
  }
}

function getFlushTransform(fiveCards){//fiveCards(rank, suit포함)를 받아옴
  //fcList1은 rank가 저장된 배열
  let fcList1 = fiveCards.fiveCards.map((ca) => (ca.rank === Card.ACE ? Card.KING + 1 : ca.rank))
  //fcList2는 suit가 저장된 배열
  let fcList2 = fiveCards.fiveCards.map((ca) => (ca.suit))
  fcList = getFlush(fcList2)//getFlush는 1이나 0 을 리턴함
  if(fcList === 1) //flush라면 
    return [6, ...fcList1]
  else{ //no pair
    return [1, ...fcList1]
  }
}

function pokerTransform(fiveCards) {
  //fiveCards -- A FiveCards Instance
  let fcList = fiveCards.fiveCards.map((ca) => (ca.rank === Card.ACE ? Card.KING + 1 : ca.rank))
  //fclist -- list of fiveCards ranks
  let pokerRankList = getPairTransform(fcList) //1,2,3 점(no, one, two pair 의 경우)
  let tempList = getStraightTransform(fcList)//rank 만 포함 5점
  pokerRankList = tempList[0] > pokerRankList[0] ? tempList : pokerRankList //점수가 더 높은 경우가 pokerRankList에 저장
  // triple check
  tempList = getTripleTransform(fcList) // 4점
  pokerRankList = tempList[0] > pokerRankList[0] ? tempList : pokerRankList
  // Full house check
  tempList = getFullHouseTransform(fcList) //7점
  pokerRankList = tempList[0] > pokerRankList[0] ? tempList : pokerRankList
  // Flush check
  tempList = getFlushTransform(fiveCards) //6점
  pokerRankList = tempList[0] > pokerRankList[0] ? tempList : pokerRankList
  // Straight Flush check 
  tempList = getStraightFlushTransForm(fiveCards) // 9점
  pokerRankList = tempList[0] > pokerRankList[0] ? tempList : pokerRankList
  return pokerRankList
}

module.exports = pokerTransform
