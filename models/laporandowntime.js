get = obj => {
    sql = 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join client_sites c on c.id=b.client_site_id ';
    sql+= 'left outer join branches_client_sites d on d.client_site_id=c.id ';
    sql+= 'where d.branch_id in ('+obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join backbones c on c.id=b.backbone_id ';
    sql+= 'where b.requesttype = "backbone" and c.branch_id_ in ('+ obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join btstowers c on c.id=b.btstower_id ';
    sql+= 'where b.requesttype = "bts" and c.branch_id in ('+ obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join aps c on c.id=b.ap_id ';
    sql+= 'left outer join btstowers d on d.id=c.btstower_id ';
    sql+= 'where b.requesttype = "AP" and d.branch_id in ('+ obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join cores c on c.id=b.core_id ';
    sql+= 'where b.requesttype = "Core" and c.branch_id in ('+ obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join datacenters c on c.id=b.datacenter_id ';
    sql+= 'where b.requesttype = "Datacenter" and c.branch_id in ('+ obj.branches +')';
    sql+= 'union all ';
    sql+= 'select b.id,b.create_date,timestampdiff(day,start,end)downtimetotal_, ';
    sql+= 'CONCAT(FLOOR(HOUR(TIMEDIFF(start,end)) / 24), " hari ",MOD(HOUR(TIMEDIFF(start,end)), 24), " jam ", MINUTE(TIMEDIFF(start,end)), " menit ") downtimetotal,' ;
    sql+= 'clientname,start downtimestart,end downtimeend  ';
    sql+= 'from downtimes a ';
    sql+= 'left outer join tickets b on b.id=a.ticket_id ';
    sql+= 'left outer join ptps c on c.id=b.ptp_id ';
    sql+= 'left outer join btstowers d on d.id=c.btstower_id ';
    sql+= 'where b.requesttype = "PTP" and d.branch_id in ('+ obj.branches +')';
    return sql
}
module.exports = {
    get:get
}