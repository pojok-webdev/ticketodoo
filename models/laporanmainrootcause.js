get = obj => {
    sql = 'select a.id,a.kdticket,a.clientname name,d.city,b.name subrootcause,c.name mainrootcause,';
    sql+= 'case d.branch_id ';
    sql+= 'when "1" then "_Surabaya_" ';
    sql+= 'when "2" then "_Jakarta_" ';
    sql+= 'when "3" then "_Malang_" ';
    sql+= 'when "4" then "_Bali_" ';
    sql+= 'end brn, ';
    sql+= 'case clientcategory ';
    sql+= 'when "0" then "_Undefined_" ';
    sql+= 'when "1" then "_FFR_" ';
    sql+= 'when "2" then "_Platinum_" ';
    sql+= 'when "3" then "_Gold_" ';
    sql+= 'when "4" then "_Silver_" ';
    sql+= 'when "5" then "_Bronze_" end categ ';
    sql+= 'from tickets a ';
    sql+= 'left outer join ticketcauses b on b.id=a.cause_id ';
    sql+= 'left outer join ticketcausecategories c on c.id=b.category_id ';
    sql+= 'left outer join clients d on d.id=a.client_id ';
    sql+= 'where a.requesttype="pelanggan" ';
    sql+= 'and date(a.create_date)>="'+obj.ticketstart+'" ';
    sql+= 'and date(a.create_date)<="'+obj.ticketend+'" ';
    sql+= 'and c.id in ('+obj.causecategories.join(',')+') ';
    sql+= 'and d.branch_id in ('+obj.branches.join(',')+') ';
    sql+= 'order by c.name,a.create_date ';
}
module.exports = {
    get:get
}