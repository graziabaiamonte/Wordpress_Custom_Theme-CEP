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
     <h1>Eventi page</h1>
 
     <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
         <article class="evento">
             <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
             <p class="data-evento"><?php echo get_the_date(); ?></p>
             <div class="excerpt"><?php the_excerpt(); ?></div>
         </article>
     <?php endwhile; else : ?>
         <p>Nessun evento trovato.</p>
     <?php endif; ?>
 
 </main>
 
 <?php get_footer(); ?>
 