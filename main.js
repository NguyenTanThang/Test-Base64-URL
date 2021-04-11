function getBase64(file, onLoadCallback) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {
        type: mime
    });
}

const fileInput = document.querySelector("#file_input");
const fileReviewer = document.querySelector("#file-reviewer");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const base64Promise = getBase64(file);
    base64Promise.then(function(result) {
        const base64 = result;
        console.log(base64);
        const newFile = dataURLtoFile(base64, file.name);
        console.log(newFile);
        //fileReviewer.src = "http://view.officeapps.live.com/op/view.aspx?src=" + URL.createObjectURL(newFile);
        fileReviewer.src = `https://docs.google.com/viewer?url=${URL.createObjectURL(newFile)}&embedded=true`;
        //fileReviewer.src = `https://docs.google.com/viewer?url=${URL.createObjectURL(newFile)}&embedded=true`;
        //fileReviewer.src = `https://docs.google.com/a/viewer?url=${URL.createObjectURL(newFile)}`;
        
        //URL.revokeObjectURL(url);
    });
})