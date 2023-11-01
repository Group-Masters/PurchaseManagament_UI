function BirimleriGetir() {
    Get("Department/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Birim Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].name}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i>
                <i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle("${arr[i].id}","${arr[i].name}")'></i>
                <i class="bi bi-database-fill-slash text-warning px-2 py-2 mx-3 border border-warning" onclick='VeriTabaniSil(${arr[i].id})'></i>
                </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divBirimler").html(html);

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
    $("#inputBirimAd").val("");
    $("#modal").modal("show");
}
function Kaydet() {
    var birim = {
        Name: $("#inputBirimAd").val()
    };
    Post("Department/Create", birim, (data) => {
        BirimleriGetir();
        $("#modal").modal("hide");
    });
}

function Duzenle(id, ad) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(ad);
    $("#modal1").modal("show");
}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
    }

    Put("Department/Update", guncelle, (data) => {
        BirimleriGetir();

        $("#modal1").modal("hide");
    });
}

function VeriTabaniSil(id) {
    Put(`Department/Delete/${id}`, (data) => {
        BirimleriGetir();
    });
    BirimleriGetir();
}


function Sil(id) {
    Delete(`Department/DeletePermanent${id}`, (data) => {
        BirimleriGetir();
    });
}



$(document).ready(function () {
    BirimleriGetir();
});
