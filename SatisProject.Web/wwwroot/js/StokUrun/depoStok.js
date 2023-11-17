function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`CompanyStock/GetAllByCompanyId/${girisSirketId}`, (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col">Id</th>
                <th scope="col">Ürün Adı</th>
                <th scope="col">Adet</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].productName}
                            <small class="d-block">${arr[i].measuringUnitName}</small>
                        </td>                       
                        <td>${arr[i].quantity}</td>`

            html += `
                <td>
            <button class="btn btn-danger"  onclick='Sil(${arr[i].id})'>Sil</button>
            <button class="btn btn-success mx-2" onclick='Artir(
                "${arr[i].id}"
            )'>Artır</button>
             <button class="btn btn-warning" onclick='Azalt(
                 "${arr[i].id}"
            )'>Stoktan Ver</button>
            </td>`;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divDepo").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divDepo .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function TumFaturalariGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Invoice/GetPendingInvoicesByCompany/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush px-4" id="accordionFlushExample">
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
            Talep Eden : ${arr[i].requestingEmployeeName} ${arr[i].requestingEmployeeSurname}
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

function StoktanKarsilanlar() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Offer/GetFromStock/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush px-4" id="accordionFlushExample">
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
            ${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}
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
                    <button class="btn btn-light" onclick='StokTamamlaOffer(
                 "${arr[i].id}")'>Stok İşlemini Tamamla</button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Tedarikçi Adı / Adresi :</th>
                  <td>${arr[i].supplierName}</td>
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
                  <th scope="row">Talep Eden Kişi :</th>
                  <td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divStokTalep").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divStokTalep .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}


function Yeni() {
    $("#adet").val(0);
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
    $("#adetArtir").val(0);
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
    $("#adetAzalt").val(0);
    $("#departmanAzalt").val("");
    $("#kullaniciAzalt").val("");
    $("#staticBackdropAzalt").modal("show");
}

function GuncelleAzalt() {
    var stok = {
        Id: $("#idAzalt").val(),
        Quantity: $("#adetAzalt").val(),
        ReceivingEmployeeId: $("#kullaniciAzalt").val()
    };
    Put("CompanyStock/UpdateQuantityReduce", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdropAzalt").modal("hide");
        
    });
}

function StokTamamla(id) {
    var fatura = {
        Id: id,
        Status: 9
    };
    Put("Invoice/UpdateStatus", fatura, (data) => {
        StokUrunleriGetir();
        TumFaturalariGetir();
    });
}

function StokTamamlaOffer(id) {
    var teklif = {
        Id: id,
        Status: 9
    };
    Put("Offer/UpdateOfferState", teklif, (data) => {
        StokUrunleriGetir();
        StoktanKarsilanlar();
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
    Get(`Department/GetAll/`, (data) => {
        var getData = data;
        var ddlSirket = $("#departmanAzalt");
        $.each(getData, function (index, get) {
            ddlSirket.append($("<option>").val(get.id).text(get.name));
        });
    });

    $("#departmanAzalt, #girisSirketId").on("change", function () {
        var depId = $("#departmanAzalt").val();
        var girisSirketId = $("#girisSirketId").val();
        var ddlkullanici = $("#kullaniciAzalt");
        ddlkullanici.empty();
        if (depId !== "") {
            Get(`Employee/GetIsActiveByCompanyDepartment/${girisSirketId}/${depId}`, (data) => {
                if (data != "") {
                    var getData = data;
                    $.each(getData, function (index, get) {
                        ddlkullanici.append($("<option>").val(get.id).text(`${get.name} ${get.surname}`));
                    });
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
    StoktanKarsilanlar();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        StokUrunleriGetir();
        TumFaturalariGetir();
        StoktanKarsilanlar();
    });
});