﻿function TalepleriKullaniciyaGoreGetir() {
    var girisKullanicisi = $("#kullaniciId").val();
    Get(`Request/GetByEmployeeId/${girisKullanicisi}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi-Açıklama</th><th>Onay Durumu</th><th></th></tr></thead>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i+1}</td><td>${arr[i].productName}</td><td>${arr[i].quantity}</td><td><ul class="p-0" style="list-style: none;"><li>${arr[i].createdDate}</li><li>${arr[i].details}</li></ul></td><td> <span class="fw-bold"
            style="color: ${arr[i].state === 0 ? 'black' : arr[i].state === 1 ? 'red' : arr[i].state === 2 ? 'green' : arr[i].state === 3 ? 'black' : arr[i].state === 4 ? 'green' : arr[i].state === 5 ? 'black' : arr[i].state === 6 ? 'black' : 'blue'};">
                         ${arr[i].state === 0 ? 'Beklemede' : arr[i].state === 1 ? 'Reddedildi' : arr[i].state === 2 ? 'Onaylandı' : arr[i].state === 3 ? 'Yönetimde Bekliyor' : arr[i].state === 4 ? 'Yönetimde Onaylandı' : arr[i].state === 5 ? 'Yönetimde Reddedildi' : arr[i].state === 6 ? 'Ürün Bekleniyor' : 'Talebiniz Tamamlandı'}
                     </span></td>`;

            if (arr[i].state === 0) {
                html += `<td>
                <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
                <button class="btn btn-primary"  onclick='Duzenle("${arr[i].id}","${arr[i].productId}","${arr[i].quantity}","${arr[i].details}")'>Düzenle</button>
                </td>`;
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


function Yeni() {
    $("#urunAd").val("");
    $("#aciklama").val("");
    $("#adet").val(0);
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var talep = {
        ProductId: $("#urunAd").val(),
        Details: $("#aciklama").val(),
        Quantity: $("#adet").val()
    };


    Post("Request/Create", talep, (data) => {
        TalepleriKullaniciyaGoreGetir();
        $("#staticBackdrop").modal("hide");

    });
}



function Duzenle(id, productId, quantity, details) {
    $("#idG").val(id);
    $("#urunAdG").val(productId);
    $("#adetG").val(quantity);
    $("#aciklamaG").val(details);
    $("#staticBackdrop1").modal("show");
}

function Guncelle() {
    var talep = {
        Id: $("#idG").val(),
        ProductId: $("#urunAdG").val(),
        Details: $("#aciklamaG").val(),
        Quantity: $("#adetG").val()
    };
    Put("Request/Update", talep, (data) => {

        TalepleriKullaniciyaGoreGetir();
        $("#staticBackdrop1").modal("hide");
    });
}

function Sil(id) {
    Put(`Request/Delete/${id}`, id, (data) => {
        TalepleriKullaniciyaGoreGetir();
    });
}

function TumUrunleriGetir() {
    Get("Product/GetAll", (data) => {
        var urundata = data;
        var dropdown = $("#urunAd");
        var dropdownG = $("#urunAdG");
        $.each(urundata, function (index, urun) {
            dropdown.append($("<option>").val(urun.id).text(`${urun.name} - ${urun.measuringName}`));
            dropdownG.append($("<option>").val(urun.id).text(`${urun.name} - ${urun.measuringName}`));
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