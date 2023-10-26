var express = require('express');




exports.index = (req,res) => {


    
    res.render('index',{
        title: "Welcome to Mark-anthony's Page",
        copyright: `designed by mark & ${new Date().getFullyear()}`
    })
}