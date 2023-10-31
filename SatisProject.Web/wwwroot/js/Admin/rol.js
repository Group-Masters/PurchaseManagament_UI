function RolleriGetir() {
    Get("Role/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Rol Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].name}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='RolSil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='RolDuzenle(
                "${arr[i].id}","${arr[i].name}")'></i>
                <i class="bi bi-database-fill-slash text-warning px-2 py-2 mx-3 border border-warning" onclick='RoleIsDeleted(${arr[i].id})'></i>
                </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divRoller").html(html);

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

function RoleIsDeleted(id) {

    Put(`Role/Delete/${id}`, (data) => {
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