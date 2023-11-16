function ParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col"></th>
                <th scope="col">Para Birimi Ad</th>
                <th scope="col">Tl/Oran</th>
                <th scope="col">Islemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].rate}</td>`

            html += `
               <td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].rate}"
            )'>Duzenle</button>
            </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divParaBirimleri").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divParaBirimleri .arama").filter(function () {
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
