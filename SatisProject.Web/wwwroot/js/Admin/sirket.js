function SirketleriGetir() {
    Get("Company/GetAllCompany", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Sirket Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].name}</td><td>${arr[i].adress}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].name}","${arr[i].adress}"
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
    Post("Company/CreateCompany", sirket, (data) => {
        SirketleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}


function Sil(id) {
    Delete(`Sirket/Sil?id=${id}`, (data) => {
        SirketleriGetir();
    });
}

function Duzenle(id, ad) {
    selectedId = id;
    $("#inputSirketAd").val(ad);
    $("#staticBackdrop").modal("show");
}

$(document).ready(function () {
    SirketleriGetir();
});
