<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Cep_2025
 */

?>



	<footer id="footer">
        <!-- contatti main -->
        <div class="contattiMain">
            <div class="boxTitoloContatti">
                <h3 class="primary hover-this">Contattaci!</h3>
            </div>

            <!-- form -->
            <div class="boxForm">
                <?php echo do_shortcode('[contact-form-7 id="7b29c92" title="Modulo di contatto 1"]'); ?>
            </div>
        </div>



        <!-- parte finale footer - MOBILE -->
        <div class="parteFinale mobile">

            <div class="menuFooter">
                <a href="https://www.cepsrl.it/" class="primary">Home</a>
                <a href="https://www.cepsrl.it/about" class="primary">About</a>
                <a  href="https://www.cepsrl.it/p67-2/" class="primary">Cabine elettriche prefabbricate in CAV</a>
                <a  href="https://www.cepsrl.it/skpd-2/" class="primary">Cabine elettriche prefabbricate in container e soluzioni integrate</a>
            </div>

            <div>
               <a href="/" class="hover-this">
                <img alt="logo" src="https://www.cepsrl.it/wp-content/uploads/2025/02/logo.svg"/>
               </a>

               <div class="testoFooter">
                <p class="primary testoFooterMain">CEP SB srl - Zona Industriale<br> Contrada Fegotto snc , Calatafimi Segesta <br>91013 (TP) - P. Iva 07234580822 <br><br>Società soggetta all'attività di direzione e coordinamento della MPE Holding srl c.f.: <span id="codice_fiscale">&#48;697193&#48;828.</span></p>


                <br>
                <div class="policyFooter mobilePolicy primary">
                    <a class="hover-this policyFooter " href="https://www.cepsrl.it/privacy-policy/">Privacy Policy</a> 
                    <a class="hover-this policyFooter " href="https://www.cepsrl.it/cookie-policy/">Cookie Policy</a>
                    <a class="hover-this policyFooter " href="https://www.cepsrl.it/dichiarazione-di-accessibilita/">Dichiarazione di accessibilità</a>
                    <a class="hover-this policyFooter " target="_blank" href="https://cep.whistleblowing.net/">Whistleblowing</a>
                </div>

                <br><br>
                <p class="primary">Designed by <a class="hover-this linkCredit" target="_blank" href="www.adduma.it">Adduma</a>, with care, coffee and love. </p>
                <p class="primary">All Rights Reserved 2025 </p>
               </div>
            </div>

            
                <img alt="logo" class="fotoMainFooter desktop hover-this" src="https://www.cepsrl.it/wp-content/uploads/2025/02/mondoFooter.svg"/>
                <img alt="logo" class="fotoMainFooter mobile " src="https://www.cepsrl.it/wp-content/uploads/2025/02/mondoFooterMobile.svg"/> 
        </div>



        <!-- DESKTOP -->
        <div class="mainFooterFinale desktop">
        <a href="/" class="hover-this logoFooterSfondo">
                <img alt="dettaglio" src="https://www.cepsrl.it/wp-content/uploads/2025/02/mondoFooter.svg"/>
               </a>

            <div class="parteSinistra">
                    <div class="menuFooter primary">
                        <a href="https://www.cepsrl.it/" class="hover-this">Home</a>
                        <a href="https://www.cepsrl.it/about" class="hover-this" >About</a>
                        <a  href="https://www.cepsrl.it/skpd-2/" class="hover-this">Cabine elettriche prefabbricate in container e soluzioni integrate</a>
                        <a  href="https://www.cepsrl.it/p67-2/" class="hover-this">Cabine elettriche prefabbricate in CAV</a>
                    </div>
                
                
                
                <!-- logo -->
                <div class="logoBox">
                    <a href="/" class="hover-this">
                        <img alt="logo" src="https://www.cepsrl.it/wp-content/uploads/2025/02/logo.svg"/>
                    </a>
                </div>

                <!-- testo -->
                <div>
                    <div class="testoFooterSinistraFinale">
                    <p class="primary testoFooterMain">CEP SB srl - Zona Industriale<br> Contrada Fegotto snc , Calatafimi Segesta <br>91013 (TP) - P. Iva 07234580822</p>

                    <p class="primary">All Rights Reserved 2025 </p>
                    </div>
                </div>
                
            </div>


            <!-- parte destra -->
            <div class="parteDestra">
                    
                    <!-- privacy -->
                    <div class="primary privacyBox">
                        <a class="hover-this policyFooter " href="https://www.cepsrl.it/privacy-policy/">Privcy policy</a>
                        <a class="hover-this policyFooter " href="https://www.cepsrl.it/cookie-policy/">Cookie policy</a>
                        <a class="hover-this policyFooter " href="https://www.cepsrl.it/dichiarazione-di-accessibilita/">Dichiarazione di accessibilità</a>
                        <a class="hover-this policyFooter " target="_blank" href="https://cep.whistleblowing.net/">Whistleblowing</a>
                        
                    </div>

                    <div class="logoBox">

                    </div>

                    <!-- testo -->
                    <div class="primary testoDestraFinal">
                        <p>Societa soggetta all'attività di direzione e<br> coordinamento della MPE Holding srl<br> c.f.: 
                        <span id="codice_fiscale">&#48;697193&#48;828.</span>
                        </p>

                        <p class="primary">Designed by <a class="hover-this linkCredit" target="_blank" href="www.adduma.it">Adduma</a>, with care, coffee and love.</p>
                    </div>
            </div>

                
        </div>
		
	</footer>
</div>




<!-- <script>
  new Accordion(".accordion-container");
</script>   -->

<script>
  AOS.init();
</script>

<!-- LENIS con integrazione di scroll smooth per gli href con id -->
<script>

    // 🔁 1. Rendi `lenis` globale
let lenis;

document.addEventListener("DOMContentLoaded", () => {
  // Attiva solo se la larghezza dello schermo è maggiore di 768px (desktop)
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
    });

    // Scroll interno con ancore
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          lenis.scrollTo(targetElement);
        }
      });
    });

    // Aggiorna lenis ad ogni frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
});






window.onload = function() {
  let codici_fiscali = document.querySelectorAll("#codice_fiscale");

  codici_fiscali.forEach(function(codice_fiscale) { // Corretto: usa codice_fiscale come parametro del forEach
    codice_fiscale.addEventListener("click", function(event) {
      event.preventDefault(); // Impedisce il comportamento predefinito del click
      event.stopPropagation(); // Impedisce la propagazione dell'evento
    });
  });
};

</script>
<?php wp_footer(); ?>

</body>
</html>
