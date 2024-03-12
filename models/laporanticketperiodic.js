get = obj=> {
    sql = "select distinct a.id,a.kdticket,a.clientname,a.reporter,";
    sql+= "case e.clientcategory ";
    sql+= "when '1' then 'FFR' ";
    sql+= "when '2' then 'Platinum' ";
    sql+= "when '3' then 'Gold' ";
    sql+= "when '4' then 'Bronze' ";
    sql+= "when '5' then 'Silver' ";
    sql+= "else 'Other' end category,";
    sql+= "c.name subrootcause, d.name mainrootcause, ";
    sql+= "date_format(ticketstart,'%d-%b-%Y %H:%i:%s')ticketstart,a.complaint,a.status ";
    sql+= "from tickets a ";
    sql+= "left outer join ticketcauses c on c.id=a.cause_id ";
    sql+= "left outer join ticketcausecategories d on d.id=c.category_id ";
    sql+= "left outer join clients e on e.id=a.client_id ";
    sql+= "where ";
    sql+= "date(a.ticketstart)>='"+obj.ticketstart+"' ";
    sql+= "and ";
    sql+= "date(a.ticketstart)<='"+obj.ticketend+"' ";
    sql+= "and e.branch_id in ("+obj.branches+") ";
    sql+= "and d.id in ("+obj.causecategories+") ";
    return sql
}
module.exports = {
    get:get
}