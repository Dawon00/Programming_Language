function quickSort(list, comp) {
  if (list.length <= 1) return list
  let piv = list[0]
  let low = list.filter((x) => comp(x, piv) < 0)
  let eql = list.filter((x) => comp(x, piv) === 0)
  let high = list.filter((x) => comp(x, piv) > 0)
  return quickSort(high, comp).concat(eql).concat(quickSort(low, comp))//high와 low 반대로 수정 -> 내림차순
}

module.exports = quickSort
