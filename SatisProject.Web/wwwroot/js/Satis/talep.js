function TalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var girisBirimId = $("#birimler").val();
    Get(`Request/GetByCIdDId/${girisSirketId}/${girisBirimId}`, (data) => {
        var html = `<table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Ürün Adı</th>
                <th scope="col">Adet</th>
                <th scope="col">Talep Tarihi-Açıklama</th>
                <th scope="col">Talep Eden Kullanıcı</th>
                <th scope="col">Onay Durumu</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < (arr.length <= 10 ? arr.length : 10); i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].productName}
                            <small class="d-block">${arr[i].measuringUnitName}</small>
                        </td>                       
                        <td>${arr[i].quantity}</td>
                        <td>
                            ${FormatDate(arr[i].createdDate)} 
                            <small class="d-block">${arr[i].details}</small>
                        </td>
                        <td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td>
                        <td> <span class="fw-bold"
            style="color: ${arr[i].state === 0 ? 'gray' : arr[i].state === 1 ? 'red' : arr[i].state === 2 ? 'green' : arr[i].state === 3 ? 'gray' : arr[i].state === 4 ? 'green' : arr[i].state === 5 ? 'gray' : arr[i].state === 6 ? 'gray' : 'blue'};">
                         ${arr[i].state === 0 ? 'Beklemede' : arr[i].state === 1 ? 'Reddedildi' : arr[i].state === 2 ? 'Onaylandı' : arr[i].state === 3 ? 'Yönetimde Bekliyor' : arr[i].state === 4 ? 'Yönetimde Onaylandı' : arr[i].state === 5 ? 'Yönetimde Reddedildi' : arr[i].state === 6 ? 'Ürün Bekleniyor' : 'Talep Tamamlandı'}
                     </span></td>`

            if (arr[i].state === 0) {
                html += `
                <td>
                <button class="btn btn-success" onclick='Onayla("${arr[i].id}")'>Onayla</button>
                <button class="btn btn-danger" onclick='Reddet("${arr[i].id}")'>Reddet</button>
                </td>`;
            }
            else {
                html += `<td>Artık Düzenlenemez</td>`
            }
            `</tr>`;
        }
        html += `</tbody></table>`;

        $("#divTalep").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divTalep .arama").filter(function () {
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
