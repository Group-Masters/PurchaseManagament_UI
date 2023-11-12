
function KullaniciGetirDeneme() {
    var html = ``;
    var girisSirketId = $("#girisSirketId").val();
    Get(`Employee/GetByCompany/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        html += `<table class="table align-middle mb-0 bg-white" style="border-radius:35px;">
  <thead class="bg-light">
    <tr >
      <th>Ad - Soyad</th>
      <th>Birim Ad</th>
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
                <ul class="p-0">`;
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
                <span class="badge p-2 text-white badge-success rounded-pill d-inline" style="background-color: ${arr[i].isActive ? 'green' : 'red'};">${arr[i].isActive ? 'Aktif' : 'Pasif'}</span>
            </td>
            <td>
                <button class="btn btn-primary" onclick='KullaniciDuzenle(${arr[i].id},"${arr[i].username}","${arr[i].address}","${arr[i].phone}","${arr[i].email}","${arr[i].isActive}")'>
                    Düzenle
                </button>
            </td>
        </tr>
    `;
        }

        html += `</tbody></table>`;

        $("#divKullaniciDeneme").html(html);



        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullaniciDeneme .searchTable").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}



function YeniKullanici() {
    $("#birimAd").val("");
    $("#sirketAd").val("");
    $("#ad").val("");
    $("#soyad").val("");
    $("#mailAdress").val("");
    $("#parola").val("");
    $("#telNo").val("");
    $("#tcNo").val("");
    $("#acikAdres").val("");
    $("#dogumTarih").val("");
    $("#cinsiyet").val("");
    $("#kullaniciAdi").val("");
    $("#staticBackdrop").modal("show");
}

function KullaniciKaydet() {
    var kullanici = {
        DepartmentId: $("#birimAd").val(),
        Address: $("#acikAdres").val(),
        Name: $("#ad").val(),
        Surname: $("#soyad").val(),
        Password: $("#parola").val(),
        Phone: $("#telNo").val(),
        IdNumber: $("#tcNo").val(),
        CompanyId: $("#sirketAd").val(),
        Email: $("#mailAdress").val(),
        BirthYear: $("#dogumTarih").val(),
        Gender: $("#cinsiyet").val() === "true" ? '0' : '1',
        Username: $("#kullaniciAdi").val()
    };
    Post("Employee/Create", kullanici, (data) => {
        KullaniciGetirDeneme();
        $("#staticBackdrop").modal("hide");
    });
}

function KullaniciDuzenle(id, username, address, phone, email, isActive) {
    $("#idG").val(id);
    $("#kullaniciAdiG").val(username);
    $("#acikAdresG").val(address);
    $("#telNoG").val(phone);
    $("#mailAdressG").val(email);
    $("#aktifG").val(isActive);
    $("#staticBackdrop1").modal("show");
}

function Guncelle() {
    var kullanici = {
        EmployeeId: $("#idG").val(),
        Username: $("#kullaniciAdiG").val(),
        Address: $("#acikAdresG").val(),
        Phone: $("#telNoG").val(),
        Email: $("#mailAdressG").val(),
        IsActive: $("#aktifG").val() === "true" ? true : false
    };
    Put("Employee/Update", kullanici, (data) => {
        KullaniciGetirDeneme();
        $("#staticBackdrop1").modal("hide");
    });
}



$(document).ready(function () {
    Get("Company/GetAll", (data) => {
        var sirketler = data;
        var ddlSirket = $("#sirketAd");
        $.each(sirketler, function (index, sirket) {
            ddlSirket.append($("<option>").val(sirket.id).text(sirket.name));
        });
    });
    $("#sirketAd").change(function () {
        var sirketId = $(this).val();
        var ddlBirim = $("#birimAd");
        ddlBirim.empty();
        if (sirketId !== "") {
            Get(`CompanyDepartment/GetDepartmentByCompanyId/${sirketId}`, (data) => {
                if (data != "") {
                    var birimler = data;
                    $.each(birimler, function (index, birim) {
                        ddlBirim.append($("<option>").val(birim.id).text(birim.name));
                    });
                }
                else {
                    alert("Departman yok");
                }

            });
        }
    });

    //Patlarsa bundan patlı aç
    //$("#aracEkleForm").submit(function (event) {
    //    event.preventDefault();
    //    var selectedMarkaId = $("#ddlMarka").val();
    //    var selectedModelId = $("#ddlModel").val();
    //});
});

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    //TumBirimleriGetir();
    TumSirketleriGetir();
    /*    KullaniciGetir();*/
    KullaniciGetirDeneme();
    /*    SirketleriGetir();*/
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        /*        KullaniciGetir();*/
        KullaniciGetirDeneme();
    });
});
