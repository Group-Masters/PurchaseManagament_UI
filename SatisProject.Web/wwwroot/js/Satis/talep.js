function TalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var girisBirimId = $("#birimler").val();
    Get(`Request/GetByCIdDId/${girisSirketId}/${girisBirimId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Talep Tarihi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].productName}</td><td>${arr[i].quantity}</td><td><ul><li>${arr[i].createdDate}</li><li>${arr[i].details}</li></ul></td><td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td><td> <span style="color:black;"> Beklemede</span></td>`;

            html += `
                <td>
                <i class="bi bi-check-square-fill text-success px-2 py-2 mx-3 border border-success" title="Onayla" onclick='Onayla("${arr[i].id}")'></i>
                <i class="bi bi-x-square text-danger px-2 py-2 mx-3 border border-danger" title="Reddet" onclick='Reddet("${arr[i].id}")'></i>
                </td>`;

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
    Put("Request/UpdateProductState", talep, (data) => {
        TalepleriGetir();
        TalepleriKullaniciyaGoreGetir();
    });
}

function Reddet(id) {
    var talep = {
        Id: id,
        State: 1

    };
    Put("Request/UpdateProductState", talep, (data) => {
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

//$("#girisSirketId").change(function () {
//    var sirketId = $(this).val();
//    var ddlBirim = $("#birimler");
//    ddlBirim.empty();
//    if (sirketId !== "") {
//        Get(`CompanyDepartment/GetDepartmentByCompanyId/${sirketId}`, (data) => {
//            if (data != "") {
//                var birimler = data;
//                $.each(birimler, function (index, birim) {
//                    ddlBirim.append($("<option>").val(birim.id).text(birim.name));
//                });
//            }
//            else {
//                alert("Departman yok");
//            }

//        });
//    }
//});



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
