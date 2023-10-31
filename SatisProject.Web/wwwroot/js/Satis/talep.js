function TalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var girisBirimId = $("#birimler").val();
    Get(`SatinAlmaTalep/SatinAlmaTamBilgiler/${girisSirketId}/${girisBirimId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover rounded-4 shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].urunAd}</td><td>${arr[i].adet}</td><td>${arr[i].olusturmaTarih}</td><td>${arr[i].kullaniciAd} ${arr[i].soyad}</td><td> <span style="color: ${arr[i].onayDurum === null ? 'gray' : arr[i].onayDurum ? 'green' : 'red'};">
                         ${arr[i].onayDurum === null ? 'Beklemede' : arr[i].onayDurum ? 'Onaylandı' : 'Reddedildi'}
                     </span></td>`;
            html += `<td>
            <i class="bi bi-check-square-fill text-success px-2 py-2 mx-3 border border-success" title="Onayla" onclick='Onayla("${arr[i].id}","${arr[i].urunId}","${arr[i].adet}","${arr[i].kullaniciId}","${arr[i].olusturmaTarih}")'></i>
            <i class="bi bi-x-square text-danger px-2 py-2 mx-3 border border-danger" title="Reddet" onclick='Reddet("${arr[i].id}","${arr[i].urunId}","${arr[i].adet}","${arr[i].kullaniciId}","${arr[i].olusturmaTarih}")'></i>
            </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divTalep").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#liste #arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}


function Onayla(id, urunId, kullaniciId, adet,olusturmaTarih) {
    var talep = {
        Id: id,
        UrunId: urunId,
        KullaniciId: adet,
        Adet: kullaniciId,
        OnayDurum: 1,
        OlusturmaTarih:olusturmaTarih
    };
    Post("SatinAlmaTalep/Kaydet", talep, (data) => {
        TalepleriGetir();
        TalepleriKullaniciyaGoreGetir();
    });
}

function Reddet(id, urunId, kullaniciId, adet, olusturmaTarih ) {
    var talep = {
        Id: id,
        UrunId: urunId,
        KullaniciId: adet,
        Adet: kullaniciId,
        OnayDurum: 0,
        OlusturmaTarih: olusturmaTarih
        
    };
    Post("SatinAlmaTalep/Kaydet", talep, (data) => {
        TalepleriGetir();
        TalepleriKullaniciyaGoreGetir();
    });
}

function TumBirimleriGetir() {
    Get("Birim/TumBirimler", (data) => {
        var birimdata = data;
        var dropdown = $("#birimler");
        $.each(birimdata, function (index, birim) {
            dropdown.append($("<option>").val(birim.id).text(birim.ad));
        });
    });
}



$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    TalepleriGetir();
    TumBirimleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        TalepleriGetir();
    });
    $("#birimler").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        TalepleriGetir();
    });
});
