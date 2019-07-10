/* Menu Reponsive*/
var menuResponsive = () => {
    let menu = document.getElementById('menu');

    if (menu.style.left == '0px') {
        menu.style.left = '-400px'
    } else {
        menu.style.left = '0'
    }
}


/* Preview image*/
var loadFile = () => {
    let previewImage = document.getElementById('previewImage')
    previewImage.src = URL.createObjectURL(event.target.files[0])

    let labelUploadImage = document.getElementById('labelUploadImage').style.display = 'none'

    let cancelUpload = document.getElementById('cancelUpload').style.display = 'block'
};

var cancelUpload = () => {
    let previewImage = document.getElementById('previewImage').src = ""

    let labelUploadImage = document.getElementById('labelUploadImage').style.display = 'block'

    let cancelUpload = document.getElementById('cancelUpload').style.display = 'none'
}