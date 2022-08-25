function showUpload(){
    const preview = document.getElementById('preview');
    const uploadedPic = document.getElementById('urlImagen').files[0];
    const plusSign = document.getElementById('plus');
    const reader = new FileReader();

    reader.addEventListener('load', function(){
        preview.src=reader.result;
        preview.classList.add="preview";
        plusSign.remove()
        
    }, false);
        
    if (uploadedPic){
        reader.readAsDataURL(uploadedPic);
    }
    
}