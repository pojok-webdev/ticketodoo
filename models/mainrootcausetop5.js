get = obj => {
    sql = 'select W.id,W.name,W.cnt from ';
    sql+= ' (';
    sql+= '   select c.id,c.name, count(a.id) cnt from tickets a';
    sql+= '   left outer join ticketcauses b on b.id=a.cause_id ';
    sql+= '   left outer join ticketcausecategories c on c.id=b.category_id ';
    sql+= '   left outer join clients d on d.id=a.client_id ';
    sql+= ' left outer join backbones e on e.id=a.backbone_id ';
    sql+= ' left outer join btstowers f on f.id=a.btstower_id ';
    sql+= ' left outer join datacenters g on g.id=a.datacenter_id ';
    sql+= ' left outer join ptps h on h.id=a.ptp_id ';
    sql+= ' left outer join cores i on i.id=a.core_id ';
    sql+= ' left outer join (';
    sql+= '   select a.id,b.branch_id from aps a ';
    sql+= '   left outer join btstowers b';
    sql+= '   on b.id=a.btstower_id';
    sql+= ' ) j on j.id=a.ap_id ';
    sql+= '   where date(a.create_date)>="'+obj['ticketstart']+'" and date(a.create_date)<="'+obj['ticketend']+'" ';
    sql+= '   and (d.branch_id in ('+obj.branches+')';
    sql+= ' or d.branch_id in  ('+obj.branches+')   ';
    sql+= ' or e.branch_id_ in  ('+obj.branches+')  ';
    sql+= ' or f.branch_id in  ('+obj.branches+')  ';
    sql+= ' or g.branch_id in  ('+obj.branches+')  ';
    sql+= ' or h.branch_id in  ('+obj.branches+')  ';
    sql+= ' or i.branch_id in  ('+obj.branches+')  ';
    sql+= ' or j.branch_id in  ('+obj.branches+')  ';
    sql+= ' ) ';
    sql+= '   and b.id is not null group by c.id,c.name';
    sql+= ' )W left outer join';
    sql+= ' (';
    sql+= '   select distinct cnt from(select c.id,c.name, count(a.id) cnt from tickets a';
    sql+= '   left outer join ticketcauses b on b.id=a.cause_id ';
    sql+= '   left outer join ticketcausecategories c on c.id=b.category_id ';
    sql+= '   left outer join clients d on d.id=a.client_id ';
    sql+= ' left outer join backbones e on e.id=a.backbone_id ';
    sql+= ' left outer join btstowers f on f.id=a.btstower_id ';
    sql+= ' left outer join datacenters g on g.id=a.datacenter_id ';
    sql+= ' left outer join ptps h on h.id=a.ptp_id ';
    sql+= ' left outer join cores i on i.id=a.core_id ';
    sql+= ' left outer join (';
    sql+= '   select a.id,b.branch_id from aps a ';
    sql+= '   left outer join btstowers b';
    sql+= '   on b.id=a.btstower_id';
    sql+= ' ) j on j.id=a.ap_id ';
    sql+= '   where date(a.create_date)>="'+obj['ticketstart']+'" and date(a.create_date)<="'+obj['ticketend']+'" ';
    sql+= '   and (d.branch_id in ('+obj.branches+')';
    sql+= ' or d.branch_id in  ('+obj.branches+')   ';
    sql+= ' or e.branch_id_ in  ('+obj.branches+')  ';
    sql+= ' or f.branch_id in  ('+obj.branches+')  ';
    sql+= ' or g.branch_id in  ('+obj.branches+')  ';
    sql+= ' or h.branch_id in  ('+obj.branches+')  ';
    sql+= ' or i.branch_id in  ('+obj.branches+')  ';
    sql+= ' or j.branch_id in  ('+obj.branches+')  ';
    sql+= ' ) ';
    sql+= '   and b.id is not null group by c.id,c.name order by count(a.id) desc)a ';
    if(obj['numtoshow']!='All'){
    sql+= '   limit 0,5 ';
    }
    sql+= ' )X on X.cnt=W.cnt ';
    sql+= 'where X.cnt is not null order by W.cnt desc; ';
    return sql
}
module.exports = {
    get:get
}