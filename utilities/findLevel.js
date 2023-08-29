const fs = require('fs')
const fileNames = ['A1.txt', 'A2.txt', 'B1.txt', 'B2.txt', 'C1.txt']

let newArray = []
// Remove names, quotes, numbers and special characters from text to improve accuracy
const removeNamesNumbers = function(userTextArray) {
    userTextArray.forEach(function (word) {
        if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(word) // remove special chars
        && isNaN(word) // remove numbers
        && word[0] !== word[0].toUpperCase()) {//remove names
            if(word.includes(".") || word.includes(",") || word.includes("!")) { // remove punctuation
                if(!newArray.includes(word)) {
                    const finalClean = word.replace(/[^\w\s\']|_/g, "")
                    .replace(/\s+/g, " ");

                    newArray.push(finalClean.slice(0, -1))
                }
            }
            else {
                if(!newArray.includes(word)) {
                    const finalClean = word.replace(/[^\w\s\']|_/g, "")
                    .replace(/\s+/g, " ");
                    newArray.push(finalClean)
                }  
            }
        } 
    })
    return newArray;
}

const compareTexts = function(userWords, levelWords) {
    let counter = 0; // counter used for calculating %
    for(let i = 0; i < userWords.length; i++) {
        if(levelWords.includes(userWords[i])) {
            counter += 1; // if word recognized, add one
        }
    }
    return Math.round(counter / userWords.length * 100) //return %
} 

// NEED TO ADD A PARAMETER FOR THE LANGUAGE TO BE ADDED TO PATH NAME BELOW 
const findLevel = function(userText, userLanguage) {
    const formatText = userText.replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, " ");
    let userTextArray = formatText.split(' '); // split text into words array
    userTextArray = removeNamesNumbers(userTextArray)
    for(let i = 0; i < fileNames.length; i++) {
        var str = fs.readFileSync(`./docs/${userLanguage}/${fileNames[i]}`, 'utf-8') // read vocab list
        let result = compareTexts(userTextArray, str.split(' ')) // get % of text in word list
        if(result < 80) { // if under 80% of words known, try level up
            continue;
        }
        else {
            return fileNames[i].substring(0, 2) 
        }
    }
    return "C2";
}

module.exports = findLevel