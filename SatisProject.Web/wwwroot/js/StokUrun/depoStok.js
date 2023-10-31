function StokUrunleriGetir() {
    var girisSirketId = $("#girisSirketId").val();
    Get(`DepoStok/StokVerileriBySirketId/${girisSirketId}`, (data) => {
        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Ürün Adı</th><th>Adet</th><th>Açıklama</th><th></th><th></th></tr></thead>`;

        /*var arr = data;*/
        var arr = data.sort((a, b) => b.id - a.id);
        for (var i = 0; i < arr.length; i++) {
            html += `<tr id="arama">`;
            html += `<td>${arr[i].id}</td><td>${arr[i].urunAd}</td><td>${arr[i].adet}</td><td>${arr[i].aciklama}</td>`;
            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].urunId}","${arr[i].adet}","${arr[i].sirketId}","${arr[i].aciklama}"
            )'></i></td>`;
            html += `</tr>`
        }
        html += `</table></div>`;

        $("#divDepo").html(html);

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
            $("#divFatura .accordion").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });
}

let selectedRolId = 0;

function Yeni() {
    selectedRolId = 0;
    $("#adet").val("");
    $("#urunAd").val("")
    $("#aciklama").val("")
    $("#staticBackdrop").modal("show");
}
function Kaydet() {
    var stok = {
        Id: selectedRolId,
        UrunId: $("#urunAd").val(),
        Adet: $("#adet").val(),
        SirketId: $("#gizliSirketId").val(),
        Aciklama: $("#aciklama").val()
    };
    Post("DepoStok/Kaydet", stok, (data) => {
        StokUrunleriGetir();
        $("#staticBackdrop").modal("hide");
    });
}


function Sil(id) {
    Delete(`DepoStok/Sil?id=${id}`, (data) => {
        StokUrunleriGetir();
    });
}

function Duzenle(id, urunId,adet,sirketId,aciklama) {
    selectedRolId = id;
    $("#urunAd").val(urunId);
    $("#adet").val(adet);
    $("#aciklama").val(aciklama);
    $("#gizliSirketId").val(sirketId);
    $("#staticBackdrop").modal("show");
}

function TumUrunleriGetir() {
    Get("Urun/TumUrunler", (data) => {
        var urundata = data;
        var dropdown = $("#urunAd");
        $.each(urundata, function (index, urun) {
            dropdown.append($("<option>").val(urun.id).text(urun.ad));
        });
    });
}

$(document).ready(function () {
    // Sayfa yüklendiğinde mevcut şirket verilerini getir
    TumSirketleriGetir();
    StokUrunleriGetir();
    TumFaturalariGetir();
    TumUrunleriGetir();
    // Select değişiklik olayını dinle
    $("#girisSirketId").on("change", function () {
        // Yeni şirket seçildiğinde verileri getir
        StokUrunleriGetir();
        TumFaturalariGetir();
    });
});