function TalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var girisBirimId = $("#birimler").val();
    Get(`Request/GetByCIdDId/${girisSirketId}/${girisBirimId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi-Açıklama</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < (arr.length <= 10 ? arr.length : 10); i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].productName}</td><td>${arr[i].quantity}</td><td><ul class="p-0" style="list-style: none;"><li>${arr[i].createdDate}</li><li>${arr[i].details}</li></ul></td><td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td>
            <td>
            <span class="fw-bold"
            style="color: ${arr[i].state === 0 ? 'black' : arr[i].state === 1 ? 'red' : arr[i].state === 2 ? 'green' : arr[i].state === 3 ? 'black' : arr[i].state === 4 ? 'green' : arr[i].state === 5 ? 'black' : arr[i].state === 6 ? 'black' : 'blue'};">
                         ${arr[i].state === 0 ? 'Beklemede' : arr[i].state === 1 ? 'Reddedildi' : arr[i].state === 2 ? 'Onaylandı' : arr[i].state === 3 ? 'Yönetimde Bekliyor' : arr[i].state === 4 ? 'Yönetimde Onaylandı' : arr[i].state === 5 ? 'Yönetimde Reddedildi' : arr[i].state === 6 ? 'Ürün Bekleniyor' : 'Talebiniz Tamamlandı'}
                     </span>
            </td>`;

            if (arr[i].state === 0) {
            html += `
                <td>
                <button class="btn btn-success" onclick='Onayla("${arr[i].id}")'>Onayla</button>
                <button class="btn btn-danger" onclick='Reddet("${arr[i].id}")'>Reddet</button>
                </td>`;
            }
            html += `</tr>`;
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


function Onayla(id) {
    var talep = {
        Id: id,
        State: 2
    };
    Put("Request/UpdateState", talep, (data) => {
        TalepleriGetir();
        TalepleriKullaniciyaGoreGetir();
    });
}

function Reddet(id) {
    var talep = {
        Id: id,
        State: 1

    };
    Put("Request/UpdateState", talep, (data) => {
        TalepleriGetir();
        TalepleriKullaniciyaGoreGetir();
    });
}

function TumBirimleriGetir() {
    Get("Department/GetAll", (data) => {
        var birimdata = data;
        var dropdown = $("#birimler");
        $.each(birimdata, function (index, birim) {
            dropdown.append($("<option>").val(birim.id).text(birim.name));
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
        // Yeni birim seçildiğinde verileri getir
        TalepleriGetir();
    });
});
