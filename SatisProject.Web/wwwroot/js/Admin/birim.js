function BirimleriGetir() {
    Get("Birim/TumBirimler", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Birim Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].ad}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].ad}"
            )'></i></td>`;
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

let selectedId = 0;

function Yeni() {
    selectedId = 0;
    $("#inputBirimAd").val("");
    $("#modal").modal("show");
}
function Kaydet() {
    var birim = {
        Id: selectedId,
        Ad: $("#inputBirimAd").val()
    };
    Post("Birim/Kaydet", birim, (data) => {
        BirimleriGetir();
        $("#modal").modal("hide");
    });
}

function Sil(id) {
    Delete(`Birim/Sil?id=${id}`, (data) => {
        BirimleriGetir();
    });
}

function Duzenle(id, ad) {
    selectedId = id;
    $("#inputBirimAd").val(ad);
    $("#modal").modal("show");
}

$(document).ready(function () {
    BirimleriGetir();
});
