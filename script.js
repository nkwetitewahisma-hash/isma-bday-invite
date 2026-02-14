const enterBtn = document.getElementById("enterBtn");
const intro = document.querySelector(".intro");
const main = document.querySelector(".main");
const photos = document.querySelectorAll(".photo");
const lines = document.querySelectorAll(".line");
const voice = document.getElementById("voiceover");

// When user clicks "Enter"
enterBtn.addEventListener("click", () => {
    // Fade out intro
    intro.style.opacity = "0";

    // Play voice immediately after user tap (mobile-friendly)
    voice.play().catch(e => console.log("Audio play blocked:", e));

    setTimeout(() => {
        intro.style.display = "none";
        main.classList.remove("hidden");
        startSequence();
    }, 1000);
});

// Start photo sequence
function startSequence() {
    const durations = [5000, 7000, 8000]; // durations of each photo in ms
    let totalTime = 0;

    // Show photos one by one full screen
    photos.forEach((photo, index) => {
        setTimeout(() => {
            photo.classList.add("active");
        }, totalTime);

        totalTime += durations[index];
    });

    // After all photos, shrink them left and show text
    setTimeout(() => {
        photos.forEach(photo => {
            photo.style.transition = "all 1s ease";
            photo.style.transform = "translateX(-100%) scale(0.3)";
            photo.style.opacity = "0.5";
        });

        // Bring text container to front
        document.querySelector(".left").style.zIndex = "5";

        // Show text lines one by one
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add("show");
            }, index * 800); // 0.8s between lines
        });

        // Ensure voice is still playing (for mobile fallback)
        voice.play().catch(e => console.log("Audio play blocked:", e));

    }, totalTime + 500); // 0.5s after last photo
}
