function TalepleriKullaniciyaGoreGetir() {
    var girisKullanicisi = $("#kullaniciId").val();
    Get(`Request/GetByEmployeeId/${girisKullanicisi}`, (data) => {
        var html = `<table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Ürün Adı</th>
                <th scope="col">Adet</th>
                <th scope="col">Talep Tarihi-Açıklama</th>
                <th scope="col">Onay Durumu</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].productName}
                            <small class="d-block">${arr[i].measuringUnitName}</small>
                        </td>                       
                        </td>
                         <td>${arr[i].quantity}</td>
                        <td>
                            ${FormatDate(arr[i].createdDate)}   
                            <small class="d-block">${arr[i].details}</small>
                        </td>
                        <td> <span class="fw-bold"
            style="color: ${arr[i].state === 0 ? 'black' : arr[i].state === 1 ? 'red' : arr[i].state === 2 ? 'green' : arr[i].state === 3 ? 'black' : arr[i].state === 4 ? 'green' : arr[i].state === 5 ? 'black' : arr[i].state === 6 ? 'black' : 'blue'};">
                         ${arr[i].state === 0 ? 'Beklemede' : arr[i].state === 1 ? 'Reddedildi' : arr[i].state === 2 ? 'Onaylandı' : arr[i].state === 3 ? 'Yönetimde Bekliyor' : arr[i].state === 4 ? 'Yönetimde Onaylandı' : arr[i].state === 5 ? 'Yönetimde Reddedildi' : arr[i].state === 6 ? 'Ürün Bekleniyor' : 'Talebiniz Tamamlandı'}
                     </span></td>`

            if (arr[i].state === 0) {
                html += `<td>
                <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
                <button class="btn btn-primary"  onclick='Duzenle("${arr[i].id}","${arr[i].productId}","${arr[i].quantity}","${arr[i].details}")'>Düzenle</button>
                </td>`;
            }
            else {
                html+=`<td>Artık Düzenlenemez</td>`
            }
                        `</tr>`;
        }
        html += `</tbody></table>`;

        $("#divTalepKullanici").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divTalepKullanici .arama").filter(function () {
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