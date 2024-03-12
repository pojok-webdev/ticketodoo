i = require('./js/appInit')
i.app.get('/showreport/:rptType',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:params.rptType,
        ticketstart:'2023-01-01',ticketend:'2023-01-10',
        branches:['1','2','3','4'],
        numtoshow:5,category_id:1
    },
        result=>{
            res.send(result)
        }
    )
})
i.app.get('/rmainrootcausetop5/:ticketstart/:ticketend/:branches',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'mainrootcausetop5',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rsubrootcausetop5/:ticketstart/:ticketend/:branches/:numtoshow/:category_id',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'subrootcausetop5',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(','),numtoshow:params.numtoshow,category_id:params.category_id
    },result=>{
        res.send(result)
    })
})
i.app.get('/rshiftreport/:ticketstart/:ticketend/:branches',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'shiftreport',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rtiketperiodik/:ticketstart/:ticketend/:branches/:causecategories',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'tiketperiodik',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(','),causecategories:params.causecategories.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rkategorikomplain/:ticketstart/:ticketend/:branches/:causecategories',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'kategorikomplain',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rmainrootcause/:ticketstart/:ticketend/:branches/:causecategories',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'mainrootcause',
        ticketstart:params.ticketstart,ticketend:params.ticketend,branches:params.branches.split('-').join(',')
        ,causecategories:params.causecategories.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rticketbyidpelanggan/:client_id',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'ticketbyidpelanggan',
        client_id:params.client_id
    },result=>{
        res.send(result)
    })
})
i.app.get('/rdowntime/:branches',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'downtime',
        branches:params.branches.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rticketterselesaikan/:ticketstart/:ticketend/:branches/:causecategories',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'ticketterselesaikan',
        ticketstart:params.ticketstart,ticketend:params.ticketend,
        branches:params.branches.split('-').join(','),causecategories:params.causecategories.split('-').join(',')
    },result=>{
        res.send(result)
    })
})
i.app.get('/rticketterbuka/:ticketstart/:ticketend/:branches/:causecategories',(req,res)=>{
    params = req.params
    i.rptRouter.getData({
        rptType:'ticketterbuka',
        ticketstart:params.ticketstart,ticketend:params.ticketend,
        branches:params.branches.split('-').join(','),causecategories:params.causecategories.split('-').join(',')
    },result=>{
        res.send(result)
    })
})

i.app.listen(2000,out=>{
    console.log("App run on port 2000")
})