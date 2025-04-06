//pega os elementos do html pra brincar no js, literalmente DOM
document.addEventListener('DOMContentLoaded', function () {

    //pegar os items do html
    const menuBgColorInput = document.getElementById('menu-bg-color');
    const menuTextColorInput = document.getElementById('menu-text-color');
    const menuItemBgColorInput = document.getElementById('menu-item-bg-color');
    const menuItemBorderRadiusInput = document.getElementById('menu-item-border-radius');
    const menuItemSpacingInput = document.getElementById('menu-item-spacing');
    const menuHeightInput = document.getElementById('menu-height');
    const alignItemsInput = document.getElementById('align-items');
    const addItemInput = document.getElementById('add-item');
    const addItemBtn = document.getElementById('add-item-btn');
    const clearItemsBtn = document.getElementById('clear-items-btn');
    const menuLogo = document.getElementById('menu-logo');
    const menuList = document.getElementById('menu-list');
    const toggleLogoBtn = document.getElementById('toggle-logo-btn');
    const logoFileInput = document.getElementById('logo-file');

    //variaveis que guardam alguns valores que podem ser modificados mais pra frente
    let menuItems = [];
    let logoVisible = true;
    let logoImageUrl = '';

    //função que atualiza o menu quando modificações são feitas no editor
    function updateMenu() {
        const generatedMenu = document.querySelector('.generated-menu');
        generatedMenu.style.backgroundColor = menuBgColorInput.value;
        generatedMenu.style.color = menuTextColorInput.value;

        const menuHeight = parseInt(menuHeightInput.value, 10);
        generatedMenu.style.height = `${menuHeight}px`;

        const alignment = alignItemsInput.value;
        menuList.style.justifyContent = alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start";

        const itemSpacing = Math.min(parseInt(menuItemSpacingInput.value, 10), 80);
        menuList.style.gap = `${itemSpacing}px`;

        menuList.innerHTML = '';

        //coloca a logo no site
        if (logoVisible) {
            if (logoImageUrl) {
                const img = document.createElement('img');
                img.src = logoImageUrl;
                img.classList.add('logo-img');
                img.style.maxHeight = `${menuHeight}px`;
                menuList.appendChild(img);
            } else {
                menuList.appendChild(menuLogo);
            }
        }

        //seta as configuracoes do item quando eh gerado
        menuItems.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.classList.add('menu-item');
            div.style.padding = '10px 20px';
            div.style.margin = `0`;
            div.style.borderRadius = `${menuItemBorderRadiusInput.value}px`;
            div.style.backgroundColor = menuItemBgColorInput.value;
            div.style.color = menuTextColorInput.value;

            menuList.appendChild(div);
        });
    }

    //funcao pra adicionar item quando clica no botao
    addItemBtn.addEventListener('click', function () {
        if (addItemInput.value.trim() !== '' && menuItems.length < 5) {
            menuItems.push(addItemInput.value.trim());
            addItemInput.value = '';
            updateMenu();
        }
    });

    //funcao que limpa os items quando clica no botao de limpar
    clearItemsBtn.addEventListener('click', function () {
        menuItems = [];
        updateMenu();
    });

    //funcao pra ativar e desativar o botao logo
    toggleLogoBtn.addEventListener('click', function () {
        logoVisible = !logoVisible;
        toggleLogoBtn.textContent = logoVisible ? 'Esconder Logotipo' : 'Ativar Logotipo';
        updateMenu();
    });

    //funcao pra ler a imagem que o usuario envia, tornando ela uma url
    logoFileInput.addEventListener('change', function () {
        const file = logoFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                logoImageUrl = e.target.result;
                updateMenu();
            };
            reader.readAsDataURL(file);
        }
    });

    //updater pra atualizar menu conforme user estiliza o menu, eventos de entrada
    menuBgColorInput.addEventListener('input', updateMenu);
    menuTextColorInput.addEventListener('input', updateMenu);
    menuItemBgColorInput.addEventListener('input', updateMenu);
    menuItemBorderRadiusInput.addEventListener('input', updateMenu);
    menuItemSpacingInput.addEventListener('input', updateMenu);
    menuHeightInput.addEventListener('input', updateMenu);
    alignItemsInput.addEventListener('input', updateMenu);
});
