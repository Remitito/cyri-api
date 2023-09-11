const User = require('../models/User')
const UserText = require('../models/UserText')


const formatDate = function() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return day + " " + months[month] + " " + year
}

// if text is long, cuts it down to just first 400 words
const cutText = function(text) {
    let output = ""
    if(text.split(' ').length > 350) {
        for(let i = 0; i < 350; i++) {
            output += text.split(' ')[i] + " "
        }
        return output
    }
    else {
        return text
    }
}

const addText = function(language, title, text, level, url, user) {
    const NewText = new UserText({
        language: language,
        title: title,
        text: cutText(text),
        date: Date.now(),
        dateString: formatDate(),
        level: level,
        url: url,
        user: user,
        views: 0,
        preview: text.split(' ').length >= 350 // if it's longer than 400 words, just show preview
    })
    NewText.save()
    .then(console.log("Text Added to DB"))
    .catch(console.log(err => console.log(err)))
}


const addUser = async function(username, email, password, membershipLength) {
    const member = false;
    try {
         await User.create({
            username, 
            email,
            password,
            membershipLength
        })
        return "User created successfully"
    }
    catch (error) {
        if(error.code === 11000) {
            if(Object.keys(error.keyPattern)[0] === "email") {
                return "Email is already in use"
            }
            else {
                return "Username is already in use"
            }
        }
    }
}

module.exports = {
    addTextFunc: addText,
    addUserFunc: addUser,
    formatDateFunc: formatDate,
}