function SirketleriGetir() {
    Get("Company/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Sirket Adı</th><th>Şirket Adresi</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].name}</td><td>${arr[i].adress}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].adress}"
            )'></i></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divSirketler").html(html);

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
    $("#inputSirketAd").val("");
    $("#inputAdress").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var sirket = {
        Name: $("#inputSirketAd").val(),
        Adress: $("#inputAdress").val()
    };
    Post("Company/Create", sirket, (data) => {
        SirketleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`Company/Delete/${id}`, (data) => {
        SirketleriGetir();
    });
}

function Duzenle(id, name, adress) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#adressGuncelle").val(adress);
    $("#staticBackdrop1").modal("show");

}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
        Adress: $("#adressGuncelle").val()

    }

    Put("Company/Update", guncelle, (data) => {
        SirketleriGetir();

        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    SirketleriGetir();
});
