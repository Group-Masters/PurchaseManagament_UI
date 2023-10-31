function TalepleriKullaniciyaGoreGetir() {
    var girisKullanicisi = $("#kullaniciId").val();
    Get(`SatinAlmaTalep/SatinAlmaTamBilgilerByKullaniciId?id=${girisKullanicisi}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].urunAd}</td><td>${arr[i].adet}</td><td>${arr[i].olusturmaTarih}</td><td>${arr[i].kullaniciAd} ${arr[i].soyad}</td><td> <span style="color: ${arr[i].onayDurum === null ? 'gray' : arr[i].onayDurum ? 'green' : 'red'};">
                         ${arr[i].onayDurum === null ? 'Beklemede' : arr[i].onayDurum ? 'Onaylandı' : 'Reddedildi'}
                     </span></td>`;

            if (arr[i].onayDurum === null) {
                html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle("${arr[i].id}","${arr[i].urunId}","${arr[i].adet}","${arr[i].kullaniciId}")'></i></td>`;
            }

            html += `</tr>`;
        }
        html += `</table></div>`;

        $("#divTalepKullanici").html(html);

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

let selectedId = 0;

function Yeni() {
    selectedRolId = 0;
    $("#urunAd").val("");
    $("#adet").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var talep = {
        Id: selectedId,
        UrunId: $("#urunAd").val(),
        KullaniciId: $("#kullaniciId").val(),
        Adet: $("#adet").val(),
        OnayDurum: null
    };
    Post("SatinAlmaTalep/Kaydet", talep, (data) => {

        TalepleriKullaniciyaGoreGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`SatinAlmaTalep / Sil ? id = ${id} `, (data) => {
        TalepleriKullaniciyaGoreGetir();
    });
}

function Duzenle(id, urunId, adet, kullaniciId) {
    selectedId = id;
    $("#urunAd").val(urunId);
    $("#adet").val(adet);
    $("#kullaniciId").val(kullaniciId);
    $("#staticBackdrop").modal("show");
}


function TumUrunleriGetir() {
    Get("Urun/TumUrunler", (data) => {
        var urundata = data;
        var dropdown = $("#urunAd");
        $.each(urundata, function (index, urun) {
            dropdown.append($("<option>").val(urun.id).text(urun.ad));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    TumUrunleriGetir();
    TalepleriKullaniciyaGoreGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        TalepleriKullaniciyaGoreGetir();
    });
});