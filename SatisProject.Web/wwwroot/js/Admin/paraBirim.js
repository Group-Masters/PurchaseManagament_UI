function ParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Para Birimi</th><th>TL Oran</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].name}</td><td>${arr[i].rate}</td>`;
            html += `<td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].rate}"
            )'>Duzenle</button>
            </td>`;
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
    Put(`Currency/Delete/${id}`,id, (data) => {
        ParaBirimleriGetir();
    });
    ParaBirimleriGetir();
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
