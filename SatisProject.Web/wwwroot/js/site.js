﻿var BASE_API_URI = "https://localhost:7064";

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
                Swal.fire({
                    position: 'top-mid',
                    icon: 'error',
                    title: "İşlem Başarısız",
                    text: errorString,
                    showConfirmButton: false,
                    timer: 2000
                });
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
                            position: 'top-mid',
                            icon: 'success',
                            title: "İşlem Başarılı",
                            showConfirmButton: false,
                            timer: 1300
                        });
                        /*setTimeout(function () { window.location.reload() }, 1300);*/
                        if (success) {
                            success(response);
                        }

                    }
                    else {
                        Swal.fire({
                            position: 'top-mid',
                            icon: 'error',
                            title: "İşlem Başarısız",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage = JSON.parse(xhr.responseText);
                    if (errorMessage && errorMessage.errors) {
                        var errorString = errorMessage.errors.join(", ");
                        Swal.fire({
                            position: 'top-mid',
                            icon: 'error',
                            title: "İşlem Başarısız",
                            text: errorString,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            });
        }
    }); 
}



function Delete(action, success, ask = true) {
    var confirmed = true;
    if (ask) {
        
        Swal.fire({
            title: 'Emin misiniz?',
            text: 'Değişiklikleri kaydetmek istediğinizden emin misiniz?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Evet, Kaydet',
            cancelButtonText: 'Hayır, İptal',
        }).then((result) => {
            if (result.isConfirmed) {
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
                            Swal.fire({
                                position: 'top-mid',
                                icon: 'success',
                                title: "İşlem Başarılı",
                                showConfirmButton: false,
                                timer: 1300
                            });

                            // Call the success callback if provided
                            if (success) {
                                success(response);
                            }

                            TalepleriKullaniciyaGoreGetir();
                        }
                        else {
                            Swal.fire({
                                position: 'top-mid',
                                icon: 'error',
                                title: "İşlem Başarısız",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        var errorMessage = JSON.parse(xhr.responseText);
                        if (errorMessage && errorMessage.errors) {
                            var errorString = errorMessage.errors.join(", ");
                            Swal.fire({
                                position: 'top-mid',
                                icon: 'error',
                                title: "İşlem Başarısız",
                                text: errorString,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        } else {
                            alert("An unknown error occurred.");
                        }
                    }
                });
            }
        }
        );
}
    
}

function Put(action, data, success, ask = true) {
    var confirmed = true;
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
                        Swal.fire({
                            position: 'top-mid',
                            icon: 'success',
                            title: "İşlem Başarılı",
                            showConfirmButton: false,
                            timer: 1300
                        });

                        // Call the success callback if provided
                        if (success) {
                            success(response);
                        }
                    }
                    else {
                        Swal.fire({
                            position: 'top-mid',
                            icon: 'error',
                            title: "İşlem Başarısız",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                    
                },
                error: function (xhr, status, error) {
                    var errorMessage = JSON.parse(xhr.responseText);
                    if (errorMessage && errorMessage.errors) {
                        var errorString = errorMessage.errors.join(", ");
                        Swal.fire({
                            position: 'top-mid',
                            icon: 'error',
                            title: "İşlem Başarısız",
                            text: errorString,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            });
        }
    });
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

function GetFileNameFromPath(filePath) {
    var startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
    var fileName = filePath.substring(startIndex);
    if (fileName.indexOf('\\') === 0 || fileName.indexOf('/') === 0) {
        fileName = fileName.substring(1);
    }
    return fileName;
}

function FormatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function TokenReset(){
    var TOKEN = "";
}
