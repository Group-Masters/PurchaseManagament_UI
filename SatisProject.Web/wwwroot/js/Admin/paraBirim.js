function ParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col"></th>
                <th scope="col">Para Birimi Ad</th>
                <th scope="col">Tl/Oran</th>
            </tr>
        </thead><tbody>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].rate}</td>`;


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
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var sirket = {
        Name: $("#inputBirimAd").val(),
    };
    Post("Currency/Create", sirket, (data) => {
        ParaBirimleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function TumParaBirimleriniGetir() {
    Get("Currency/GetAllCurrencyNames", (data) => {
        var getData = data;
        var dropdown = $("#inputBirimAd");
        $.each(getData, function (index, get) {
            dropdown.append($("<option>").val(get.code).text(`${get.name} - ${get.code}`));
        });
    });
}

$(document).ready(function () {
    ParaBirimleriGetir();
    TumParaBirimleriniGetir();
});
