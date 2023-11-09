function TeklifleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`Offer/GetByAproved/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light"  style="background-color:#9e9494;"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Tedarikci Adı</th><th>Fiyat Teklifi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].productName}</td><td>${arr[i].quantity}</td><td>${arr[i].supplierName}</td><td>${arr[i].offeredPrice} ${arr[i].currencyName} </td><td>${arr[i].requestEmployeeName} ${arr[i].requestEmployeeSurname}</td><td> <span style="color: ${arr[i].status === 3 ? 'black' : arr[i].status === 4 ? 'green' : 'red'};">
                         ${arr[i].status === 3 ? 'Beklemede' : arr[i].status === 4 ? 'Onaylandı' : 'Reddedildi'}
                     </span></td>`;
            html += `<td>
            <button class="btn btn-primary"  onclick='Duzenle("${arr[i].id}","${arr[i].productName}","${arr[i].quantity}","${arr[i].supplierName}","${arr[i].offeredPrice}","${arr[i].currencyName}","${arr[i].companyAddress}","${arr[i].supplierAddress}")'>Faturasını Oluştur</button>
            </td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divTeklifFatura").html(html);

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
    $("#staticBackdrop").modal("show");
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

function Kaydet() {
    var fatura = {
        OfferId: $("#id").val(),
        UUID: $("#uUID").val()
    };
    Post("Invoice/Create", fatura, (data) => {
        TumFaturalariGetir();
    });
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