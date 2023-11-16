function BirimleriGetir() {
    Get("Department/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Departman Adı</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>`

            html += `
               <td><button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
                <button class="btn btn-primary mx-2" onclick='Duzenle("${arr[i].id}","${arr[i].name}")'>Düzenle</button>
                <button class="btn btn-warning" onclick='VeriTabaniSil(${arr[i].id})' title="Veri Tabanına Taşıma İşlemi">VTT</button>
                </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divBirimler").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divBirimler .arama").filter(function () {
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
    Put(`Department/Delete/${id}`,id, (data) => {
        BirimleriGetir();
    });
}


function Sil(id) {
    Delete(`Department/DeletePermanent${id}`, (data) => {
        BirimleriGetir();
    });
}



$(document).ready(function () {
    BirimleriGetir();
});
