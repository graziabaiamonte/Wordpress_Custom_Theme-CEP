<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Cep_2025
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="format-detection" content="telephone=no">

	<meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> -->
    
	<link rel="profile" href="https://gmpg.org/xfn/11">

<!-- precaricamento del font per fare in modo che sicuramente venga caricato nel preloader -->
<link rel="preload" href="https://www.cepsrl.it/nuovo/wp-content/uploads/2025/02/HelveticaNeueBold.woff" as="font" type="font/woff" crossorigin="anonymous">



    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" ></script>
	<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
    
    <script src="https://unpkg.com/@barba/core" defer></script>

    <script defer type="importmap">
      {
				"imports": {
					"three": "https://cdn.jsdelivr.net/npm/three@0.161/build/three.module.js",
                    "jsm/": "https://cdn.jsdelivr.net/npm/three@0.161/examples/jsm/"
        }
			}
    </script>

  
    <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" defer></script>

    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css"  rel="stylesheet" defer>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer ></script>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js" defer></script>


 
   
    <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/menu.js"></script>  
    <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/preloader.js"></script>  
     <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/verticalSlider.js"></script>  
    <!-- <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/mondo.js"></script>   -->
    <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/mondo_prova.js"></script>  
    <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/transitionPage.js"></script>  
    <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/3d_prodotto_animation.js"></script>  
    <!-- <script type="module" src="https://www.cepsrl.it/wp-content/themes/cep_2025/js/loopMarquee.js"></script>   -->





    <!-- da impostare per la top bar color di safari -->
    <meta name="theme-color" content="#303030">


 	<?php wp_head(); ?>
</head>








<body <?php body_class(); ?>>




<?php wp_body_open(); ?>


<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-THQ3EZEERN"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-THQ3EZEERN');
</script>

<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'cep_2025' ); ?></a>
    



    <header >
        <!-- logo -->
        <div>
            <a href="/">
               

                <!-- <video class="logo-1 hover-this" autoplay  playsinline loop muted>
                    <source src="https://www.cepsrl.it/wp-content/uploads/2025/02/icona-animata-b.mp4" type="video/mp4">
                </video> -->

                <img alt="logo" class="logo-1 hover-this" src="https://www.cepsrl.it/wp-content/uploads/2025/02/icona-animata-b.gif" />

                <img class="logo logo-2 hover-this" src="https://www.cepsrl.it/wp-content/uploads/2025/02/logoPayBianCo.svg" alt="logo">
            </a>
           
        </div>

        <!-- hamburger menu -->
        <div class="boxHamburger">
        <button class="hamburgerMenu hover-this" aria-label="Open Menu">
                <img class="hamburgerLogo" src="https://www.cepsrl.it/wp-content/uploads/2025/02/hamburgerBianco.svg" alt="logo cep"/>
			</button>
        </div>

        <div id="progress-bar"></div>
    </header>




    
 

    	<!-- menu popup -->
	<div class="popup" id="popup">
       
        <button class="close-btn" id="closeBtn" aria-label="Close Menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white">
                <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 1 0 1.4-1.4l-4.9-4.9 4.9-4.9a1 1 0 0 0 0-1.4z"/>
            </svg>
        </button>

        <div class="popupMain">
        <nav class="popup-menu primary">
            <ul class="listaMenu">
                <li><a class="hover-this transition-link" href="https://www.cepsrl.it/">Home</a></li>
                <li><a class="hover-this transition-link" href="https://www.cepsrl.it/about">About</a></li>
                <li><a class="hover-this transition-link" href="https://www.cepsrl.it/skpd-2/">Cabine elettriche prefabbricate in container e soluzioni integrate</a></li>
                <li><a class="hover-this transition-link" href="https://www.cepsrl.it/p67-2/">Cabine elettriche prefabbricate in CAV</a></li>
            </ul>
        </nav>

        <!-- foto -->
        <div  class="boxFotoPopup">
            <img alt="foto cep" src="https://www.cepsrl.it/wp-content/uploads/2025/03/paesaggio-scaled.webp"/>
        </div>
        </div>
        

        <!-- elementini in basso -->
        <div class="navBassa">
            <a  class="hover-this" href="mailto:info@cepsrl.it">info@cepsrl.it</a>
            <a  href="tel:+390924514486" class="hover-this">+39 0924514486</a>
            <a  href="https://www.google.com/maps/place/Fegotto+Costruzioni+S.r.l./@37.9611567,12.9121677,1098m/data=!3m2!1e3!4b1!4m6!3m5!1s0x131987683fb2ce9d:0xd7e9ac4ee2d48b5e!8m2!3d37.9611525!4d12.914748!16s%2Fg%2F1vcvlfp0?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="hover-this">Zona Industriale Fegotto, 91013, Calatafimi - Segesta (TP)</a>
        </div>
	
    </div>

    
    <div class="cursor"></div> 

    

   

