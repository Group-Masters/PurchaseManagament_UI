function KullaniciRapor() {
    var giriskullaniciId = $("#kullanici").val();
    var html = ``;
    Get(`Report/GetByEmployee/${giriskullaniciId}`, (data) => {
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
            data-bs-target="#flush-collapse${arr[i].requestId}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${arr[i].requestId} ${arr[i].requestby}
          </button>
        </h2>
        <div
          id="flush-collapse${arr[i].requestId}"
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
                  <th scope="row">Fatura Id'si :</th>
                  <td>${arr[i].invoiceId}</td>
                </tr>
                <tr>
                  <th scope="row">Şirket-Departman Adı :</th>
                  <td>${arr[i].companydepartment}</td>
                </tr>
                 <tr>
                  <th scope="row">Tedarikçi Adı :</th>
                  <td>${arr[i].supplier}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Edilen Ürün Adı :</th>
                  <td>${arr[i].product}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adeti :</th>
                  <td>${arr[i].quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Ödenen Fiyat:</th>
                  <td>${arr[i].prices}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan Yetkili :</th>
                  <td>${arr[i].approvedEmployee}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Oluşma Tarihi:</th>
                  <td>${arr[i].createDate}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Onaylanma Tarihi :</th>
                  <td>${arr[i].supplyDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

        }
        $("#divKullanici").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullanici .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}


$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    KullaniciRapor();
    KullanicilariGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullaniciRapor();
    });
    $("#kullanici").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullaniciRapor();
    });
});