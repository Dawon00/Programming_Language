// Project 2 -- Use Local Storage(localStore)
function listConsole(phoneBook) {
  phoneBook.list().forEach((row) => {
    console.log(JSON.stringify(row))
  })
}

function listHTML(phoneBook) {
  const tbody = document.querySelector('#contact-table-body')
  const tbodyText = phoneBook
    .list()
    .map((tr) => {
      return `<tr><td>${tr.name}</td><td>${tr.email}</td><td>${tr.phone}</td></tr>`
    })
    .join('\n')
  console.log(tbodyText)
  tbody.innerHTML = tbodyText
}

// Main Routine
let PHONE_BOOK = new PhoneBook('CONTACT_DB')

console.log('After Initial Create')

listConsole(PHONE_BOOK)
PHONE_BOOK.create({ name: 'cskim', email: 'cskim@hufs.ac.kr', phone: '031-330-4365' })
PHONE_BOOK.create({ name: 'cskim', email: 'cskim@hufs-gsuite.kr', phone: '010-111-1234' })
console.log('After add 2 cskim ')
listConsole(PHONE_BOOK)

PHONE_BOOK.read({ name: 'cskim' })

PHONE_BOOK.update({ name: 'cskim' }, { phone: '010-555-5555' })
console.log('After Update cskim')
listConsole(PHONE_BOOK)

console.log("After create some information")
PHONE_BOOK.create({ name: "Sophie", email: "Sophie.character@example.com", phone: "010-2222-2222" })
PHONE_BOOK.create({ name: "Howl", email: "Howl.character@example.com", phone: "010-111-1111" })
PHONE_BOOK.create({ name: "202001707 서다원", email: "da6921@naver.com", phone: "010-9779-6921" })
listConsole(PHONE_BOOK)


PHONE_BOOK.remove({ name: 'cskim' })
console.log('After Remove cskim')
listConsole(PHONE_BOOK)


listHTML(PHONE_BOOK)
