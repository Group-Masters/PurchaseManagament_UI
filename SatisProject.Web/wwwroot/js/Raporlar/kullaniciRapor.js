function KullaniciRapor() {
    var giriskullaniciId = $("#kullaniciAdmin").val();
    var html = ``;
    Get(`Report/GetByEmployee/${giriskullaniciId}`, (data) => {
        /*var arr = data;*/

        var arr = data.sort((a, b) => b.id - a.id);

        html += `            <nav class="navbar bg-white mb-2">
              <button type="submit" class="btn btn-warning mr-3" title="PDF Oluştur" id="pdfOlustur" onclick="Pdf(${giriskullaniciId})">
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
            data-bs-target="#flush-collapse${arr[i].requestId}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${i + 1} ${arr[i].requestby}
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
                  <th scope="row">Fatura Tarihi :</th>
                  <td>${arr[i].supplyDate === null ? 'Fatura  daha oluşmadı veya talep reddedildi.' : arr[i].supplyDate}</td>
                </tr>
                 <tr>
                  <th scope="row">Talep Onay Durumu :</th>
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
        $("#divKullanici").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divKullanici .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}


function Pdf(giriskullaniciId) {
    var pdf ={
        Id: giriskullaniciId
    }
    Post(`PDF/GenerateReportToPDFByEmploye`, pdf,(data) => {

    });
}

function SirketeGoreKullaniciGetirAdmin() {
    $("#girisSirketId").change(function () {
        var sirketId = $(this).val();
        var ddlKullanici = $("#kullaniciAdmin");
        ddlKullanici.empty();
        if (sirketId !== "") {
            Get(`Employee/GetByCompany/${sirketId}`, (data) => {
                if (data != "") {
                    var gets = data;
                    $.each(gets, function (index, get) {
                        ddlKullanici.append($("<option >").val(get.id).text(`${get.name} ${get.surname}`));
                    });
                }
                else {
                    alert("Kullanici yok");
                }

            });
        }
    });
}

var giriskullaniciSirket = $("#kullaniciSirketIdGetir").val();
function SirketeGoreKullaniciGetirYonetim() {
    Get(`Employee/GetByCompany/${giriskullaniciSirket}`, (data) => {
        var getData = data;
        var dropdown = $("#kullaniciAdmin");
        $.each(getData, function (index, get) {
            dropdown.append($("<option>").val(get.id).text(`${get.name} ${get.surname}`));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    KullaniciRapor();
    SirketeGoreKullaniciGetirAdmin();
    SirketeGoreKullaniciGetirYonetim();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullaniciRapor();
    });
    $("#kullaniciAdmin").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        KullaniciRapor();
    });
});