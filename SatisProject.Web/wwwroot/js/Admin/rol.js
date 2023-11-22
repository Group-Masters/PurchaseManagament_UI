function RolleriGetir() {
    Get("Role/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Rol Adı</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>`

            html += `
                <td><button class="btn btn-danger"  onclick='RolSil(${arr[i].id})'>Sil</button><button class="btn btn-primary mx-2" onclick='RolDuzenle(
                "${arr[i].id}","${arr[i].name}")'>Düzenle</button>
                <button class="btn btn-warning" onclick='VeriTabaniSil(${arr[i].id})' title="Veri Tabanına Taşıma İşlemi">VTT</button>
                </td>`;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divRoller").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divRoller .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function YeniRol() {
    $("#inputRolAd").val("");
    $("#rolModal").modal("show");
}
function RolKaydet() {
    var rol = {
        Name: $("#inputRolAd").val()
    };
    Post("Role/Create", rol, (data) => {
        RolleriGetir();
        $("#rolModal").modal("hide");
    });
}

function RolDuzenle(id, name) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#rolModal1").modal("show");
}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
    }

    Put("Role/Update", guncelle, (data) => {
        RolleriGetir();

        $("#rolModal1").modal("hide");
    });
}

function VeriTabaniSil(id) {
    Put(`Role/Delete/${id}`, id, (data) => {
        RolleriGetir();
    });
}

function RolSil(id) {
    Delete(`Role/DeletePermanent/${id}`, (data) => {
        RolleriGetir();
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    /*TumSirketleriGetir();*/
    RolleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        RolleriGetir();

    });
});