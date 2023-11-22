function Getir() {
    Get("Product/GetAll", (data) => {
        var html = `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 ">`;

        var arr = data;

        for (var i = 0; i < arr.length; i++) {
            html += `<div class="col mb-2" id="arama">
    <div class="card" id="cardDark">
    <div class="p-3">
    <button class="btn btn-secondary position-absolute top-0 end-0 m-2" onclick="YeniFoto(${arr[i].id})"><i class="bi bi-camera"></i></button>
     <img src="${arr[i].imgProduct === null ? 'https://www.birincifiltre.com.tr/image/cache/placeholder-250x250.webp' : '/img/urunfoto/' + arr[i].imgProduct}" class="card-img-top"/>
    </div>
     
      <div class="card-body ">
        <div class="d-flex justify-content-center gap-2">
            <h5 class="card-title fs-6">
                <button class="btn btn-danger" onclick='Sil(${arr[i].id})'>Sil</button>
            </h5>
            <h5 class="card-title fs-6">
                <button class="btn btn-primary" onclick='Duzenle(
                "${arr[i].id}","${arr[i].name}","${arr[i].description}","${arr[i].measuringUnitId}"
            )'>Düzenle</button>
            </h5>
            <h5 class="card-title fs-6" title="Veri tabanına Taşıma İşlemi">
                 <button class="btn btn-warning" onclick='VeriTabaniSil(
                "${arr[i].id}","${arr[i].name}","${arr[i].description}","${arr[i].measuringUnitId}"
            )'>VTT</button>
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
                $("#divUrunler #arama").filter(function () {
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
    Put(`Product/Delete/${id}`, id, (data) => {
        Getir();
    });
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


function YeniFoto(id) {
    $("#urunFoto").val("");
    $("#productId").val(id);
/*    $("#imageData").val("");*/
    $("#modalFoto").modal("show");
}

//function ReadData(input) {
//    if (input.files && input.files[0]) {
//        let fs = new FileReader();
//        fs.onload = function (e) {
//            let arrayBuffer = e.target.result;
//            let uintArray = new Uint8Array(arrayBuffer);
//            let dataArray = Array.from(uintArray);

//            let dataString = JSON.stringify(dataArray);

//            $('#imageData').val(dataString);
//        };
//        fs.readAsArrayBuffer(input.files[0]);
//    }
//}

$("#urunFoto").change(function () {
    ReadData(this);
});

function KaydetFoto() {
    var kaydet = {
        ProductId: $("#productId").val(),
        ImageSrc: GetFileNameFromPath($("#urunFoto").val()),
/*        ImageData : asfasfa ? ""*/
    };
    Post("ImgProduct/createProduct", kaydet, (data) => {
        Getir();
        $("#modalFoto").modal("hide");
    });
}

$(document).ready(function () {
    Getir();
    TumUrunBirimleriniGetir();
});
