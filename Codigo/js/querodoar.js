        function previewImage(event) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = '';
            const file = event.target.files[0];
            if (file) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);
                preview.appendChild(img);
            } else {
                preview.innerHTML = '<span style="color:#aaa;">Foto do Pet</span>';
            }
        }