function BirimSirketGetir() {
    Get("CompanyDepartment/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Şirket Adı</th><th>Birim Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].companyId}</td><td>${arr[i].departmentId}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i>
                </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divSirketBirimleri").html(html);

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
    $("#sirketAd").val("");
    $("#birimAd").val("");
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var kaydet = {
        CompanyId: $("#sirketAd").val(),
        DepartmentId: $("#birimAd").val()
    };
    Post("CompanyDepartment/Create", kaydet, (data) => {
        BirimSirketGetir();
        $("#staticBackdrop").modal("hide");
    });
}

function Sil(id) {
    Delete(`CompanyDepartment/DeletePermanent/${id}`, (data) => {
        BirimSirketGetir();
    });
}

function BirimleriGetir() {
    Get("Department/GetAll", (data) => {
        var birimdata = data;
        var dropdown = $("#birimAd");
        $.each(birimdata, function (index, birim) {
            dropdown.append($("<option>").val(birim.id).text(birim.name));
        });
    });
}

function SirketleriGetir() {
    Get("Company/GetAll", (data) => {
        var sirketdata = data;
        var dropdown = $("#sirketAd");
        $.each(sirketdata, function (index, sirket) {
            dropdown.append($("<option>").val(sirket.id).text(sirket.name));
        });
    });
}

$(document).ready(function () {
    BirimSirketGetir();
    BirimleriGetir();
    SirketleriGetir();
});