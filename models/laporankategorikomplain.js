get = obj => {
    sql = "select cause_id,cause,causecategory,count(cause)cnt from ( ";
    sql+= "select a.cause_id,v.name cause,u.name causecategory,a.kdticket,a.requesttype,a.ticketstart,ticketend, ";
    sql+= "case a.requesttype  ";
    sql+= "when 'pelanggan' then w.branch_id  ";
    sql+= "when 'backbone' then '1'  ";
    sql+= "when 'bts' then d.branch_id  ";
    sql+= "when 'Datacenter' then e.branch_id  ";
    sql+= "when 'PTP' then f.branch_id  ";
    sql+= "when 'Core' then g.branch_id  ";
    sql+= "when 'AP' then y.branch_id  ";
    sql+= "end branchid, ";
    sql+= "a.create_date from tickets a  ";
    sql+= "left outer join client_sites b on b.id=a.client_site_id ";
    sql+= "left outer join backbones c on c.id=a.backbone_id ";
    sql+= "left outer join btstowers d on d.id=a.btstower_id ";
    sql+= "left outer join datacenters e on e.id=a.datacenter_id ";
    sql+= "left outer join ptps f on f.id=a.ptp_id ";
    sql+= "left outer join cores g on g.id=a.core_id ";
    sql+= "left outer join aps h on h.id=a.ap_id left outer join btstowers y on y.id=h.btstower_id ";
    sql+= "left outer join clients w on w.id=b.client_id ";
    sql+= "left outer join ticketcauses v on v.id=a.cause_id ";
    sql+= "left outer join ticketcausecategories u on u.id=v.category_id ";
    sql+= "where date(ticketstart)>='"+obj.ticketstart+"' ";
    sql+= "and date(ticketstart)<='"+obj.ticketend+"' ";
    sql+= "and trim(a.cause)!=''";
    sql+= ")x where branchid in ("+obj.branches+") ";
    sql+= "group by cause_id,cause,causecategory ";
    return sql
}
module.exports = {
    get:get
}