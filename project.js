/*
Each person in Italy has an unique identifying ID code issued by the national tax office after the birth registration: the Fiscal Code (Codice Fiscale). Check the Resources tab for more info on this.

Given an object containing the personal data of a person (name, surname, gender and date of birth) return the 11 code characters as a string following these steps:

Generate 3 capital letters from the surname, if it has:

At least 3 consonants then the first three consonants are used. (Newman -> NWM).
Less than 3 consonants then vowels will replace missing characters in the same order they appear (Fox -> FXO | Hope -> HPO).
Less than three letters then "X" will take the third slot after the consonant and the vowel (Yu -> YUX).
Generate 3 capital letters from the name, if it has:

Exactly 3 consonants then consonants are used in the order they appear (Matt -> MTT).
More than 3 consonants then first, third and fourth consonant are used (Samantha -> SNT | Thomas -> TMS).
Less than 3 consonants then vowels will replace missing characters in the same order they appear (Bob -> BBO | Paula -> PLA).
Less than three letters then "X" will take the the third slot after the consonant and the vowel (Al -> LAX).
Generate 2 numbers, 1 letter and 2 numbers from date of birth and gender:

Take the last two digits of the year of birth (1985 -> 85).
Generate a letter corresponding to the month of birth (January -> A | December -> T) using the table for conversion included in the code.
For males take the day of birth adding one zero at the start if is less than 10 (any 9th day -> 09 | any 20th day -> 20).
For females take the day of birth and sum 40 to it (any 9th day -> 49 | any 20th day -> 60).
*/

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