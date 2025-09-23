document.addEventListener("DOMContentLoaded", () => {
    const botoes = document. querySelectorAll(".ver-mais-btn");
    botoes.forEach((btn) => {
        btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".blog-card");
        card.classList.toggle("expandido");
        
        //troca o texto do botão
        if (card.classList.contains("expandido")) {
            btn.textContent = "Ver Menos";
        } else {
            btn.textContent = "Ver Mais";
        }
    });
});
});
                
