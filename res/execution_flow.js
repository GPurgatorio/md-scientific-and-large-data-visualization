/*            EXECUTION FLOW            */

$(document).ready(function () {

    paint_gradient_italy();

    setAllInnerHTML(values, "-")


    /*              LISTENERS               */

    // set event listeners for SVG's regions
    for (let region of regions) {

        // hovering mechanism
        region.addEventListener("mouseenter", function( event ) {
            handle_stats(region)
        }, false);

        // click mechanism
        region.addEventListener("click", function( event ) {
            toggle_focus_on_region(region)
        }, false);

        // leave mechanism
        region.addEventListener("mouseleave", function( event ) {
            handle_stats(stored_reg);
        }, false);
    }

    // set event listeners for years' buttons
    for (let btn of btns) {
        btn.addEventListener("click", function( event ) {
            update_year();
        })
    }


    // set event listeners for the dropdown menu
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });

    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
        let stat_to_plot = ($('#plot-choice').val())
        if (stat_to_plot == "1522-calls")
            show_1522(stored_reg)
        else if (stat_to_plot == "denunciations")
            show_denunce(stored_reg)
        else
            console.log("Error, unknown selected value: " + stat_to_plot)
    });

    show_stacked_bar_chart();
    show_sunburst();
})