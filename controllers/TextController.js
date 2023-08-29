const mongoose = require('mongoose')
const UserText = require('../models/UserText')
const dbCommandModule = require('../utilities/dbCommands')
const formatDate = dbCommandModule.formatDateFunc
const addText = dbCommandModule.addTextFunc
const findLevel = require('../utilities/findLevel')

exports.checkLevelPost = function(req,res) {
    const output = findLevel(req.body.text, req.body.language)
    res.send(output)
}

exports.checkLevelPostShare = function(req,res) {
    const {language, title, text, level, url, user} = req.body.state
    addText(language, title, text, level, url, user)
    res.send("Text uploaded")
}



exports.getPageCount = async function (req, res) {
    try {
      const level = req.body.level;
      const query = level === "all" ? {} : { level: level };
      const pageCount = await UserText.countDocuments(query);
      res.send(Math.ceil(pageCount / 10).toString());
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  exports.getTexts = async function (req, res) {
    try {
      const { pageNum, level } = req.body;
      const query = level === "all" ? {} : { level: level };
      const texts = await UserText.find(query)
        .sort({ date: -1 })
        .skip(pageNum * 10)
        .limit(10);
      res.send(texts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


exports.getOne = function(req,res) {
    const objectId = mongoose.Types.ObjectId(req.body.id)
    let updatedViews = 0
    UserText.findById(objectId)
    .exec(function(err, page) {
        updatedViews = page.views + 1
        if(err) {res.send(err)}
        UserText.findByIdAndUpdate(objectId, {views: updatedViews},
            function(err) {
                if(err) {res.send(err)}
                else {
                    res.send(page)  
            }})
    })
}

exports.getNext = function(req,res) {
    const level = req.body.level
    const bodyId = req.body.id
    UserText.find({'level': level})
    .exec(function(err, pages) {
        if(err) {res.send(err)}
        let currentPageIndex = 0 // so we can +1 to go to next page
            for(let i = 0; i < pages.length; i++) {
                const pageId = pages[i]._id.toString()
                if(pageId === bodyId) {
                    currentPageIndex = i;
                    break
                }
            }
                if(currentPageIndex + 1 === pages.length) {
                    res.send(pages[0])
                }
                else {
                    res.send(pages[currentPageIndex + 1])
                }
    })
}



exports.updateAll = function(req,res) {
    try {
        UserText.updateMany({}, {preview: false})
        .then((results) => {
            res.send(results)
        })
    }
    catch {
        res.send("Fail")
    }
}