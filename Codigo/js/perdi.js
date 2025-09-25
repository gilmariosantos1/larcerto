document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("reportar-pet-modal");
  const btn = document.getElementById("reportar-pet-btn");
  const span = document.querySelector(".modal .close");

  // abrir modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // fechar modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // fechar clicando fora do modal
  window.onclick = function(event) {
    if(event.target == modal) {
      modal.style.display = "none";
    }
  }

  // formulário submit
  const form = document.getElementById("reportar-pet-form");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Informação enviada com sucesso! Obrigado por ajudar.");
    form.reset();
    modal.style.display = "none";
  });
});
