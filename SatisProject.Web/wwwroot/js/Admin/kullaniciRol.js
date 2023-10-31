function KullanicilariGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`Kullanici/KullaniciTamBilgilerBySirketId/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ad Soyad</th><th>Mail Adres</th><th>Şirket Rolü</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].ad} ${arr[i].soyad}</td><td>${arr[i].eposta}</td><td>${arr[i].rolAd === null ? 'Verilmedi' : arr[i].rolAd}</td>`;
            html += `<td></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='YeniRolVermeDuzenle("${arr[i].id}")'></i></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divKullanicilar").html(html);

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

function KullaniciRolGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`KullaniciRol/TumKullaniciRoller/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ad Soyad</th><th>Mail Adres</th><th>Şirket Rolü</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].kullaniciAd} ${arr[i].soyad}</td><td>${arr[i].eposta}</td><td>${arr[i].rolAd}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='KullaniciRolSil(${arr[i].id})'></i></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divKullaniciRol").html(html);

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


function YeniRolVer() {
    var rol = {
        Id: 0,
        KullaniciId: $("#gizliId").val(),
        RolId: $("#rolAd").val()
    };
    Post("KullaniciRol/Kaydet", rol, (data) => {
        KullanicilariGetir();
        KullaniciRolGetir();
        $("#rolVerModal").modal("hide");
    });
}

function KullaniciRolSil(id) {
    Delete(`KullaniciRol/Sil?id=${id}`, (data) => {
        KullaniciRolGetir();
        KullanicilariGetir();
    });
}

function YeniRolVermeDuzenle(id) {
    $("#gizliId").val(id);
    $("#rolAd").val();
    $("#rolVerModal").modal("show");
}

function TumRolleriGetir() {
    Get("Rol/TumRoller", (data) => {
        var roldata = data;
        var dropdown = $("#rolAd");
        $.each(roldata, function (index, rol) {
            dropdown.append($("<option>").val(rol.id).text(rol.ad));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    TumRolleriGetir();
    KullaniciRolGetir();
    KullanicilariGetir()
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullanicilariGetir()
        KullaniciRolGetir();
    });
});