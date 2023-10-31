function TeklifleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`MuhasebeFatura/FaturasıOlusturulacakTeklifler/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Tedarikci Adı</th><th>Fiyat Teklifi</th><th>Talep Eden Kullanıcı</th><th>Onay Durumu</th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);

        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].urunAd}</td><td>${arr[i].adet}</td><td>${arr[i].tedarikciAd}</td><td>${arr[i].fiyatTeklif}₺ </td><td>${arr[i].kullaniciAd} ${arr[i].kullaniciSoyad}</td><td> <span style="color: ${arr[i].onayDurum === null ? 'gray' : arr[i].onayDurum ? 'green' : 'red'};">
                         ${arr[i].onayDurum === null ? 'Beklemede' : arr[i].onayDurum ? 'Onaylandı' : 'Reddedildi'}
                     </span></td>`;
            html += `<td>
            <i class="bi bi-receipt text-primary px-2 py-2 mx-3 border border-primary" title="Fatura Oluştur" onclick='Kaydet("${arr[i].id}","${arr[i].fiyatTeklif}")'></i>
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
let selectedId = 0;
function Kaydet(id,fiyatTeklif ) {
    var fatura = {
        Id: 0,
        OnaylananTeklifId: id,
        Tutar: fiyatTeklif
    };
    Post("MuhasebeFatura/Kaydet", fatura, (data) => {
        TumFaturalariGetir();
    });
}

function TumFaturalariGetir() {
    var girisSirketId = $("#girisSirketId").val();
    var html = ``;
    Get(`MuhasebeFatura/TumFaturalar/${girisSirketId}`, (data) => {
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
            ${arr[i].id} ${arr[i].kullaniciAd} ${arr[i].kullaniciSoyad}
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
                  <th scope="row">Tedarikçi Adı :</th>
                  <td>${arr[i].tedarikciAd}</td>
                </tr>
                <tr>
                  <th scope="row">Ürün Adı :</th>
                  <td>${arr[i].urunAd}</td>
                </tr>
                <tr>
                  <th scope="row">Adet Bilgisi :</th>
                  <td>${arr[i].adet}</td>
                </tr>
                <tr>
                  <th scope="row">Fiyat Teklifi :</th>
                  <td>${arr[i].tutar} ₺</td>
                </tr>
                <tr>
                  <th scope="row">Talep Eden Birim :</th>
                  <td>${arr[i].birimAd}</td>
                </tr>
                <tr>
                  <th scope="row">Talep Tarihi :</th>
                  <td>${arr[i].talepTarih}</td>
                </tr>
                <tr>
                  <th scope="row">Faturalandırma Tarihi :</th>
                  <td>${arr[i].tarih}</td>
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