<?php get_header(); ?>

<div class="content">
    <p>provaaa</p>
    <h1><?php single_cat_title(); ?></h1> <!-- Titolo della categoria -->
    <div class="posts">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <div class="post">
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <div class="post-meta"><?php the_time('F j, Y'); ?> - <?php the_category(', '); ?></div>
                    <div class="post-excerpt"><?php the_excerpt(); ?></div>
                </div>
            <?php endwhile; ?>
            <!-- Paginazione -->
            <div class="pagination">
                <?php
                the_posts_pagination( array(
                    'prev_text' => '« Precedente',
                    'next_text' => 'Successivo »',
                ) );
                ?>
            </div>
        <?php else : ?>
            <p>Nessun articolo trovato per questa categoria.</p>
        <?php endif; ?>
    </div>
</div>

<?php get_footer(); ?>
