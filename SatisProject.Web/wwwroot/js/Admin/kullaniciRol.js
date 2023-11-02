function KullanicilariGetir() {
    var html = ``;
    var girisSirketId = $("#girisSirketId").val();
    Get(`Employee/GetAll`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        html += `<table class="table align-middle mb-0 bg-white" style="border-radius:35px;">
  <thead class="bg-light">
    <tr>
      <th>Ad - Soyad</th>
      <th>Şirket - Birim</th>
      <th>Kimlik - Telefon</th>
      <th>Pozisyon</th>
      <th>Durum</th>
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
                        <p class="fw-bold mb-1">${arr[i].name} ${arr[i].surname} <i type="button" class="bi bi-geo-alt-fill" title="${arr[i].address}"> </i></p>
                        <p class="text-muted mb-0">${arr[i].email}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-muted mb-0">${arr[i].departmentName}</p>
            </td>
            <td>
                <p class="fw-normal mb-1">${arr[i].idNumber}</p>
                <p class="text-muted mb-0">${arr[i].phone}</p>
            </td>
            <td>
                <ul>`;
            for (var j = 0; j < arr[i].roles.length; j++) {
                html += `<li>${arr[i].roles[j]}</li>`;
            }
            html += `</ul>
            </td>
            <td>
                <span class="badge p-2 text-white badge-success rounded-pill d-inline" style="color: ${arr[i].isActive ? 'green' : 'red'};">${arr[i].isActive ? 'Aktif' : 'Pasif'}</span>
            </td>
            <td>
                <button type="button" class="btn btn-link btn-sm btn-rounded">
                    <i class="bi bi-pencil-square text-primary px-2 py-2 mx-2 mt-4 border border-primary" onclick='YeniRolVermeDuzenle("${arr[i].id}")'></i>
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
    Get(`KullaniciRol/TumKullaniciRoller/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ad Soyad</th><th>Mail Adres</th><th>Şirket Rolü</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].kullaniciAd} ${arr[i].soyad}</td><td>${arr[i].eposta}</td><td>${arr[i].rolAd}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='KullaniciRolSil(${arr[i].id})'></i></td>`;
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
/*        KullaniciRolGetir();*/
        $("#rolVerModal").modal("hide");
    });
}

function KullaniciRolSil(id) {
    Delete(`KullaniciRol/Sil?id=${id}`, (data) => {
/*        KullaniciRolGetir();*/
        KullanicilariGetir();
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
    //TumSirketleriGetir();
    TumRolleriGetir();
    /*KullaniciRolGetir();*/
    KullanicilariGetir()
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullanicilariGetir()
        /*KullaniciRolGetir();*/
    });
});