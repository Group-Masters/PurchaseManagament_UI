function Rapor() {
    var girisId = $("#tedarikci").val();
    var sirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`Report/GetSupplierById/${sirketId}/${girisId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        html += `            <nav class="navbar bg-white mb-2">
              <button type="submit" class="btn btn-warning mr-3" title="PDF Oluştur" id="pdfOlustur" onclick="Pdf(${sirketId},${girisId})">
                    PDF Oluştur
                    <i class="bi bi-receipt text-light"></i>
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
                 <td>${arr[i].prices} / ${arr[i].prices_Try}</td>
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
                  <td>
                     <span class="fw-bold"
                         style="color: ${arr[i].status === 0 ? 'black' : arr[i].status === 1 ? 'red' : arr[i].status === 2 ? 'green' : arr[i].status === 3 ? 'black' : arr[i].status === 4 ? 'green' : arr[i].status === 5 ? 'black' : arr[i].status === 6 ? 'black' : 'blue'};">
                         ${arr[i].status === 0 ? 'Beklemede' : arr[i].status === 1 ? 'Reddedildi' : arr[i].status === 2 ? 'Onaylandı' : arr[i].status === 3 ? 'Yönetimde Bekliyor' : arr[i].status === 4 ? 'Yönetimde Onaylandı' : arr[i].status === 5 ? 'Yönetimde Reddedildi' : arr[i].status === 6 ? 'Ürün Bekleniyor' : 'Talep İşlemi Tamamlandı'}
                     </span>
                  </td>
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

function Pdf(sirketId,girisId) {
    var pdf = {
        CompanyId: sirketId,
        SupplierId: girisId

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
    TumSirketleriGetir();
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