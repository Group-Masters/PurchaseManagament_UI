function OnaylanmisTalepleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Request/GetApprovedtByCompany/${girisSirketId}`, (data) => {
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
            ${arr[i].id} ${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}
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
                  <th scope="col">·</th>
                  <th scope="col">
                  <span class="position-absolute top-0 end-0">
                  <button class="btn btn-link"  onclick='IdVer(
                        ${arr[i].id}
                   )'><a class="btn btn-light"> Teklif Gir</a></button>
                   <button class="btn btn-link"  onclick='TalepTeklifleriniGetir(
                        ${arr[i].id}
                   )'><a class="btn btn-light"> Teklifleri Gör</a></button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].productName} / ${arr[i].measuringUnitName}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan Ad-Soyad :</th>
                  <td>${arr[i].approvingEmployeeName} ${arr[i].approvingEmployeeSurname}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divTeklif").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divTeklif .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}


function Kaydet() {
    var teklif = {
        Details: $("#aciklama").val(),
        OfferedPrice: $("#fiyat").val(),
        CurrencyId: $("#paraBirim").val(),
        RequestId: $("#gizliId").val(),
        SupplierId: $("#tad").val()
    };
    Post("Offer/Create", teklif, (data) => {
        $("#staticBackdrop").modal("hide");
    });
}


function IdVer(id) {
    $("#gizliId").val(id);
    $("#tad").val("");
    $("#fiyat").val("");
    $("#aciklama").val("");
    $("#paraBirim").val("");
    $("#staticBackdrop").modal("show");

}

function TalepTeklifleriniGetir(gizliId) {
    $("#staticBackdrop1").modal("show");
    Get(`Offer/GetByRequestId/${gizliId}`, (data) => {
        var html = `<table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col"></th>
                <th scope="col">Tedarikçi Adı</th>
                <th scope="col">Fiyat Teklifi</th>
                <th scope="col">Açıklama</th>
                <th scope="col">Onay Durumu</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < (arr.length <= 10 ? arr.length : 10); i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].supplierName}</td>
                        <td>${arr[i].offeredPrice}
                            <small class="d-block"> ${arr[i].currencyName}</small>
                        </td>                       
                        <td>
                            ${arr[i].details == null ? 'Açıklama Yok' : arr[i].details}
                        </td>
                        <td> <span style="color: ${arr[i].status === 0 ? 'black' : arr[i].status === 3 ? 'green' : arr[i].status === 1 ? 'red' : 'blue'};">
                         ${arr[i].status === 0 ? 'Beklemede' : arr[i].status === 3 ? 'Onaya Gönderildi' : arr[i].status === 1 ? 'Reddedildi' : 'Tamamlandı'}
                        </span></td>`

            if (arr[i].status === 0) {
                html += `<td><button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
                <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].details}","${arr[i].offeredPrice}","${arr[i].currencyId}","${arr[i].supplierId}"
            )'>Düzenle</button>`;
            }
            html += `

            <button class="btn btn-success" onclick='UstBirim(
                 "${arr[i].id}","${arr[i].status}","${arr[i].approvingEmployeeId}","${gizliId}")'>Onayla</button>


            <button class="btn btn-danger" onclick='Reddet(
                 "${arr[i].id}","${arr[i].status}","${arr[i].approvingEmployeeId}","${gizliId}")'>Reddet</button>
            </td>
            `;
            `</tr>`;
        }
        html += `</tbody></table>`;

        $("#divTalepTeklif").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divTalepTeklif .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function Sil(id) {
    Delete(`Offer/DeletePermanent/${id}`, (data) => {
        OnaylanmisTalepleriGetir(); //Kalıcı silme işlemi
    });
}

function Duzenle(id, details, offeredPrice, currencyId,supplierId) {
    $("#idG").val(id);
    $("#aciklamaG").val(details);
    $("#fiyatG").val(offeredPrice);
    $("#paraBirimG").val(currencyId);
    $("#tadG").val(supplierId);
    $("#staticBackdrop1").modal("hide");
    $("#staticBackdrop2").modal("show");
}

function Guncelle() {
    var teklif = {
        Id: $("#idG").val(),
        Details: $("#aciklamaG").val(),
        OfferedPrice: $("#fiyatG").val(),
        CurrencyId: $("#paraBirimG").val(),
        SupplierId: $("#tadG").val()
    };
    Put("Offer/Update", teklif, (data) => {
        $("#staticBackdrop2").modal("hide");
    });
}


function Reddet(id, gizliId) {
    var teklif = {
        Id: id,
        Status: 1//Reddetme

    };
    Put("Offer/UpdateOfferState", teklif, (data) => {
        OnaylanmisTalepleriGetir();
        TalepTeklifleriniGetir(gizliId);
    });
}

function UstBirim(id, gizliId) {
    var teklif = {
        Id: id,
        Status: 3//Yönetime Gönderme / Yönetim Bekleme

    };
    Put("Offer/UpdateOfferState", teklif, (data) => {
        OnaylanmisTalepleriGetir();
        TalepTeklifleriniGetir(gizliId);
        $("#staticBackdrop1").modal("hide");

    });
}

function TumParaBirimleriGetir() {
    Get("Currency/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#paraBirim");
        var dropdownG = $("#paraBirimG");
        $.each(getdata, function (index, para) {
            dropdown.append($("<option>").val(para.id).text(para.name));
            dropdownG.append($("<option>").val(para.id).text(para.name));
        });
    });
}

function TumTedarikcileriGetir() {
    Get("Supplier/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#tad");
        var dropdownG = $("#tadG");
        $.each(getdata, function (index, sirket) {
            dropdown.append($("<option>").val(sirket.id).text(sirket.name));
            dropdownG.append($("<option>").val(sirket.id).text(sirket.name));
        });
    });
}


$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    OnaylanmisTalepleriGetir();
    TumParaBirimleriGetir();
    TumTedarikcileriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        OnaylanmisTalepleriGetir();
    });
});