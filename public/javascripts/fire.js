const fileInput = document.getElementById('file-input');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    
    reader.onload = async (event) => {
      const result = event.target.result;
      const response = await fetch('/upload', {
        method: 'POST',
        body: JSON.stringify({ image: result }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('Imagen subida correctamente');
      } else {
        console.log('Error al subir la imagen');
      }
    };
  });