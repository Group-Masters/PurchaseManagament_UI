function KullanicilariGetir() {
    var html = ``;
    var girisSirketId = $("#girisSirketId").val();
    Get(`Employee/GetIsActiceByCompany/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        html += `<table class="table align-middle mb-0 bg-white" style="border-radius:35px;">
  <thead class="bg-light">
    <tr>
      <th>Ad - Soyad</th>
      <th>Şirket - Birim</th>
      <th>Pozisyon</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody>`;

        for (var i = 0; i < arr.length; i++) {
            html += `
        <tr class="searchTable">
            <td>
                <div class="d-flex align-items-center">
                    <h4 class="p-1">${arr[i].id}</h4>
                    <img src="${arr[i].gender === 0 ? 'https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/7-512.png' : 'https://cdn2.iconfinder.com/data/icons/business-filled-outline-style-1-set-1/256/4-256.png'}"
                        alt="" style="width: 45px; height: 45px" class="rounded-circle" />
                    <div class="ms-3">
                        <p class="fw-bold mb-1">${arr[i].name} ${arr[i].surname}</p>
                        <p class="text-muted mb-0">${arr[i].email}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-muted mb-0">${arr[i].departmentName}</p>
            </td>
            <td>
                <ul>`;
            if (arr[i].roles.length <= 0) {
                html += '<li class="text-danger" style="list-style: none;">Role Sahip Değil</li>';
            } else {
                for (var j = 0; j < arr[i].roles.length; j++) {
                    html += `<li class="text-primary" style="list-style: none;" >${arr[i].roles[j]}</li>`;
                }
            }
            html += `</ul>
            </td>
            <td>
                <button class="btn btn-primary" onclick='YeniRolVermeDuzenle("${arr[i].id}")'>
                   Rol Ver
                </button>
            </td>
        </tr>
    `;
        }

        html += `</tbody></table>`;

        $("#divKullanicilar").html(html);



        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullanicilar .searchTable").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function KullaniciRolGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`EmployeeRole/GetDetailByCompanyId/${girisSirketId}`, (data) => {
        var html = `<div class=""><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ad Soyad</th><th>Mail Adres</th><th>Şirket Rolü</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].employeeName} ${arr[i].employeeSurname}</td><td>${arr[i].employeeEmail}</td><td>${arr[i].roleName}</td>`;
            html += `<td><button class="btn btn-danger" onclick='KullaniciRolSil(${arr[i].id})'>Rol Sil</button></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divKullaniciRol").html(html);

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


function YeniRolVer() {
    var rol = {
        EmployeeId: $("#gizliId").val(),
        RoleId: $("#rolAd").val()
    };
    Post("EmployeeRole/Create", rol, (data) => {
        KullanicilariGetir();
        KullaniciRolGetir();
        $("#rolVerModal").modal("hide");
    });
}

function KullaniciRolSil(id) {
    Delete(`EmployeeRole/DeletePermanent/${id}`, (data) => {
        KullanicilariGetir();
        KullaniciRolGetir();
    });
}

function YeniRolVermeDuzenle(id) {
    $("#gizliId").val(id);
    $("#rolAd").val();
    $("#rolVerModal").modal("show");
}

function TumRolleriGetir() {
    Get("Role/GetAll", (data) => {
        var roldata = data;
        var dropdown = $("#rolAd");
        $.each(roldata, function (index, rol) {
            dropdown.append($("<option>").val(rol.id).text(rol.name));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    TumRolleriGetir();
    KullaniciRolGetir();
    KullanicilariGetir()
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullanicilariGetir()
        KullaniciRolGetir();
    });
});