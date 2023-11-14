function TedarikcilerGetir() {
    Get("Supplier/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Tedarikci</th><th>Adress</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].name}</td><td>${arr[i].address}</td>`;
            html += `
            <td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].address}"
            )'>Duzenle</button>
            </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divTedarikciler").html(html);

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
    Put(`Supplier/Delete/${id}`, (data) => {
        
    });
    TedarikcilerGetir();
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
