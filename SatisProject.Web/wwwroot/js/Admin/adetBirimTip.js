function AdetBirimleriGetir() {
    Get("MeasuringUnit/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Adet-Birim Tipi</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i+1}</td><td>${arr[i].name}</td>`;
            html += `
            <td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}"
            )'>Duzenle</button>
            `;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divAdetBirim").html(html);

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
    $("#inputName").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var adetBirim = {
        Name: $("#inputName").val(),
    };
    Post("MeasuringUnit/Create", adetBirim, (data) => {
        AdetBirimleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Put(`MeasuringUnit/Delete/${id}`, (data) => {
        AdetBirimleriGetir();
    });
    
}

function Duzenle(id, name) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#staticBackdrop1").modal("show");

}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),

    }

    Put("MeasuringUnit/Update", guncelle, (data) => {
        AdetBirimleriGetir();

        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    AdetBirimleriGetir();
});
