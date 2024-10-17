$(document).ready(function() {
    let batsHidden = localStorage.getItem('batsHidden') === 'true';
    let logoNormal = 'assets/img/asd.png'
    let logoHalloween = 'assets/img/asd2.png'
    let bannerNormal = 'assets/img/BANNER4.png';
    let bannerHalloween = 'assets/img/banner_halloween.png'; 
    let isHalloweenBanner = localStorage.getItem('isHalloweenBanner');
    let isHalloweenLogo = localStorage.getItem('isHalloweenLogo'); 


    if (isHalloweenLogo === null) {
        isHalloweenLogo = 'false';
        localStorage.setItem('isHalloweenLogo', 'false');
    }
    if (isHalloweenBanner === null) {
        isHalloweenBanner = 'false';
        localStorage.setItem('isHalloweenBanner', 'false');
    }

    // Inicializar el efecto de los murciélagos
    window.halloweenBats = $.halloweenBats({
        image: 'assets/img/bats.png',
        amount: 20,
        width: 200,
        height: 20,
        frames: 4,
        speed: 20,
        flickering: 15,
        zIndex: 10000,
        target: 'body'
    });

    if (batsHidden) {
        window.halloweenBats.hide();
        $('body, .perfil, .evento, .empresas, .trabajos, .container-empresas, .container-trabajos, nav, .caja-banner, header, .caja-evento, .miembros, .barras-contenido, .barras').css('background-color', '');
    } else {
        window.halloweenBats.show();
        $('body').css('background-color', '#ff9e00');
        $('.perfil, .container-empresas, .container-trabajos, .caja-evento').css('background-color', '#ff6d00');
        $('nav, .caja-banner, header, .miembros').css('background-color', '#1c0118');
        $('.miembros, .barras-contenido, .barras').css('background-color', '#ff6d00');
    }

    // Mostrar el banner correcto basado en el estado
    if (isHalloweenBanner === 'true') {
        $('#banner').attr('src', bannerHalloween);
        $('#halloweenTema').prop('checked', true); 
    } else {
        $('#banner').attr('src', bannerNormal);
    }

    if (isHalloweenLogo === 'true') {
        $('#logo').attr('src', logoHalloween);
        $('#logo').css({
            'top': '-6%',
        });
        $('#halloweenTema').prop('checked', true); 
    } else {
        $('#logo').attr('src', logoNormal);
        $('#logo').css({
            'top': '',
        });
    }
    
    // Evento para el botón deslizante (toggle)
    $('#halloweenTema').change(function() {
        if (this.checked) {
            window.halloweenBats.show();
            $('body').css('background-color', '#ff9e00');
            $('.perfil, .container-empresas, .container-trabajos, .caja-evento').css('background-color', '#ff6d00');
            $('nav, .caja-banner, header, .miembros').css('background-color', '#1c0118');
            $('.miembros, .barras-contenido, .barras').css('background-color', '#ff6d00');
            localStorage.setItem('batsHidden', 'false');
        } else {
            window.halloweenBats.hide();
            $('body, .barras, .barras-contenido, .miembros, .perfil, .evento, .empresas, .trabajos, .container-empresas, .container-trabajos, nav, .caja-banner, header, .caja-evento').css('background-color', '');
            localStorage.setItem('batsHidden', 'true');
        }

        // Animar el cambio de imagen del banner
        $('#banner').css('opacity', '0');
        setTimeout(function() {
            let currentBannerSrc = $('#banner').attr('src');
            if (currentBannerSrc === bannerNormal) {
                $('#banner').attr('src', bannerHalloween); 
                localStorage.setItem('isHalloweenBanner', 'true');
            } else {
                $('#banner').attr('src', bannerNormal); 
                localStorage.setItem('isHalloweenBanner', 'false');
            }
            $('#banner').css('opacity', '1');
        }, 300);

        $('#logo').css('opacity', '0'); 
        setTimeout(function() {
            let currentLogoSrc = $('#logo').attr('src');
            if (currentLogoSrc === logoNormal) {
                $('#logo').attr('src', logoHalloween); 
                $('#logo').on('load', function() { 
                    $('#logo').css({
                        'top': '-6%',
                        'opacity': '1'  
                    });
                    localStorage.setItem('isHalloweenLogo', 'true');
                });
            } else {
                $('#logo').attr('src', logoNormal); 
                $('#logo').on('load', function() { 
                    $('#logo').css({
                        'top': '',
                        'opacity': '1'  
                    });
                    localStorage.setItem('isHalloweenLogo', 'false');
                });
            }
        }, 300);
    });
});
