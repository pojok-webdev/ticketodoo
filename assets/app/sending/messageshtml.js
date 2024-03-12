notifikasiMaintenance = obj => {
    message = '<strong>Notifikasi Maintenance '+obj.header+'</strong>'
    message+= '<br />'
    message+= ''
    message+= '  Pelanggan Yang Terhormat,'
    message+= '  Informasi maintenance jaringan:'
    message+= '  <br />'
    message+= '    -Waktu: '+obj.waktu+'<br />'
    message+= '    -Durasi Down: '+obj.durasidown+'<br />'
    message+= '    -Aktifitas: '+obj.aktifitas+'<br />'
    message+= '  <br />'                  
    message+= '<br />'
    message+= '<strong>Dampak maintenance:</strong>'
    message+= '  <br />'
    message+= '    -Nama Pelanggan: '+obj.client+'<br />'
    message+= '    -Lokasi: '+obj.location+'<br />'
    message+= '  <br />'
    message+= '<br />'
    message+= '<strong>Demikian yang dapat kami sampaikan. Terima kasih.</strong>'
    message+= '<br />'
    message+= '<strong>Customer Support PadiNET</strong>'
    message+= '<br />'
    return message
}
notifikasiSelesaiMaintenance = obj => {
    message = '<strong>Notifikasi Selesai Maintenance '+obj.header+'</strong>'
    message+= '<br />'
    message+= 'Pelanggan Yang Terhormat,'
    message+= '<br />'
    message+= 'Informasi selesai maintenance jaringan:'
    message+= '<br />'
    message+= '- Waktu: '+obj.waktu+'<br />'
    message+= '- Durasi Down: '+obj.durasidown+'<br />'
    message+= '- Aktifitas: '+obj.aktifitas+'<br />'
    message+= '- Status: Done<br />'
    message+= '<br />'
    message+= '<br />'
    message+= 'Dampak maintenance:'
    message+= '<br />'
    message+= '- Nama Pelanggan: '+obj.client+'<br />'
    message+= '-  Lokasi: '+obj.location+'<br />'
    message+= '<br />'
    message+= '<br />'
    message+= 'Demikian yang dapat kami sampaikan. Terima kasih.'
    message+= '<br />'
    message+= '<strong>Customer Support PadiNET</strong>'
    return message
}
notifikasiGangguan = obj => {
    message = '<strong>Notifikasi gangguan '+obj.header+'</strong>'
    message+= '<br />'
    message+= 'Pelanggan Yang Terhormat,'
    message+= '<br />'
    message+= 'Informasi gangguan jaringan:'
    message+= '<br />'
    message+= '-  Start Problem: '+obj.startproblem+'<br />'
    message+= '-  Segmentasi: '+obj.segmentasi+'<br />'
    message+= '-  Impact: '+obj.impact+'<br />'
    message+= '-  Status: dalam penanganan<br />'
    message+= '<br />'
    message+= '<br />'
    message+= 'Dampak gangguan:'
    message+= '<br />'
    message+= '-  Nama Pelanggan: '+obj.client+'<br />'
    message+= '-  Lokasi: '+obj.location+'<br />'
    message+= '<br />'
    message+= 'Kami mohon maaf atas gangguan yang terjadi. Update selanjutnya akan kami sampaikan kembali.'
    message+= '<br />' 
    message+= '<strong>Customer Support PadiNET</strong>' 
    return message
}
notifikasiUpdateGangguan = obj => {
    message = 'Pelanggan Yang Terhormat,'
    message+= '<br />' 
    message+= 'Update penanganan gangguan:'
    message+= '<br />' 
    message+= ' '+obj.gangguan+'<br />'
    message+= '<br />' 
    message+= 'Update selanjutnya akan kami sampaikan kembali.'
    message+= '<br />' 
    message+= '<strong>Customer Support PadiNET</strong>'
    return message
}
notifikasiPenyelesaianGangguan = obj => {
    message = '<strong>Notifikasi Penyelesaian Gangguan</strong>'
    message+= '<br />' 
    message+= 'Pelanggan Yang Terhormat,'
    message+= 'Informasi penyelesaian gangguan jaringan:'
    message+= '<br />'
    message+= '-  Start: '+obj.start+'<br />'
    message+= '-  End: '+obj.end+'<br />'
    message+= '-  Durasi down: '+obj.durasidown+'<br />'
    message+= '-  Penyebab: '+obj.cause+'<br />'
    message+= '-  Action: '+obj.action+'<br />'
    message+= '-  Status: Solved & Monitoring<br />'
    message+= '<br />'
    message+= '<br />' 
    message+= 'Dampak gangguan:'
    message+= '<br />'
    message+= '-  Nama Pelanggan: '+obj.client+' <br />'
    message+= '-  Lokasi:  '+obj.location+' <br />'
    message+= '<br />'
    message+= '<br />' 
    message+= 'Kami mohon maaf atas ketidaknyamanan yang terjadi.'
    message+= 'Demikian yang kami sampaikan. Terima kasih.'
    message+= '<br />' 
    message+= '<strong>Customer Support PadiNET</strong>'
    return message
}
