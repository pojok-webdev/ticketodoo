get = obj => {
    sql = "select * from (";
    sql+= "select a.id,a.kdticket,a.create_date,a.ticketstart,a.ticketend,a.createuser,a.status,a.cause, ";
    sql+= "case a.status when '0' then 'open' when '1' then 'close' end ticketStatus,";
    sql+= "case a.status when '0' then '-' when '1' then ticketend end ticket_End,";
    sql+= "a.clientname,a.reporterphone,a.requesttype,a.parentid,b.id cid,c.id backboneid,";
    sql+= "d.id btsid,e.id dcid,f.id ptpid,reporter,i.trid,j.hastroubleshoot,";

    sql+= "case ";
    sql+= "when b.id is not null then b.brnid ";
    sql+= "when c.id is not null then c.brnid ";
    sql+= "when d.id is not null then d.brnid ";
    sql+= "when e.id is not null then e.brnid ";
    sql+= "when f.id is not null then f.brnid ";
    sql+= "when g.id is not null then g.brnid ";
    sql+= "when h.id is not null then h.brnid ";
    sql+= "else '-' ";
    sql+= "end brnid, ";

    sql+= "case ";
    sql+= "when b.id is not null then b.brn ";
    sql+= "when c.id is not null then c.brn ";
    sql+= "when d.id is not null then d.brn ";
    sql+= "when e.id is not null then e.brn ";
    sql+= "when f.id is not null then f.brn ";
    sql+= "when g.id is not null then g.brn ";
    sql+= "when h.id is not null then h.brn ";
    sql+= "else '-' ";
    sql+= "end brn, ";

    sql += "case ";
    sql+= "when ticketend is null then datediff(now(),ticketstart) ";
    sql+= "when ticketend='0000-00-00 00:00:00' then datediff(now(),ticketstart) ";
    sql+= "else datediff(ticketend,ticketstart) end  hari ,";

    sql += "concat(case ";
    sql+= "when ticketend is null then datediff(now(),ticketstart) ";
    sql+= "when ticketend='0000-00-00 00:00:00' then datediff(now(),ticketstart) ";
    sql+= "else datediff(ticketend,ticketstart) end,' hari ',";

    sql+= "time_format(case ";
    sql+= "when ticketend is null then timediff(now(),ticketstart) ";
    sql+= "when ticketend='0000-00-00 00:00:00' then timediff(now(),ticketstart) ";
    sql+= "else timediff(ticketend,ticketstart) end,'%H') % 24, ";

    sql+= "time_format(case ";
    sql+= "when ticketend is null then timediff(now(),ticketstart) ";
    sql+= "when ticketend='0000-00-00 00:00:00' then timediff(now(),ticketstart) ";
    sql+= "else timediff(ticketend,ticketstart) end,'  jam %i menit %s detik')) duration3 ";

    sql+= " from (select * from tickets ";
    sql+= " where ";
    sql+= "status='0' ";
    sql+= ") a ";

    sql+= "left outer join (select distinct a.id,c.id brnid,c.name brn from client_sites a left outer join branches_client_sites b on b.client_site_id=a.id left outer join branches c on c.id=b.branch_id where c.id in (".$userbranches.") ) b on b.id=a.client_site_id ";

    sql+= "left outer join (select distinct a.id,c.id brnid,c.name brn from backbones a left outer join backbones_branches b on b.backbone_id=a.id left outer join branches c on c.id=b.branch_id where c.id in (".$userbranches.") ) c on c.id=a.backbone_id ";

    sql+= "left outer join (select distinct a.id,b.id brnid,b.name brn from btstowers a left outer join branches b on b.id=a.branch_id where b.id in (".$userbranches.") ) d on d.id=a.btstower_id ";

    sql+= "left outer join (select distinct a.id,b.id brnid,b.name brn from datacenters a left outer join branches b on b.id=a.branch_id where b.id in (".$userbranches.") ) e on e.id=a.datacenter_id ";

    sql+= "left outer join (select distinct a.id,b.id brnid,b.name brn from ptps a left outer join branches b on b.id=a.branch_id where b.id in (".$userbranches.") ) f on f.id=a.ptp_id ";

    sql+= "left outer join (select distinct a.id,b.id brnid,b.name brn from cores a left outer join branches b on b.id=a.branch_id where b.id in (".$userbranches.") ) g on g.id=a.core_id ";

    sql+= "left outer join (select distinct a.id,c.id brnid,c.name brn from aps a left outer join btstowers b on b.id=a.btstower_id left outer join branches c on c.id=b.branch_id where c.id in (".$userbranches.") ) h on h.id=a.ap_id ";

    sql+= "left outer join (select id trid,ticket_id from troubleshoot_requests where status='0') i on i.ticket_id=a.id ";

    sql+= "left outer join (select id hastroubleshoot,ticket_id from troubleshoot_requests) j on j.ticket_id=a.id ";

    sql+= "where b.id is not null or c.id is not null or d.id is not null or e.id is not null or f.id is not null or g.id is not null or h.id is not null ";

    sql+= ")q ";
    sql+= "where "+obj.timerange+" and brnid in ("+obj.branches+") ";
}
module.exports = {
    get:get
}