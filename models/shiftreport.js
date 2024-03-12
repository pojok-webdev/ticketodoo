get = obj => {
    sql = "select distinct a.id,a.kdticket,a.clientname,a.reporter,";
    sql+= "group_concat(confirmationresult) confirmationresult,";
    sql+= "group_concat(conclusion) conclusion,";
    sql+= "date_format(ticketstart,'%H:%i:%s')ticketstart,a.complaint,a.status,";
    sql+= "case f.clientcategory ";
    sql+= "when '1' then 'FFR' ";
    sql+= "when '2' then 'Platinum' ";
    sql+= "when '3' then 'Gold' ";
    sql+= "when '4' then 'Bronze' ";
    sql+= "when '5' then 'Silver' ";
    sql+= "else 'Other' end category,";
  
    sql+= "case f.branch_id when  '1' then 'Surabaya' when '2' then 'Jakarta' when '3' then 'Malang' when '4' then 'Bali' end branch,";
    sql+= "c.name subcause,d.name maincause ";
    sql+= "from tickets a ";

    sql+= "left outer join ticket_followups e on e.ticket_id=a.id ";

    sql+= "left outer join ticketcauses c on c.id=a.cause_id ";
    sql+= "left outer join ticketcausecategories d on d.id=c.category_id ";

    sql+= "left outer join clients f on f.id=a.client_id ";

    sql+= "where date(a.ticketstart)='"+obj.ticketstart+"' and f.branch_id in ("+obj.branches+") ";
    sql+= "group by a.id,a.kdticket,a.clientname,a.reporter,a.ticketstart,a.complaint,a.status,c.name,d.name ";
    return sql
}
module.exports = {
    get:get
}