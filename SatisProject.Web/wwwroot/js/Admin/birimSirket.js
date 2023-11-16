function BirimSirketGetir() {
    Get("CompanyDepartment/GetAll", (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Şirket Adı</th>
                <th scope="col">Departman Adı</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].companyName}</td>
                        <td>${arr[i].departmentName}</td>`

            html += `
               <td><button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
                </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divSirketBirimleri").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divSirketBirimleri .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}
function a() {
    Get("CompanyDepartment/GetAll", (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Şirket Adı</th><th>Birim Adı</th><th></th></tr></thead>`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${i + 1}</td><td>${arr[i].companyName}</td><td>${arr[i].departmentName}</td>`;
            html += `<td><button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
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