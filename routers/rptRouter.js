const { doQuery } = require("../js/connection")
var mainrootcausetop5 = require('./../models/mainrootcausetop5'),
    subrootcausetop5 = require('../models/subrootcausetop5'),
    shiftreport = require('./../models/shiftreport'),
    tiketperiodik = require('./../models/laporanticketperiodic'),
    kategorikomplain = require('./../models/laporankategorikomplain'),
    mainrootcause = require('./../models/laporanmainrootcause'),
    ticketbyidpelanggan = require('../models/ticketbyidpelanggan'),
    downtime = require('../models/laporandowntime'),
    ticketterselesaikan = require('../models/laporanticketterselesaikan'),
    ticketterbuka = require('../models/laporanticketterbuka')
getTemplate = (obj) => {
    switch(obj.rptType){
        case 'mainrootcausetop5':

        break
    }
}
getData = (obj,callback) => {
    console.log("obj",obj)
    switch(obj.rptType){
        case 'mainrootcausetop5':
            sql = mainrootcausetop5.get(obj)
        break
        case 'subrootcausetop5':
            sql = subrootcausetop5.get(obj)
        break
        case 'shiftreport':
            sql = shiftreport.get(obj)
        break
        case 'tiketperiodik':
            sql = tiketperiodik.get(obj)
        break
        case 'kategorikomplain':
            sql = kategorikomplain.get(obj)
        break
        case 'mainrootcause':
            sql = mainrootcause.get(obj)
        break
        case 'ticketbyidpelanggan':
            sql = ticketbyidpelanggan.get(obj)
        break
        case 'downtime':
            sql = downtime.get(obj)
        break
        case 'ticketterselesaikan':
            sql = ticketterselesaikan.get(obj)
        break
        case 'ticketterbuka':
            sql = ticketterbuka.get(obj)
        break
        default:
            sql = ''
    }
    callback(sql)
    /*doQuery(sql,result=>{
        callback(result)
    })*/
}
module.exports = {
    getTemplate:getTemplate,
    getData:getData,
    tiketperiodik:tiketperiodik,
    kategorikomplain:kategorikomplain
}