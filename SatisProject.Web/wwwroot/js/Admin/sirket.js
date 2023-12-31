﻿function SirketleriGetir() {
    Get("Company/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Şirket Adı</th>
                <th scope="col">Şirket Adresi</th>
                <th scope="col">Şirket Limiti</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].name}</td>
                        <td>${arr[i].address}</td>
                        <td>${arr[i].managerThreshold} ₺</td>`

            html += `
               <td>
            <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].address}","${arr[i].managerThreshold}"
            )'>Düzenle</button>
            </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divSirketler").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divSirketler .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function Yeni() {
    $("#inputSirketAd").val("");
    $("#inputAdress").val("");
    $("#inputLimit").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var sirket = {
        Name: $("#inputSirketAd").val(),
        Address: $("#inputAdress").val(),
        ManagerThreshold: $("#inputLimit").val()
    };
    Post("Company/Create", sirket, (data) => {
        SirketleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`Company/DeletePermanent/${id}`, (data) => {
        SirketleriGetir();
    });
}

function Duzenle(id, name, adress, managerThreshold) {
    $("#idGuncelle").val(id);
    $("#adGuncelle").val(name);
    $("#adressGuncelle").val(adress);
    $("#limitGuncelle").val(managerThreshold);
    $("#staticBackdrop1").modal("show");

}

function Guncelle() {
    var guncelle = {
        Id: $("#idGuncelle").val(),
        Name: $("#adGuncelle").val(),
        Address: $("#adressGuncelle").val(),
        ManagerThreshold: $("#limitGuncelle").val()
    }

    Put("Company/Update", guncelle, (data) => {
        SirketleriGetir();

        $("#staticBackdrop1").modal("hide");
    });
}

$(document).ready(function () {
    SirketleriGetir();
});
