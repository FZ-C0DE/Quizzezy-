// function startQuiz() {
//     // Aksi ketika tombol diklik, misalnya mengarahkan ke halaman kuis
//     alert("Kuis dimulai!");
// }

document.addEventListener("DOMContentLoaded", function() {
    const svgCircle = document.querySelector('.svg-animation circle');
    const svgPath = document.querySelector('.svg-animation path');

    // Animasi pada SVG dapat ditambahkan di sini jika diperlukan
    svgCircle.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
    ], {
        duration: 1500,
        iterations: Infinity
    });
});
