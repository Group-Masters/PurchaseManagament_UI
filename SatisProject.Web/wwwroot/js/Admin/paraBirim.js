function ParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Para Birimi</th><th>TL Oran</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].name}</td><td>${arr[i].rate}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].rate}"
            )'></i></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divParaBirimleri").html(html);

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
    $("#inputOran").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var sirket = {
        Name: $("#inputBirimAd").val(),
        Rate: $("#inputOran").val()
    };
    Post("Currency/Create", sirket, (data) => {
        ParaBirimleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`Currency/DeletePermanent/${id}`, (data) => {
        ParaBirimleriGetir();
    });
}

function Duzenle(id, name, rate) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#oranGuncelle").val(rate);
    $("#staticBackdrop1").modal("show");

}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
        Rate: $("#oranGuncelle").val()

    }

    Put("Currency/Update", guncelle, (data) => {
        ParaBirimleriGetir();

        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    ParaBirimleriGetir();
});
