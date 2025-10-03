<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Cep_2025
 */

get_header(); ?>

<main class="eventi-container">
  

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="evento">
            
            <div class="immagine-evidenza">
                <?php 
                if (has_post_thumbnail()) {
                    the_post_thumbnail('full'); 
                }
                ?>
            </div>

            <div class="mainContentEventi">
                <div>
 <!-- piccola intestazione -->
 <div class="piccolaIntestazione">
                <div>
                    <img src="https://www.cepsrl.it/nuovo/wp-content/uploads/2025/02/mondino.svg" alt="decoro cep"/>
                </div>    
       
                <h6 class="primary data-evento"><?php echo get_the_date(); ?></h6>
            </div>

            <h1 class="primary"><?php the_title(); ?></h1>
            
            <div class="excerpt secondary"><?php the_content(); ?></div>
                </div>

               

            </div>
            

        </article>
    <?php endwhile; else : ?>
        <p>Nessun evento trovato.</p>
    <?php endif; ?>

</main>

<?php get_footer(); ?>
