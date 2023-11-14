function SirketleriGetir() {
    Get("Company/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Sirket Adı</th><th>Şirket Adresi</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].name}</td><td>${arr[i].address}</td>`;
            html += `<td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].address}"
            )'>Düzenle</button>
            </td>`;
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
        Address: $("#inputAdress").val()
    };
    Post("Company/Create", sirket, (data) => {
        SirketleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`Company/DeletePermanent/${id}`, (data) => {
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
