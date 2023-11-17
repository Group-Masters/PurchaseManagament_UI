function TeklifleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`Offer/GetByAproved/${girisSirketId}`, (data) => {
        var html = `<div class="mx-4"><table class="table custom-table" style="border-collapse: separate;border-spacing: 0 5px;">
        <thead>
            <tr class="text-white" style="background-color:#9e9494;">
                <th scope="col"></th>
                <th scope="col">Ürün Ad</th>
                <th scope="col">Adet</th>
                <th scope="col">Tedarikçi Adı</th>
                <th scope="col">Fiyat Teklifi</th>
                <th scope="col">Talep Eden Kullanıcı</th>
                <th scope="col">İşlemler</th>
            </tr>
        </thead><tbody>`;

        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr scope="row" class="arama">
                        <td>${i + 1}</td>
                        <td>${arr[i].productName}</td>
                        <td>${arr[i].quantity}</td>
                        <td>${arr[i].supplierName}</td>
                        <td>
                            ${arr[i].offeredPrice}
                             <small class="d-block">${arr[i].currencyName}</small>
                        </td>
                        <td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td>`

            html += `
               <td>
            <button class="btn btn-primary"  onclick='Duzenle("${arr[i].id}","${arr[i].productName}","${arr[i].quantity}","${arr[i].supplierName}","${arr[i].offeredPrice}","${arr[i].currencyName}","${arr[i].companyAddress}","${arr[i].supplierAddress}")'>Faturasını Oluştur</button>
            </td>
                `;
            `</tr>`;
        }
        html += `</tbody></table></div>`;

        $("#divTeklifFatura").html(html);

        $(function () {
            $("#ara").keyup(function () {
                var deger = $(this).val().toLowerCase();
                $("#divTeklifFatura .arama").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
                });
            });
        });
    });
}

function Duzenle(id, productName, quantity, supplierName, offeredPrice, currencyName, companyAddress, supplierAddress) {
    $("#id").val(id);
    $("#urunAd").val(productName);
    $("#adet").val(quantity);
    $("#tedarikciAd").val(supplierName);
    $("#fiyat").val(offeredPrice);
    $("#birim").val(currencyName);
    $("#sirketAdres").val(companyAddress);
    $("#tedarikciAdres").val(supplierAddress);
    $("#uUID").val("");
    $("#imageSrc").val("");
    $("#staticBackdrop").modal("show");
}



function TumFaturalariGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    var modalHtml = `
            <div class="modal fade" id="faturaFotoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal Başlık</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
                  </div>
                  <div class="modal-body">
                    <img src="" class="card-img-top" id="modalImage" />
                  </div>
                </div>
              </div>
            </div>
            `;
    $('body').append(modalHtml);
    Get(`Invoice/GetInvoicesByCompany/${girisSirketId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < (arr.length <= 10 ? arr.length : 10); i++) {
            html += `
            
            <div class="secili accordion accordion-flush" id="accordionFlushExample">
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
            ${i + 1} ${arr[i].supplierName}
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
                   <button class="btn btn-light" onclick='modalIcerikAyarla(${JSON.stringify(arr[i])})' data-bs-toggle="modal" data-bs-target="#faturaFotoModal">Tedarikçi Faturasını Görüntüle</button>
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
    </div>
    
    
    `;

        }
        $("#divFatura").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divFatura .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function modalIcerikAyarla(data) {
    var imageUrl = data.imageSrc === null ? 'https://www.birincifiltre.com.tr/image/cache/placeholder-250x250.webp' : '/img/faturaFoto/' + data.imageSrc;
    $('#modalImage').attr('src', imageUrl);
}


function isValidGUID(guid) {
    var guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidPattern.test(guid);
}

function Kaydet() {
    var myGUID = $("#uUID").val();
    if (isValidGUID(myGUID)) {
        var fatura = {
            OfferId: $("#id").val(),
            ImageSrc: GetFileNameFromPath($("#imageSrc").val()), 
            UUID: myGUID
        };
        Post("Invoice/Create", fatura, (data) => {
            TumFaturalariGetir();
            TeklifleriGetir();
            $("#staticBackdrop").modal("hide");
        });
    } else {
        Swal.fire({
            position: 'top-mid',
            icon: 'error',
            title: "Geçerli Bir Guid Giriniz",
            showConfirmButton: false,
            timer: 1300
        });
    }
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    TeklifleriGetir();
    TumFaturalariGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        TeklifleriGetir();
        TumFaturalariGetir();
    });
});