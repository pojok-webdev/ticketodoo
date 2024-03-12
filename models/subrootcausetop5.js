get = obj => {
    sql = 'select A.id,A.name,A.cause_id,A.cnt from  ';
    sql+= '(';
    sql+= '    select b.id,b.name,cause_id,count(a.id)cnt from tickets a ';
    sql+= '    left outer join ticketcauses b on b.id=a.cause_id ';
    sql+= '    left outer join clients c on c.id=a.client_id ';


    sql+= '   left outer join backbones e on e.id=a.backbone_id ';
    sql+= '   left outer join btstowers f on f.id=a.btstower_id ';
    sql+= '   left outer join datacenters g on g.id=a.datacenter_id ';
    sql+= '   left outer join ptps h on h.id=a.ptp_id ';
    sql+= '   left outer join cores i on i.id=a.core_id ';
    sql+= '   left outer join (';
    sql+= '     select a.id,b.branch_id from aps a ';
    sql+= '     left outer join btstowers b';
    sql+= '     on b.id=a.btstower_id';
    sql+= '   ) j on j.id=a.ap_id ';


    sql+= '    where cause_id is not null ';
    sql+= '    and date(a.create_date)>="'+obj['ticketstart']+'" ';
    sql+= '    and date(a.create_date)<="'+obj['ticketend']+'" ';
    sql+= '    and b.category_id='+obj['category_id']+' ';
    sql+= '    and (c.branch_id in ('+obj.branches+')';


    sql+= ' or e.branch_id_ in  ('+obj.branches+')  ';
    sql+= ' or f.branch_id in  ('+obj.branches+')  ';
    sql+= ' or g.branch_id in  ('+obj.branches+')  ';
    sql+= ' or h.branch_id in  ('+obj.branches+')  ';
    sql+= ' or i.branch_id in  ('+obj.branches+')  ';
    sql+= ' or j.branch_id in  ('+obj.branches+') ) ';




    sql+= '    group by cause_id order by count(a.id) desc';
    sql+= ')A  ';
    sql+= 'left outer join   ';
    sql+= '(';
    sql+= '    select distinct(cnt) from (select cause_id,count(a.id)cnt from tickets a ';
    sql+= '    left outer join ticketcauses b on b.id=a.cause_id ';
    sql+= '    left outer join clients c on c.id=a.client_id ';


    sql+= '   left outer join backbones e on e.id=a.backbone_id ';
    sql+= '   left outer join btstowers f on f.id=a.btstower_id ';
    sql+= '   left outer join datacenters g on g.id=a.datacenter_id ';
    sql+= '   left outer join ptps h on h.id=a.ptp_id ';
    sql+= '   left outer join cores i on i.id=a.core_id ';
    sql+= '   left outer join (';
    sql+= '     select a.id,b.branch_id from aps a ';
    sql+= '     left outer join btstowers b';
    sql+= '     on b.id=a.btstower_id';
    sql+= '   ) j on j.id=a.ap_id ';



    sql+= '    where cause_id is not null ';
    sql+= '    and date(a.create_date)>="'+obj['ticketstart']+'" ';
    sql+= '    and date(a.create_date)<="'+obj['ticketend']+'" ';
    sql+= '    and b.category_id='+obj['category_id']+' ';
    sql+= '    and (c.branch_id in ('+obj.branches+')';
    
    
    
    sql+= ' or e.branch_id_ in  ('+obj.branches+')  ';
    sql+= ' or f.branch_id in  ('+obj.branches+')  ';
    sql+= ' or g.branch_id in  ('+obj.branches+')  ';
    sql+= ' or h.branch_id in  ('+obj.branches+')  ';
    sql+= ' or i.branch_id in  ('+obj.branches+')  ';
    sql+= ' or j.branch_id in  ('+obj.branches+') ) ';



    sql+= '    group by cause_id order by count(a.id) desc)x ';
    if(obj['numtoshow']!='All'){
        sql+= '    limit 0,5 ';
        }
    sql+= ')B on B.cnt=A.cnt  ';
    sql+= 'where B.cnt is not null order by A.cnt desc; ';
return sql
}
module.exports = {
    get:get
}