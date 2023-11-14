function Rapor() {
    var girisId = $("#tedarikci").val();
    var html = ``;
    Get(`Report/GetSupplierById/${girisId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        html += `            <nav class="navbar bg-white mb-2">
              <button type="submit" class="btn btn-warning mr-3" title="PDF Oluştur" id="pdfOlustur" onclick="Pdf(${girisId})">
                    PDF Oluştur
                    <i class="bi bi-receipt text-black"></i>
              </button>
            </nav>`;
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header border border-black">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse${arr[i].offerId}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${i + 1} ${arr[i].supplierName}
          </button>
        </h2>
        <div
          id="flush-collapse${arr[i].offerId}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">

            <table class="table">
              <thead class="position-relative">
                 <tr  style="background-color:#9e9494; color:#9e9494;">
                  <th scope="col" style="border:none;">·</th>
                  <th scope="col" style="border:none;">·</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th scope="row">Teklif Id'si :</th>
                  <td>${arr[i].offerId}</td>
                </tr>
                <tr>
                  <th scope="row">Teklif Verilen Ürün Adı :</th>
                  <td>${arr[i].product}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adeti :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Ödenen Fiyat:</th>
                  <td>${arr[i].price}</td>
                </tr>
                <tr>
                  <th scope="row">Teklif Oluşma Tarihi:</th>
                  <td>${arr[i].createDate}</td>
                </tr>
                <tr>
                  <th scope="row">Fatura Tarihi :</th>
                  <td>${arr[i].detail === null ? 'Fatura  daha oluşmadı veya talep reddedildi.' : arr[i].detail}</td>
                </tr>
                <tr>
                  <th scope="row">Teklif İşlem Durumu:</th>
                  <td>${arr[i].status === 0 ? 'Beklemede' : arr[i].status === 1 ? 'Birim Müdürü Tarafından Reddedildi' : arr[i].status === 2 ? 'Birim Müdürü Tarafından Onaylandı' : arr[i].status === 3 ? 'Yönetimde Bekliyor'
                : arr[i].status === 4 ? 'Yöneti Tarafından Onaylandı' : arr[i].status === 5 ? 'Yönetim Tarafından Reddedildi' : arr[i].status === 6 ? 'Ürün Bekleniyor' : 'Tamamlandı'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divTedarikci").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divBirim .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function Pdf(girisId) {
    var pdf = {
        Id: girisId
    }
    Post(`PDF/GenerateReportToPDFBySupplier`, pdf, (data) => {

    });
}
function TedarikcileriGetir() {
    Get("Supplier/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#tedarikci");
        $.each(getdata, function (index, get) {
            dropdown.append($("<option>").val(get.id).text(`${get.name}`));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    Rapor();
    TedarikcileriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
    $("#tedarikci").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
});