//function Getir() {
//    Get("Product/GetAll", (data) => {
//        var html = `<div class="container-fluid"><table id="liste" class="table table-hover shadow bg-light">` +
//            `<thead class="text-light bg-primary"><tr><th>Id</th><th>Urun Adı</th><th>Fiyatı</th><th></th></tr></thead>`;

//        var arr = data;

//        for (var i = 0; i < arr.length; i++) {
//            html += `<tr id="arama">`;
//            html += `<td>${arr[i].id}</td><td>${arr[i].ad}</td><td>${arr[i].fiyat}₺</td>`;
//            html += `<td><i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i><i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
//                "${arr[i].id}","${arr[i].ad}","${arr[i].fiyat}"
//            )'></i></td>`;
//            html += `</tr>`
//        }
//        html += `</table></div>`;

//        $("#divUrunler").html(html);

//        $(function () {
//            $("#ara").keyup(function () {
//                var deger = $(this).val().toLowerCase();
//                $("#liste #arama").filter(function () {
//                    $(this).toggle($(this).text().toLowerCase().indexOf(deger) > -1);
//                });
//            });
//        });
//    });
//}

function Getir() {
    Get("Product/GetAll", (data) => {
        var html = `<div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 ">`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<div class="col mb-2">
    <div class="card">
      <img src="https://resim.epey.com/886465/m_xiaomi-redmi-gaming-monitor-g24-1.jpg" class="card-img-top" alt="Hollywood Sign on The Hill"/>
      <div class="card-body ">
        <div class="d-flex justify-content-center">
            <h5 class="card-title fs-6">
                <i class="bi bi-trash text-danger px-2 py-2 mx-3 border border-danger " onclick='Sil(${arr[i].id})'></i>
            </h5>
            <h5 class="card-title fs-6">
                <i class="bi bi-pencil-square text-primary px-2 py-2 mx-3 border border-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].description}","${arr[i].measuringUnitId}"
            )'></i>
            </h5>
            <h5 class="card-title fs-6">
                <i class="bi bi-database-fill-slash text-warning px-2 py-2 mx-3 border border-primary" onclick='VeriTabaniSil(
                "${arr[i].id}","${arr[i].name}","${arr[i].description}","${arr[i].measuringUnitId}"
            )'></i>
            </h5>
        </div>
        <div class="d-flex justify-content-between">
            <h5 class="card-title fs-6">Ürün Adı:</h5>
            <h5 class="card-title fs-6">${arr[i].name}</h5>
        </div>
        <div class="d-flex justify-content-between">
            <h5 class="card-title fs-6">Ürün Açıklaması:</h5>
        <h5 class="card-title fs-6">${arr[i].description} </h5>
        </div>
         <div class="d-flex justify-content-between">
            <h5 class="card-title fs-6">Ürün Birimi:</h5>
        <h5 class="card-title fs-6">${arr[i].measuringName} </h5>
        </div>
      </div>
    </div>
  </div>`;
            
        }
        html += `</div>`;

        $("#divUrunler").html(html);

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

function Yeni() {
    $("#inputAd").val("");
    $("#inputAciklama").val("");
    $("#inputBirimAd").val("");
    $("#modal").modal("show");
}
function Kaydet() {
    var kaydet = {
        Name: $("#inputAd").val(),
        Description: $("#inputAciklama").val(),
        MeasuringUnitId: $("#inputBirimAd").val()
    };
    Post("Product/Create", kaydet, (data) => {
        Getir();
        $("#modal").modal("hide");
    });
}

function Duzenle(id, name, description, measuringUnitId) {
    $("#idG").val(id);
    $("#adG").val(name);
    $("#aciklamaG").val(description);
    $("#inputBirimAdG").val(measuringUnitId);
    $("#modal1").modal("show");
}

function Guncelle() {
    var guncelle = {
        Id: $("#idG").val(),
        Name: $("#adG").val(),
        Description: $("#aciklamaG").val(),
        MeasuringUnitId: $("#inputBirimAdG").val()
    };
    Put("Product/Update", guncelle, (data) => {
        Getir();
        $("#modal1").modal("hide");
    });
}

function VeriTabaniSil(id) {
    Put(`Product/Delete/${id}`, (data) => {
        Getir();
    });
    Getir();
}

function Sil(id) {
    Delete(`Product/DeletePermanent/${id}`, (data) => {
        Getir();
    });
}
function TumUrunBirimleriniGetir() {
    Get("MeasuringUnit/GetAll", (data) => {
        var getdata = data;
        var dropdown = $("#inputBirimAd");
        var dropdownG = $("#inputBirimAdG");
        $.each(getdata, function (index, urun) {
            dropdown.append($("<option>").val(urun.id).text(urun.name));
            dropdownG.append($("<option>").val(urun.id).text(urun.name));
        });
    });
}

$(document).ready(function () {
    Getir();
    TumUrunBirimleriniGetir();
});