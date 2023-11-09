function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`CompanyStock/GetAllByCompanyId/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light" style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th></th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].productName} ${arr[i].measuringUnitName}</td><td>${arr[i].quantity}</td>`;
            html += `<td>
            <button class="btn btn-danger"  onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-success mx-2" onclick='Artir(
                "${arr[i].id}"
            )'>Artır</button>
             <button class="btn btn-warning" onclick='Azalt(
                 "${arr[i].id}"
            )'>Azalt</button>
            </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divDepo").html(html);

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

function TumFaturalariGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Invoice/GetInvoicesByCompany/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header border border-black">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse${arr[i].id}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${arr[i].id} ${arr[i].supplierName}
          </button>
        </h2>
        <div
          id="flush-collapse${arr[i].id}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">

            <table class="table">
             <thead class="position-relative">
                 <tr style="background-color:#9e9494; color:#9e9494;">
                  <th scope="col" style="border:none;">·</th>
                  <th class="position-absolute top-0 end-0" scope="col" style="top:-7px !important;border:none;">
                  <span class="">
                    <button class="btn btn-light" onclick='StokTamamla(
                 "${arr[i].id}")'>Stok İşlemini Tamamla</button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tedarikçi Adı / Adresi :</th>
                  <td>${arr[i].supplierName} -- ${arr[i].supplierAddress}</td>
                </tr>
                 <tr>
                  <th scope="row">Şirket Adı / Adresi :</th>
                  <td>${arr[i].companyName} -- ${arr[i].companyAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].productName} ${arr[i].measuringUnit}</td>
                </tr>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Fiyat Teklifi :</th>
                  <td>${arr[i].offeredPrice} ${arr[i].currency}</td>
                </tr>
               
                <tr>
                  <th scope="row">Talep Tarihi :</th>
                  <td>${arr[i].requestCreatedDate}</td>
                </tr>
                <tr>
                  <th scope="row">Faturalandırma Tarihi :</th>
                  <td>${arr[i].createdDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divFatura").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divTeklif .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}


function Yeni() {
    $("#adet").val("");
    $("#urunAd").val("")
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var stok = {
        ProductId: $("#urunAd").val(),
        Quantity: $("#adet").val(),
        CompanyId: $("#gizliSirketId").val()
    };
    Post("CompanyStock/Create", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}


function Sil(id) {
    Delete(`CompanyStock/DeletePermanent/${id}`, (data) => {
        StokUrunleriGetir();
    });
}

function Artir(id) {
    $("#idArtir").val(id);
    $("#adetArtir").val("");
    $("#kullaniciArtir").val("");
    $("#staticBackdropArtir").modal("show");
}

function GuncelleArtir() {
    var stok = {
        Id: $("#idArtir").val(),
        Quantity: $("#adetArtir").val()
    };
    Put("CompanyStock/UpdateQuantityAdd", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdropArtir").modal("hide");
    });
}

function Azalt(id) {
    $("#idAzalt").val(id);
    $("#adetAzalt").val("");
    $("#departmanAzalt").val("");
    $("#kullaniciAzalt").val("");
    $("#staticBackdropAzalt").modal("show");
}

function GuncelleAzalt() {
    var stok = {
        Id: $("#idAzalt").val(),
        Quantity: $("#adetAzalt").val(),
        EmployeeId: $("#kullaniciAzalt").val()
    };
    Put("CompanyStock/UpdateQuantityReduce", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdropAzalt").modal("hide");
    });
}

function StokTamamla(id) {
    var stok = {
        Id: id,
        Status: 9
    };
    Put("Invoice/UpdateStatus", stok, (data) => {
        StokUrunleriGetir();
        TumFaturalariGetir();
    });
}

function TumUrunleriGetir() {
    Get("Product/GetAll", (data) => {
        var urundata = data;
        var dropdown = $("#urunAd");
        $.each(urundata, function (index, urun) {
            dropdown.append($("<option>").val(urun.id).text(`${urun.name} - ${urun.measuringName}`));
        });
    });
}

$(document).ready(function () {
    Get("Department/GetAll", (data) => {
        var getData = data;
        var ddlSirket = $("#departmanAzalt");
        $.each(getData, function (index, get) {
            ddlSirket.append($("<option>").val(get.id).text(get.name));
        });
    });
    $("#departmanAzalt").change(function () {
        var depId = $(this).val();
        var ddlkullanici = $("#kullaniciAzalt");
        ddlkullanici.empty();
        if (depId !== "") {
            Get(`Employee/GetByCompany/${depId}`, (data) => {
                if (data != "") {
                    var getData = data;
                    $.each(getData, function (index, get) {
                        ddlkullanici.append($("<option>").val(get.id).text(get.name));
                    });
                }
                else {
                    alert("Departmana Ait Kullanıcı Yok");
                }

            });
        }
    });
});

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    StokUrunleriGetir();
    TumFaturalariGetir();
    TumUrunleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        StokUrunleriGetir();
        TumFaturalariGetir();
    });
});