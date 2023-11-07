function TalepleriKullaniciyaGoreGetir() {
    var girisKullanicisi = $("#kullaniciId").val();
    Get(`Request/GetByEmployeeId/${girisKullanicisi}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].productName}</td><td>${arr[i].quantity}</td><td><ul><li>${arr[i].createdDate}</li><li>${arr[i].details}</li></ul></td><td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td><td> <span class="fw-bold" style="color: ${arr[i].state === 0 ? 'black' : arr[i].state === 1 ? 'red' : 'green'};">
                         ${arr[i].state === 0 ? 'Beklemede' : arr[i].state === 1 ? 'Reddedildi' : 'Onaylandı'}
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
    $("#adet").val("");
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
    Put(`Request/Delete/${id} `, (data) => {
       /* TalepleriKullaniciyaGoreGetir();*/
    });
    
    location.reload();
}

//function TumUrunleriGetir() {
//    Get("Product/GetAll", (data) => {
//        var urundata = data;
//        var dropdown = $("#urunAd");
//        var dropdownG = $("#urunAdG");
//        $.each(urundata, function (index, urun) {
//            dropdown.append($("<option>").val(urun.id, urun.measuringUnitId ).text(urun.name, urun.measuringName));
//            dropdownG.append($("<option>").val(urun.id, urun.measuringUnitId ).text(urun.name, urun.measuringName));
//        });
//    });
//}

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