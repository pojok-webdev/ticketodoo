const hsm = require('./assets/app/sending/hsm')
var i = require('./js/appInit')
i.app.post('/sendmessages',(req,res)=>{
  i.ctrl.sendMessages(req.body)
})
i.app.get('/main',(req,res)=>{
  res.redirect('/categories')
})
i.app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Manual'
  })
})
i.app.get('/categoriesv2',(req,res)=>{
  res.render('categoriesv2/table',{
    title:'Kategori v2',pagename:'Kategoriv2',email:'test'
  })
})
i.app.get('/categories',(req,res)=>{
  console.log('SessioN',req.session)
  i.auth.checkLogin({
    req:req,res:res,redirpath:'categories/table',title:'Kategori',pagename:'kategori'
  })
})
i.app.get('/getcategory/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'id',val:params.id}]
    })
  ,result=>{
    res.send(result)
  })
})
i.app.get('/datacategories',(req,res)=>{
  i.con.doQuery(
    'select id,name,description,count(b.client_id)cnt from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b on b.category_id=a.id '
    +'group by id,name,description',result=>{
      console.log('datacategories',result)
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.description,obj.cnt]
      })})
    }
  )
})
i.app.post('/updatecategory',(req,res)=>{
  params = req.body
  console.log('X',i.crud.update({
    tableName:'qiscus.messagecategories',
    cols:[{key:'name',val:params.name},{key:'description',val:params.description}],
    conditions:[{key:'id',val:params.id}]
  }))
  i.con.doQuery(
    i.crud.update({
      tableName:'qiscus.messagecategories',
      cols:[{key:'name',val:params.name},{key:'description',val:params.description}],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Update Kategori '+params.id+' '+params.name,
        description:'Update Kategori ('+params.id+') '+params.prevName+'->'+params.name+','+params.prevDesc+'->'+params.description,
        i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/removecategory/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.messagecategories',
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,subject:'Remove Category '+params.id,description:'Remove Category '+params.id,i:i
      },
        logresult=>{
          console.log('logresult',logresult)
          res.send(result)
        })
    }
  )
})
i.app.post('/savecategory',(req,res)=>{
  params = req.body
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.messagecategories',
      cols:[{key:'name',val:params.name},{key:'description',val:params.description}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Save Category '+params.name,
        description:'Save Category '+params.name,i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/clients',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'clients/table',title:'Pelanggan',pagename:'Pelanggan'
  })
})
i.app.get('/dataclients',(req,res)=>{
  if(1==2){i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.clients',
      cols:['id','name','location_id','address','picname','picwa','description','kdfb','ou'],
      conditions:[{key:'1',val:'1'}]
    }),result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.location_id,obj.address,obj.picname,obj.picwa,obj.description,obj.kdfb,obj.ou]
      })})
    }
  )
  }
  i.con.doQuery('select id,name,location_id,address,picname,picwa,description,kdfb,concat("_",ou,"_") ou from qiscus.clients',result=>{
    res.send({data:result.map(obj=>{
      return [obj.id,obj.name,obj.location_id,obj.address,obj.picname,obj.picwa,obj.description,obj.kdfb,obj.ou]
    })})
  })
})
i.app.get('/dataclientsbycategory/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select distinct b.id,b.name,b.address,b.picname,b.picwa,b.description,b.location_id,b.kdfb,b.ou network from qiscus.categories_clients a '
    +'left outer join qiscus.clients b on b.id=a.client_id '
    +'where a.category_id = '+params.category_id
    ,result=>{
      console.log('ResulT',result)
      res.send({data:result.map(obj=>{
        return ['<div class="form-group"><div class="icheck-primary d-inline availableClient"><input type="checkbox" class="cassociated" value="'+obj.id+'" ></div></div>',obj.id,obj.name,obj.location_id,obj.network]
      })})
    }
  )
})
i.app.post('/saveclient',(req,res)=>{
  params = req.body
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.clients',
      cols:[
        {key:'name',val:params.name},
        {key:'location_id',val:params.location_id},
        {key:'address',val:params.address},
        {key:'picname',val:params.picname},
        {key:'picwa',val:params.picwa},
        {key:'description',val:params.description},
        {key:'kdfb',val:params.kdfb},
        {key:'ou',val:params.ou},
      ]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Save Client '+params.name,
        description:'Save Client '+params.name,i:i
      },logresult=>{
        console.log('logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/getclient/:id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.clients',
      cols:['id','name','location_id','address','description','picname','picwa','kdfb','ou'],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      res.send(result)
    }
  )
})
i.app.get('/getclientsbycategory/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select c.* from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b '
    +'left outer join qiscus.clients c on c.id=b.client_id '
    +'on b.category_id=a.id '
    +'where a.id='+params.category_id,
    result=>{
      res.send(result)
    }
  )
})
i.app.get('/getcategoriesbyclient/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select * from qiscus.categories_clients a '
    +'where client_id='+params.client_id,
    result=>{
      console.log('getcategoriesbyclient',result)
      res.send(result)
    }
  )
})
i.app.get('/countmembers/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select count(client_id) cnt from qiscus.categories_clients '
    +'where category_id='+params.category_id,
    result=>{
      res.send(result)
    }
  )
})
i.app.post('/updateclient',(req,res)=>{
  params = req.body

  console.log(i.crud.update({
    'tableName':'qiscus.clients',
    cols:[
      {key:'name',val:params.name},
      {key:'location_id',val:params.location_id},
      {key:'address',val:params.address},
      {key:'description',val:params.description},
      {key:'picname',val:params.picname},
      {key:'picwa',val:params.picwa},
      {key:'kdfb',val:params.kdfb},
      {key:'ou',val:params.ou},
    ],
    conditions:[{key:'id',val:params.id}]
  }))
  i.con.doQuery(
    i.crud.update({
      'tableName':'qiscus.clients',
      cols:[
        {key:'name',val:params.name},
        {key:'location_id',val:params.location_id},
        {key:'address',val:params.address},
        {key:'description',val:params.description},
        {key:'picname',val:params.picname},
        {key:'picwa',val:params.picwa},
        {key:'kdfb',val:params.kdfb},
        {key:'ou',val:params.ou},
      ],
      conditions:[{key:'id',val:params.id}]
    }),
    result=>{
      i.logging.writeLog({
        createuser:req.session.username,
        subject:'Update Pelanggan ('+params.id+'):'+params.prevName+'->'+params.name+'',
        description:'Update Pelanggan ('+params.id+'):'
        +params.prevLocationID+'->'+params.location_id+','
        +params.prevName+'->'+params.name+','
        +params.prevDesc+'->'+params.description+','
        +params.prevPicname+'->'+params.picname+','+params.prevAddress+'->'+params.address+''
        +params.prevPicwa+'->'+params.picwa+','+params.prevKdfb+'->'+params.kdfb+' ',
        i:i
      },logresult=>{
        console.log('Logresult',logresult)
        res.send(result)
      })
    }
  )
})
i.app.get('/removeclient/:id',(req,res)=>{
  params = req.params
  i.master.getClientById({client_id:params.id,id:params.id,i:i},client=>{
    i.con.doQuery(
      i.crud.remove({
        tableName:'qiscus.clients',
        conditions:[{key:'id',val:params.id}]
      }),
      result=>{
        i.logging.writeLog({
          createuser:req.session.username,
          subject:'Remove client '+params.id,
          description:'Remove client '+client.name,i:i
        },logresult=>{
          console.log('Remove Client Logresultz',logresult)
          res.send(result)
        })
      }
    )
    })
})
i.app.get('/select2categoryproviders',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'1',val:'1'}]
    }),
    result=>{
      res.send({results:result.map(obj=>{
        return {id:obj.id,text:obj.name}
      })})
    }
  )
})
i.app.get('/select2categoryprovider/:name',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.getslike({
      tableName:'qiscus.messagecategories',
      cols:['id','name','description'],
      conditions:[{key:'name',val:params.name}]
    }),
    result=>{
      res.send({results:result.map(obj=>{
        return {id:obj.id,text:obj.name}
      })})
    }
  )
})
i.app.get('/disassociatecategory/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.categories_clients',
      conditions:[
        {key:'category_id',val:params.category_id},
      ]
    }),
    result=>{

      i.master.getCategoryById({id:params.category_id,i:i},category=>{
        i.logging.writeLog({
          createuser:req.session.username,
          subject:'Disassociatecategory, category_id '
          +params.category_id
          + ', '
          + 'Kategori : '+ category.name,
          i:i
        },logresult=>{
          console.log('Logresult',logresult)
          res.send(result)
        })
  
      })
  }
  )
})
i.app.get('/disassociateclient/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.categories_clients',
      conditions:[
        {key:'client_id',val:params.client_id},
      ]
    }),
    result=>{

      i.master.getClientById({id:params.client_id,i:i},client=>{
        i.logging.writeLog({
          createuser:req.session.username,
          subject:'Disassociateclient, client_id '
          +params.client_id
          + ', '
          + 'Pelanggan : '+ client.name,
          i:i
        },logresult=>{
          console.log('Logresult',logresult)
          res.send(result)
        })
      })
    }
  )
})
i.app.get('/disassociatecategoryclient/:category_id/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.remove({
      tableName:'qiscus.categories_clients',
      conditions:[
        {key:'category_id',val:params.category_id},
        {key:'client_id',val:params.client_id}
      ]
    }),
    result=>{

      i.master.getClientById({id:params.client_id,i:i},client=>{
        i.master.getCategoryById({id:params.category_id,i:i},category=>{
          i.logging.writeLog({
            createuser:req.session.username,
            subject:'Disassociatecategoryclient, category_id '
            +params.category_id
            +', client_id:'+params.client_id,
            description:''
            + 'Pelanggan : ' + client.name
            + ', '
            + 'Kategori : '+ category.name,
            i:i
          },logresult=>{
            console.log('Logresult',logresult)
            res.send(result)
          })
    
        })
      })
    }
  )
})
i.app.get('/associatecategoryclient/:category_id/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    i.crud.create({
      tableName:'qiscus.categories_clients',
      cols:[
        {key:'category_id',val:params.category_id},
        {key:'client_id',val:params.client_id}
      ]
    }),
    result=>{
      i.master.getClientById({id:params.client_id,i:i},client=>{
        i.master.getCategoryById({id:params.category_id,i:i},category=>{
          i.logging.writeLog({
            createuser:req.session.username,subject:'Associate category_id:'+params.category_id+', client_id : '+params.client_id,
            description:'Kategori : '+category.name+', Pelanggan : '+ client.name,
            i:i
          },logresult=>{
            console.log('Log Result',logresult)
            res.send(result)
          })    
    
        })
      })

    }
  )
})
i.app.get('/getcategories',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.messagecategories',
      cols:['id','name'],
      conditions:[{key:'1',val:'1'}]
    }),
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name]
      })})
    }
  )
})
i.app.get('/getavailabelcategories/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select a.id,a.name from qiscus.messagecategories a where id not in '
    +'('
    +' select b.category_id from qiscus.categories_clients b '
    +' left outer join qiscus.clients c on c.id=b.client_id '
    +' where c.id='+params.client_id
    +');'
    ,
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name]
      })})
    }
  )
})
i.app.get('/getavailabelclients/:category_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select a.id,a.name,a.location_id,ou network from qiscus.clients a where id not in '
    +'('
    +' select b.client_id from qiscus.categories_clients b '
    +' left outer join qiscus.messagecategories c on c.id=b.category_id '
    +' where c.id='+params.category_id
    +')',
    result=>{
      res.send({data:result.map(obj=>{
        return ['<div class="form-group"><div class="icheck-primary d-inline availableClient"><input type="checkbox" class="creserve" value="'+obj.id+'" ></div></div>',obj.id,obj.name,obj.location_id,obj.network]
      })})
    }
  )
})
i.app.get('/getcategoriesbyclient/:client_id',(req,res)=>{
  params = req.params
  console.log('select a.id,a.name,case when b.client_id is not null then true else false end selected from qiscus.messagecategories a '
  +'left outer join qiscus.categories_clients b on b.category_id=a.id '
  +'where client_id = ' + params.client_id)
  i.con.doQuery(
    'select a.id,a.name,case when b.client_id is not null then true else false end selected from qiscus.messagecategories a '
    +'left outer join qiscus.categories_clients b on b.category_id=a.id '
    +'where client_id = ' + params.client_id,
    result=>{
      console.log('qresult',result)
      res.send({results:result.map(obj=>{
        return {id:obj.category_id,text:obj.name,selected:true}
      })})
    }
  )
})
i.app.get('/datacategoriesbyclient/:client_id',(req,res)=>{
  params = req.params
  i.con.doQuery(
    'select b.id,b.name,b.description from qiscus.categories_clients a '
    +'left outer join qiscus.messagecategories b '
    +'on b.id=a.category_id '
    +'where client_id='+params.client_id+' '
    +'and b.id is not null ',result=>{
      console.log(result)
      res.send({data:result.map(obj=>{
        return [obj.id,obj.name,obj.description]
      })})
    }
  )
})
i.app.get('/sending',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'sending/main',title:'Pengiriman WA',message:i.messages.notifikasiGangguan({
      startproblem:'02 Juli 2022',
      segmentasi:'',
      impact:'',namapelanggan:'',lokasi:''
    }),pagename:'Pengiriman pesan'
  })
})
i.app.get('/previewwa/:category/:template',(req,res)=>{
  console.log(i.messages.notifikasiGangguan({
    startproblem:'02 Juli 2022',
    segmentasi:'',
    impact:'',namapelanggan:'',lokasi:''
  })
  )
  message = i.messages.notifikasiGangguan({
    startproblem:'02 Juli 2022',
    segmentasi:'',
    impact:'',namapelanggan:'',lokasi:''
  })
  res.render('sending/previewwa',{
    title:'Preview',message:message
  })
})
i.app.get('/auth',(req,res)=>{
  res.render('login',{
    title:'Otentikasi'
  })
})
i.app.get('/showsession',(req,res)=>{
  res.send({session:req.session})
})
i.app.post('/doauth',(req,res)=>{
  params = req.body
  i.auth.doLogin({
    i:i,params:params,res:res,req,req,redirpath:'/categories'
  },result=>{
    if(result.authenticated){
      i.logging.writeLog({
        createuser:result.username,subject:'Login '+result.email,description:'Login '+result.email,i:i
      },logresult=>{
        res.redirect('/categories')
      })
    }else{
      res.redirect('/auth')
    }
  })
})
i.app.post('/writelog',(req,res)=>{
  params = req.body
  i.logging.writeLog({
    createuser:params.createuser,subject:params.subject,description:params.description,i:i
  },result=>{})
})
i.app.get('/readlogs',(req,res)=>{
  i.con.doQuery(
    i.crud.gets({
      tableName:'qiscus.logging',
      cols:['id','createuser','subject','description','createdate'],
      conditions:[
        {key:'1',val:'1'}
      ],
      orderby:[{key:'createdate',order:'desc'}]
    }),
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.createuser,obj.subject,obj.description,obj.createdate]
      })})
    }
  )
})
i.app.get('/viewlog',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'viewlog',title:'Lihat Log',pagename:'Lihat Log'
  })
})
i.app.get('/readclientlogsbackup20230317',(req,res)=>{
  i.con.doQuery(
    /*i.crud.gets({
      tableName:'qiscus.clientlogs',
      cols:['id','client_id','template_id','downtime','description','createuser','createdate'],
      conditions:[
        {key:'1',val:'1'}
      ],
      orderby:[{key:'createdate',order:'desc'}]
    }),*/
    'select a.id,a.client_id,a.template_id,a.downtime,a.description,a.createuser,a.createdate, '
    +'b.location_id '
    +'from qiscus.clientlogs a left outer join qiscus.clients b on b.id=a.client_id ',
    result=>{
      res.send({data:result.map(obj=>{
        return [obj.id,obj.location_id,obj.template_id,obj.downtime,obj.description,obj.createuser,obj.createdate]
      })})
    }
  )
})
i.app.get('/readperclientlogs',(req,res)=>{
  i.con.doQuery('select a.client_id,b.name,b.location_id,b.address,sum(a.downtime)dtsum from qiscus.clientlogs a '
  +'left outer join clients b on b.id=a.client_id group by a.client_id,b.name,b.location_id,b.address ',
  result=>{
    res.send({data:result.map(
      obj=>{
        return [obj.client_id,obj.name,obj.dtsum]
      }
    )})
  }
  )
})

i.app.get('/viewclientlog',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'viewclientlog',title:'Lihat Log Pelanggan',pagename:'Lihat Log Pelanggan'
  })
})
i.app.get('/logout',(req,res)=>{
  i.logging.logout({username:req.session.username,email:req.session.email,req:req},user=>{
    i.logging.writeLog({
      createuser:user.username,subject:'logout',description:'logout',i:i
    },result=>{
      console.log("Log written",result)
      res.redirect('/main')
    })
  })
})
i.app.get('/docs',(req,res)=>{
  res.render('docs',{
    title:'Dokumentasi'
  })
})
i.app.get('/gethsm/:term',(req,res)=>{
  params = req.params
  config = hsm.hsm()
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({results:response.data.data.hsm_templates.map(tmp=>{
      return {id:tmp.id,text:tmp.name}
    })})
  })
  .catch(function (error) {
    console.log(error);
    res.send({test:error})
  });
})
i.app.get('/gethsms',(req,res)=>{
  config = hsm.hsm()
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({results:response.data.data.hsm_templates.map(tmp=>{
      return {id:tmp.id,text:tmp.name}
    })})
  })
  .catch(function (error) {
    console.log(error);
    res.send({test:error})
  });  
})
i.app.get('/gettemplatedetail/:hsm_id',(req,res)=>{
  params = req.params
  config = hsm.template_detail(params)
  var axios = require('axios')
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send({id:response.data.data.hsm_template.hsm_details[0].id})
  })
  .catch(function (error) {
    console.log(error);
  });

})
i.app.get('/hsm',(req,res)=>{
  res.render('hsm',{
    title:'HSM',pagename:"HSM",email:req.session.email
  })
})
i.app.get('/uploadcsv/:template_detail_id',(req,res)=>{
  params = req.params
  var axios = require('axios')
  config = hsm.uploadcsv(params)
  axios(config)
  .then(function (response) {
    console.log('response yang diterima',JSON.stringify(response.data));
    res.send({results:response.data})
  })
  .catch(function (error) {
    console.log("ERROR UPLOAD CSV",error);
  });
})
i.app.get('/testlog',(req,res)=>{
  i.logging.writeLog({
    createuser:req.session.username,
    subject:'Broadcast ',
    description:"response.data.data.broadcast_job.name",
    i:i
  },logresult=>{
    console.log('logresult',logresult)
  i.logging.clientLog({
    client_id:1,template_id:1,createuser:'puji',downtime:45,description:'test',i:i
  },clientlogresult=>{
    console.log('clientlogresult',clientlogresult)
    if(1==1){
      res.send({results:"response.data"})
    }
  })
  })

})
i.app.post('/broadcast',(req,res)=>{
  params = req.body
  console.log('bbroadcast params',params)
  var axios = require('axios')
  config = hsm.broadcast(params)
  axios(config)
  .then(function (response) {
    console.log('RSPONSE DATA',JSON.stringify(response.data));
    //res.send({results:response.data})
    i.logging.writeLog({
      createuser:req.session.username,
      subject:'Broadcast ',
      description:response.data.data.broadcast_job.name,
      i:i
    },logresult=>{
      console.log('logresult',logresult)
    i.logging.clientLog({
      category_id:params.category_id,
      template_id:params.template_detail_id,
      createuser:params.email,
      downtime:params.downtime,
      recipients:params.recipients,
      description:params.templatename,i:i
    },clientlogresult=>{
      console.log('clientlogresult',clientlogresult)
    })
    if(1==1){
      res.send({results:response.data})
    }
  })
  })
  .catch(function (error) {
    console.log(error);
    res.send({error:error})
  });
})
i.app.post('/csvwriter',(req,res)=>{
  params = req.body
  console.log('PARAMS OF CSVWRITER',params)
  csv = require('csv-writer').createObjectCsvWriter
  const writer = csv({
    path:i.setting.csvpath,//'/home/webdev/hehe.csv',
    header:params.header
  })
  const records = params.records
  writer.writeRecords(records)
  .then(_=>{
    console.log("Write records done",records)
    res.send({result:records})
  })
})
i.app.post('/movereserved',(req,res)=>{
  params = req.body
  i.con.doQuery(
    'insert into qiscus.categories_clients '
    +'(category_id,client_id) '
    +'values '
    +'('+params.category_id+','+params.client_id+')',
    result=>{
    res.send({'result':result})
  })
})
i.app.post('/movetoreserved',(req,res)=>{
  params = req.body
  i.con.doQuery(
    'delete from qiscus.categories_clients '
    +'where category_id='+params.category_id + ' '
    +'and client_id='+params.client_id+' ',
    result=>{
      res.send({'result':result})
    }
  )
})
i.app.get('/getreservecategories/:category_id',(req,res)=>{
  console.log('select a.id,a.parent_id from qiscus.messagecategories a '
  +'where a.parent_id <>'+req.params.category_id)
  i.con.doQuery(
    'select a.id,a.parent_id,a.name,a.description from qiscus.messagecategories a '
    +'where a.parent_id <>'+req.params.category_id +' '
    +'or a.parent_id is null '
    +'',
    result=>{
      res.send({data:result.map(obj=>{
        return ['<div class="form-group"><div class="icheck-primary d-inline availableCategory"><input type="checkbox" class="creservecategory" value="'+obj.id+'" ></div></div>',obj.id,obj.name,obj.description]
      })})
    }
  )
})
i.app.get('/getcategorychildren/:id',(req,res)=>{
  i.con.doQuery(
    'select * from qiscus.messagecategories '
    +'where parent_id='+req.params.id,
    result=>{
      res.send({data:result.map(obj=>{
        return ['<div class="form-group"><div class="icheck-primary d-inline availableCategory"><input type="checkbox" class="childcategory" value="'+obj.id+'" ></div></div>',obj.id,obj.name,obj.description]
      })})
    }
  )
})
i.app.post('/associatecategorycategory',(req,res)=>{
  params = req.body
  i.con.doQuery(
    'update qiscus.messagecategories '
    +'set parent_id='+params.parent_id+' '
    +'where id='+params.id,
    result=>{
      res.send({'result':result})
    }
  )
})
i.app.post('/disassociateactegorycategory',(req,res)=>{
  params = req.body
  i.con.doQuery(
    'update qiscus.messagecategories '
    +'set parent_id = null '
    +'where parent_id='+params.parent_id+' '
    +'and id='+params.id,
    result=>{
      res.send({'res':result})
    }
  )
})
getParents = (obj,callback) => {
  i.con.doQuery(
    'select id,parent_id from qiscus.messagecategories '
    +'where id='+obj.id+' '
    +'and parent_id is not null ',
    result=>{
      console.log('result',result)
      console.log('length',result.length)
      if(result.length>0){
        getParents({id:result[0].parent_id})
      }
      callback(result)
    }
  )
}
i.app.get('/testgetparents/:id',(req,res)=>{
  getParents({id:req.params.id},result=>{
    res.send(result)
  })
})
i.app.get('/getparents/:id',(req,res)=>{
  let out = i.categorychildren.getParents({id:req.params.id})
  i.con.doQuery(out,result=>{
    console.log('Out',out)
    res.send(result)
  })
})
getChildren = obj => {
  i.con.doQuery(
    i.categorychildren.getChildren({id:obj.id}),result=>{
      console.log('Result length',result.length)
      console.log('Result',result)
    }
  )
}
i.app.get('/getchildren2/:id',(req,res)=>{
  getChildren({id:req.params.id})
})
i.app.get('/get_categorychildren/:id',(req,res)=>{
  console.log('id',req.params.id)
  i.con.doQuery(
    i.categorychildren.getcategorychildren({id:req.params.id}),result=>{
      console.log('clients by category',result)
      res.send(result)
    }
  )
})
i.app.get('/hierarchicalsending',(req,res)=>{
  i.auth.checkLogin({
    req:req,res:res,redirpath:'sending/main',title:'Pengiriman WA (testing Hirarki)',message:i.messages.notifikasiGangguan({
      startproblem:'02 Juli 2022',
      segmentasi:'',
      impact:'',namapelanggan:'',lokasi:''
    }),pagename:'Pengiriman pesan (testing Hirarki)'
  })
})
i.app.get('/hierarchicalhsm',(req,res)=>{
  res.render('hierarchicalhsm',{
    title:'HSM',pagename:"HSM",email:req.session.email
  })
})
i.app.post('/writebroadcastlog',(req,res)=>{
  params = req.body
  i.con.doQuery('insert into qiscus.broadcastdetail_logs (picwa) values ('+params.picwa+')',result=>{
    console.log("Success write broadcast log",result)
    res.send(result)
  })
})
i.app.listen(i.setting.port,_=>{
    console.log('QisCus API Server start at port ',i.setting.port)
})