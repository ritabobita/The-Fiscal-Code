const months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }
const vowels = ['a', 'e', 'i', 'o', 'u']
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

function fiscalCode(person) {
 let idNumber = []
 idNumber.push(surname(person).join('').toUpperCase()) 
 idNumber.push(name(person).join('').toUpperCase()) 
 idNumber.push(birthdayYear(person)) 
 idNumber.push(birthdayMonth(person)) 
 if (person.gender === 'M') {
  idNumber.push(birthdayMale(person))  
 } else if (person.gender === 'F') {
 idNumber.push(birthdayFemale(person)) 
 } 
 return idNumber.join('')
}

//Name
function name(person) {
  let nameLower = person.name.toLowerCase()
  let personName = nameLower.split('')
  let containsVowelsName = personName.filter(letter => vowels.includes(letter))
  let containsConsonantsName = personName.filter(letter => (consonants.includes(letter)))
  if (containsConsonantsName.length === 3) {
    return containsConsonantsName.splice(0, 3)
  } else if (containsConsonantsName.length > 3) {
    let indexes = [0, 2, 3]
    let extractedIndexes = indexes.map(index => containsConsonantsName[index])
    return extractedIndexes
  } else if (containsConsonantsName.length < 3 && personName.length >= 3) {
    let conVowels = containsConsonantsName.concat(containsVowelsName)
    return conVowels.splice(0, 3)
  } else if (personName.length < 3 && personName.length !== 0) {
    let lessThanThree = containsConsonantsName.concat(containsVowelsName,'x', 'x')
    return lessThanThree.splice(0, 3)
  } else if (personName.length === 0) {
    return 'ERROR: No Name'
  }
}

//Surname
function surname(person) {
  let personSurnameLower = person.surname.toLowerCase()
  let personSurname = personSurnameLower.split('')
  let containsVowels = personSurname.filter(letter => vowels.includes(letter))
  let containsConsonants = personSurname.filter(letter => (consonants.includes(letter)))
	if (containsConsonants.length >= 3) {
    let threeRegular = containsConsonants.splice(0, 3)
    return threeRegular
  } else if (containsConsonants.length < 3 && personSurname.length >= 3) {
    let conVowels = containsConsonants.concat(containsVowels)
    return conVowels.splice(0, 3)
  } else if (personSurname.length < 3 && personSurname.length !== 0) {
    let lessThanThree = containsConsonants.concat(containsVowels,'x', 'x')
    return lessThanThree.splice(0, 3)
  } else if (personSurname.length === 0) {
    return 'ERROR: No Surname'
  }
}

// Birthday & Gender
function birthdayYear(person) { 
  let birthdayArray = person.dob.split('')
  return birthdayArray[birthdayArray.length - 2] + birthdayArray[birthdayArray.length - 1]
      }

function birthdayMonth(person) {
  const monthOfBirth = parseInt(person.dob.split('/')[1]);
  const correspondingValue = months[monthOfBirth]
  return correspondingValue
}

function birthdayMale(person) {
  const dayOfBirth = parseInt(person.dob.split('/')[0]);
  if (dayOfBirth < 10) {
    return '0' + dayOfBirth
  } else {
    return dayOfBirth
  }
}

function birthdayFemale(person) {
  const dayOfBirth = parseInt(person.dob.split('/')[0]);
  return dayOfBirth + 40
}


console.log(fiscalCode({
  name: "Matt",
  surname: "Edabit",
  gender: "M",
  dob: "1/1/1900"
})) //➞ "DBTMTT00A01"

console.log(fiscalCode({
  name: "Helen",
  surname: "Yu",
  gender: "F",
  dob: "1/12/1950"
}))// ➞ "YUXHLN50T41"

console.log(fiscalCode({
  name: "Mickey",
  surname: "Mouse",
  gender: "M",
  dob: "16/1/1928"
}))// ➞ "MSOMKY28A16"
