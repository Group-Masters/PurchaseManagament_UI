function Rapor() {
    var girisId = $("#sirket").val();
    var html = ``;
    Get(`Report/GetByCompany/${girisId}`, (data) => {
        /*var arr = data;*/
        var arr = data.sort((a, b) => b.requestId - a.requestId);
        html += `            <nav class="navbar bg-white mb-2">
              <button type="submit" class="btn btn-warning mr-3" title="PDF Oluştur" id="pdfOlustur" onclick="Pdf(${girisId})">
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
                 <tr style="background-color:#ffffff; color:#ffffff;">
                  <th scope="col" style="border:none;">·</th>
                  <th class="position-absolute top-0 end-0" scope="col" style="top:-14px !important;border:none;">
                  <span class="">
                   <button class="btn btn-primary" onclick='ModalDetay(${arr[i].requestId})' data-bs-toggle="modal" data-bs-target="#faturaFotoModal">Talep Detaylarını Görüntüle</button>
                  </span>
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th scope="row">Fatura Id'si :</th>
                  <td>${arr[i].invoiceId === null ? 'Fatura daha oluşmadı veya talep reddedildi.' : arr[i].supplyDate}</td>
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
                  <td>${arr[i].prices} / ${arr[i].prices_Try}</td>
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
        $("#divSirket").html(html);

        $("#ara").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#divSirket .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

function ModalDetay(id) {
    $("#detayModal").modal("show");
    html = ``;
    Get(`Report/GetByRequestID/${id}`, (data) => {
        /*var arr = data;*/
        html += `
            <table class="table bg-white text-black">
            <thead class="position-relative">
            <nav class="navbar text-light mb-3 bg-white shadow" style="border-radius: 15px !important;">
                <div class="container-fluid justify-content-center">
                    <div class="text-center text-black fs-2">TALEP DETAYLARI VE SÜRECİ</div>
                   
                </div>
            </nav>
                 
              </thead>
              <tbody class="bg-white">
                <div class="d-flex justify-content-end my-3 mr-3">
                   <button class="btn btn-warning" onclick="DetayPdf(${id})">PDF OLUŞTUR</button>
                </div>
                <tr>
                  <th scope="row">Şirket Adı / Departman Adı :</th>
                  <td>${data.companyName} -- ${data.departmentName}</td>
                </tr>
                 <tr>
                  <th scope="row">Talep Eden Kullanıcı :</th>
                  <td>${data.requestEmployee}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${data.product}</td>
                </tr>
                <tr>
                  <th scope="row">Alış Fiyatı:</th>
                  <td>${data.prices}</td>
                </tr>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${data.quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Açıklaması :</th>
                  <td>${data.requestDetails}</td>
                </tr>
                 <tr>
                  <th scope="row">Talep Onay Durumu :</th>
                     <td>
                        <span class="fw-bold"
                         style="color: ${data.status === 0 ? 'black' : data.status === 1 ? 'red' : data.status === 2 ? 'green' : data.status === 3 ? 'black' : data.status === 4 ? 'green' : data.status === 5 ? 'black' : data.status === 6 ? 'black' : 'blue'};">
                         ${data.status === 0 ? 'Beklemede' : data.status === 1 ? 'Reddedildi' : data.status === 2 ? 'Onaylandı' : data.status === 3 ? 'Yönetimde Bekliyor' : data.status === 4 ? 'Yönetimde Onaylandı' : data.status === 5 ? 'Yönetimde Reddedildi' : data.status === 6 ? 'Ürün Bekleniyor' : 'Talep İşlemi Tamamlandı'}
                     </span>
                    </td>
                </tr>
                <tr>
                  <th scope="row">Talep Tarihi :</th>
                  <td>${data.requestDate}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan veya Reddeden Yetkili:</th>
                  <td>${data.requestApproveBy}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Onaylanlanma veya Red Tarihi :</th>
                  <td>${data.requestApproveDate}</td>
                </tr>
                 <tr>
                  <th scope="row">Fatura Oluşma Tarihi :</th>
                  <td>${data.invoiceCreateDate}</td>
                </tr>
                <tr>
                  <th scope="row">Fatura No :</th>
                  <td>${data.uuid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <nav class="navbar text-light mb-3 bg-white shadow" style="border-radius: 15px !important;">
        <div class="container-fluid justify-content-center">
            <div class="text-center text-black fs-2">TALEP TEKLİFLERİ VE DETAYLARI (${data.offerCount})</div>
        </div>
    </nav>

    `;
        var arr = data.offers;
        for (var i = 0; i < arr.length; i++) {
            html += `<div class="secili accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header border border-black">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapse${numberToAlphabet(i)}"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            
          >
            ${i + 1} ${arr[i].supplier}
          </button>
        </h2>
        <div
          id="flush-collapse${numberToAlphabet(i)}"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionFlushExample"
        >
          <div class="accordion-body">

            <table class="table text-black">
              <tbody>
              <tr>
                  <th scope="row">Teklif Edilen Fiyat :</th>
                  <td>${arr[i].offerPrice}</td>
                </tr>
                <tr>
                  <th scope="row">Teklif Açıklaması :</th>
                  <td>${arr[i].offerDetail}</td>
                </tr>
                 <tr>
                  <th scope="row">Teklif Verilme Tarihi :</th>
                  <td>${arr[i].createDate}</td>
                </tr>
                <tr>
                  <th scope="row">Onaylayan veya Reddeden Yetkili :</th>
                  <td>${arr[i].approvingBy}</td>
                </tr>
                <tr>
                  <th scope="row">Teklif Onay Durumu :</th>
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
    </div>`
        }

        $("#divDetay").html(html);
    });
}

function numberToAlphabet(num) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (num >= 1 && num <= 26) {
        return alphabet[num - 1];
    }
    return null; // Eğer verilen numara 1-26 arasında değilse null dönebiliriz.
}


function Pdf(girisId) {
    var pdf = {
        Id: girisId
    }
    Post(`PDF/GenerateReportToPDFByCompany`, pdf, (data) => {

    });
}

function DetayPdf(id) {
    var pdf = {
        Id: id
    }
    Post(`PDF/GenerateReportToPDFByRequest`, pdf, (data) => {

    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    Rapor();
    TumSirketleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
    $("#sirket").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        Rapor();
    });
});