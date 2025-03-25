document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById("Sliderquestion");
    var selector = document.getElementById("selector");
    var SelectValue = document.getElementById("SelectValue");
    var submitBtn = document.getElementById("submitBtn");
    
    // Initialize
    SelectValue.innerHTML = slider.value;
    updateSelectorPosition(slider.value);
    
    slider.oninput = function() {
        SelectValue.innerHTML = this.value;
        updateSelectorPosition(this.value);
    };
    
    function updateSelectorPosition(value) {
        var sliderWidth = slider.offsetWidth;
        var thumbPosition = (value / 100) * sliderWidth;
        selector.style.left = thumbPosition + "px";
    }
    
    submitBtn.addEventListener('click', function() {
        var userAnswer = parseInt(slider.value);
        var correctAnswer = 75; // Set your correct answer here
        
        if (userAnswer === correctAnswer) {
            // Proceed to next page
            window.location.href = "next-page.html"; // Change to your question page
        } else {
            alert("Incorrect answer. Try again!");
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        updateSelectorPosition(slider.value);
    });
});