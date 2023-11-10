
var BASE_API_URI = "https://localhost:7064";

function Get(action, item) {
    $.ajax({
        type: "GET",
        url: `${BASE_API_URI}/${action}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.success) {
                item(response.data);

            }
        },

        error: function (xhr, status, error) {
            var errorMessage = JSON.parse(xhr.responseText);
            if (errorMessage && errorMessage.errors) {
                var errorString = errorMessage.errors.join(", ");
                alert(errorString);
            } else {
                alert("An unknown error occurred.");
            }
        }
    });
}

function Post(action, data, success, ask = true) {
    var confirmed = true;
    // SweetAlert ile bir onay iletişim kutusu göster
    Swal.fire({
        title: 'Emin misiniz?',
        text: 'Değişiklikleri kaydetmek istediğinizden emin misiniz?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Evet, Kaydet',
        cancelButtonText: 'Hayır, İptal',
    }).then((result) => {
        // Kullanıcı Evet'i seçerse
        if (result.isConfirmed) {
            // Burada kaydetme işlemini gerçekleştirebilirsiniz
            $.ajax({
                type: "POST",
                url: `${BASE_API_URI}/${action}`,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: "İşlem Başarılı",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                    else {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'danger',
                            title: "İşlem Başarısız",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                }
            });
        }
    }); // This is where the missing closing parenthesis should be
}



    function Delete(action, success, ask = true) {
        var confirmed = true;
        if (ask) {
            confirmed = confirm("Kaydı silmek istediğinizden emin misiniz?");
        }
        if (confirmed) {
            $.ajax({
                type: "DELETE",
                url: `${BASE_API_URI}/${action}`,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    if (response.success) {
                        success(response.data);
                    }
                    else {
                        alert(response.message);
                    }
                },
                //error: function (XMLHttpRequest, textStatus, errorThrown) {
                //    alert(XMLHttpRequest + "-" + textStatus + "-" + errorThrown);
                //}
                error: function (xhr, status, error) {
                    var errorMessage = JSON.parse(xhr.responseText);
                    if (errorMessage && errorMessage.errors) {
                        var errorString = errorMessage.errors.join(", ");
                        alert(errorString);
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            });
        }
    }

    function Put(action, data, success, ask = true) {
        var confirmed = true;
        if (ask) {
            confirmed = confirm("Kaydı güncellemek istediğinizden emin misiniz?");
        }
        if (confirmed) {
            $.ajax({
                type: "PUT",
                url: `${BASE_API_URI}/${action}`,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.success) {
                        success(response.data);
                    }
                    else {
                        alert(response.message);
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage = JSON.parse(xhr.responseText);
                    if (errorMessage && errorMessage.errors) {
                        var errorString = errorMessage.errors.join(", ");
                        alert(errorString);
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            });
        }
    }



    var girisSirketId = $("#girisSirketId").val();
    var girisKullaniciId = $("#kullanici").val();
    function TumSirketleriGetir() {
        Get("Company/GetAll", (data) => {
            var sirketdata = data;
            var dropdown = $("#girisSirketId");
            var dropdownRapor = $("#sirket");
            $.each(sirketdata, function (index, sirket) {
                dropdown.append($("<option>").val(sirket.id).text(sirket.name));
                dropdownRapor.append($("<option>").val(sirket.id).text(sirket.name));
            });
        });
    }

    function KullanicilariGetir() {
        Get("Employee/GetAll", (data) => {
            var getdata = data;
            var dropdown = $("#kullanici");
            $.each(getdata, function (index, get) {
                dropdown.append($("<option>").val(get.id).text(`${get.name} ${get.surname}`));
            });
        });
    }

    function DepartmanlariGetir() {
        Get("Department/GetAll", (data) => {
            var getdata = data;
            var dropdown = $("#birim");
            $.each(getdata, function (index, get) {
                dropdown.append($("<option>").val(get.id).text(`${get.name}`));
            });
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

    function UrunleriGetir() {
        Get("Product/GetAll", (data) => {
            var getdata = data;
            var dropdown = $("#urun");
            $.each(getdata, function (index, get) {
                dropdown.append($("<option>").val(get.id).text(`${get.name} ${get.measuringName}`));
            });
        });
    }

