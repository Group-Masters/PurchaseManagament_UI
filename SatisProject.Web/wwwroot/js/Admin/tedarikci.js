function TedarikcilerGetir() {
    Get("Supplier/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col"></th>
                <th scope="col">Tedarikci Ad</th>
                <th scope="col">Sirket Adresi</th>
                <th scope="col">Islemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].address}</td>`

            html += `
               <td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].address}"
            )'>Duzenle</button>
            </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divTedarikciler").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divTedarikciler .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function Yeni() {
    $("#inputName").val("");
    $("#inputAdress").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var tedarikci = {
        Name: $("#inputName").val(),
        Address: $("#inputAdress").val()
    };
    Post("Supplier/Create", tedarikci, (data) => {
        TedarikcilerGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Put(`Supplier/Delete/${id}`, id, (data) => {
        TedarikcilerGetir();
    });
}

function Duzenle(id, name, address) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#adressGuncelle").val(address);
    $("#staticBackdrop1").modal("show");

}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
        Address: $("#adressGuncelle").val()

    }

    Put("Supplier/Update", guncelle, (data) => {
        TedarikcilerGetir();

        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    TedarikcilerGetir();
});
