$(function () {
    init = _ => {
      dt = $('#tObj').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "order":[[6,"desc"]],
        "oLanguage": {
          "sSearch": "Pencarian"
        },
        dom:'Bfrtip',
      ajax:{
          url:'/readclientlogs',
        },
        "columnDefs": [ 
          {
            targets:0,
            className:'trid'
          }],
          buttons:[
            {
              text:'Reload',
              className:'btn btn-warning',
              action:function(e,dt_,node,config){
                dt.ajax.reload()
              }
            }
          ]
        })
    }
    init()
  })
