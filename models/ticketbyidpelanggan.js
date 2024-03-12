get = obj => {
    sql = "select a.id,a.kdticket,a.clientname,d.address,a.reporter,";
    sql+= "date_format(ticketstart,'%d %b %Y')ticketdatestart,date_format(ticketstart,'%H:%i:%s')tickettimestart,";
    sql+= "a.complaint,a.status,case a.status when '1' then 'selesai' when '0' then 'belum selesai' end textstatusx, b.description,b.conclusion, ";
    sql+= "case  "
    sql+= "when c.status is null then case a.status "
    sql+= "when  '0' then 'belum selesai' "
    sql+= "when '1' then 'selesai' end  else "
    sql+= "case c.status when '0'  then 'Progress' "
    sql+= "when '1' then 'Solved' when '2' then 'Monitoring'  end  end textstatus , ";
    sql+= "case when (a.downtimestart = '0000-00-00 00:00:00' or a.downtimeend = '0000-00-00 00:00:00') then '0' "
    sql+= "else datediff(downtimeend,downtimestart) end downtimeday,"
    sql+= "case when (a.downtimestart = '0000-00-00 00:00:00' or a.downtimeend = '0000-00-00 00:00:00') then '0' "
    sql+= "else date_format(timediff(downtimeend,downtimestart),'%i') end  downtimetime,"
    sql+= "solution,b.confirmationresult ";
    sql+= "from tickets a left outer join ticket_followups b on b.ticket_id=a.id ";
    sql+= " left outer join troubleshoot_requests c on c.ticket_id=a.id  ";
    sql+= " left outer join client_sites d on d.id=a.client_site_id ";
    sql+= "where a.client_id='"+obj.client_id+"' ";
    return sql
}
module.exports = {
    get:get
}