const quizData = [
    {
        question: 'Apa yang dimaksud dengan multimedia dalam konteks pembelajaran?',
        options: [
            'Penggunaan banyak jenis media untuk menyampaikan informasi',
            'Pembelajaran satu arah menggunakan buku teks',
            'Pembelajaran tatap muka tanpa teknologi',
            'Hanya menggunakan gambar'
        ],
        answer: 'Penggunaan banyak jenis media untuk menyampaikan informasi',
    },
    {
        question: 'Elemen mana yang termasuk dalam multimedia pembelajaran?',
        options: [
            'Teks, audio, video, grafik, dan animasi',
            'Teks dan gambar saja',
            'Video saja',
            'Hanya animasi'
        ],
        answer: 'Teks, audio, video, grafik, dan animasi',
    },
    {
        question: 'Manakah keuntungan utama pembelajaran berbasis multimedia?',
        options: [
            'Hanya untuk pengajaran yang kompleks',
            'Meningkatkan keterlibatan dan pemahaman siswa',
            'Memerlukan waktu yang lebih lama',
            'Membatasi kreativitas siswa'
        ],
        answer: 'Meningkatkan keterlibatan dan pemahaman siswa',
    },
    {
        question: 'Apa peran multimedia interaktif dalam pembelajaran?',
        options: [
            'Membuat siswa hanya menerima informasi secara pasif',
            'Mengizinkan siswa berinteraksi dengan konten pembelajaran',
            'Mengurangi penggunaan teknologi dalam pembelajaran',
            'Menggantikan peran guru dalam pengajaran'
        ],
        answer: 'Mengizinkan siswa berinteraksi dengan konten pembelajaran',
    },
    {
        question: 'Platform manakah yang sering digunakan untuk membuat presentasi multimedia di kelas?',
        options: [
            'Microsoft Excel',
            'Adobe Photoshop',
            'Microsoft PowerPoint',
            'CorelDRAW'
        ],
        answer: 'Microsoft PowerPoint',
    },
    {
        question: 'Salah satu tantangan utama dalam penerapan multimedia pembelajaran adalah:',
        options: [
            'Keterbatasan materi ajar',
            'Kurangnya akses ke teknologi',
            'Terlalu banyak siswa yang menggunakan',
            'Tidak ada bahan pembelajaran berbasis multimedia'
        ],
        answer: 'Kurangnya akses ke teknologi',
    },
    {
        question: 'Apa yang dimaksud dengan "hiperteks" dalam multimedia pembelajaran?',
        options: [
            'Hanya konten berupa teks yang ditampilkan di layar',
            'Teks dengan tautan ke halaman lain atau media',
            'Gambar interaktif dengan konten multimedia',
            'Video yang menyertakan teks berjalan'
        ],
        answer: 'Teks dengan tautan ke halaman lain atau media',
    },
    {
        question: 'Karakteristik utama pembelajaran berbasis multimedia adalah:',
        options: [
            'Berpusat pada guru',
            'Bersifat linear dan tidak interaktif',
            'Interaksi dan penggunaan berbagai format media',
            'Hanya berbasis teks'
        ],
        answer: 'Interaksi dan penggunaan berbagai format media',
    },
    {
        question: 'Bagaimana pembelajaran berbasis multimedia dapat meningkatkan motivasi siswa?',
        options: [
            'Mengurangi kebutuhan membaca',
            'Menghadirkan pengalaman pembelajaran yang lebih menarik dan bervariasi',
            'Menggantikan peran guru sepenuhnya',
            'Membuat siswa lebih sedikit berinteraksi dengan teman sekelas'
        ],
        answer: 'Menghadirkan pengalaman pembelajaran yang lebih menarik dan bervariasi',
    },
    {
        question: 'Contoh alat bantu pembelajaran berbasis multimedia yang sering digunakan adalah:',
        options: [
            'Video interaktif, simulasi, dan kuis online',
            'Papan tulis tradisional dan buku cetak',
            'Brosur cetak dan pamflet',
            'Teks berbasis slide tanpa audio atau visual'
        ],
        answer: 'Video interaktif, simulasi, dan kuis online',
    }
];


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;

        if (answer === quizData[currentQuestion].answer) {
            score += 10;
        } else {
            const explanation = getExplanation(currentQuestion);
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
                explanation: explanation
            });
        }

        currentQuestion++;
        setTimeout(() => {
            if (currentQuestion < quizData.length) {
                displayQuestion();
            } else {
                displayResult();
            }
        }, 1000);
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let resultHtml = `<p>Nilai yang Anda dapatkan adalah: <strong>${score}</strong> dari <strong>${quizData.length * 10}</strong>!</p>`;
    resultHtml += `<p>Jawaban yang benar: ${quizData.length - incorrectAnswers.length}</p>`;
    resultHtml += `<p>Jawaban yang salah: ${incorrectAnswers.length}</p>`;

    if (incorrectAnswers.length > 0) {
        resultHtml += `<p>Berikut adalah tinjauan jawaban yang salah:</p>`;
        incorrectAnswers.forEach(ans => {
            resultHtml += `
            <div class="answer-box">
                <p><strong>Pertanyaan:</strong> ${ans.question}</p>
                <p><strong>Jawaban Anda:</strong> ${ans.incorrectAnswer}</p>
                <p><strong>Jawaban Benar:</strong> ${ans.correctAnswer}</p>
                <p><em>Penjelasan:</em> ${ans.explanation}</p>
            </div>`;
        });
    }

    resultContainer.innerHTML = resultHtml;
}

function getExplanation(index) {
    switch (index) {
        case 0:
            return 'Multimedia mengacu pada penggunaan kombinasi media, seperti teks, gambar, dan video.';
        case 1:
            return 'Compiler bukanlah elemen multimedia; itu digunakan untuk pemrograman.';
        case 2:
            return 'Multimedia interaktif memungkinkan pengguna untuk berinteraksi dengan berbagai elemen media, berbeda dengan media pasif.';
        case 3:
            return 'PowerPoint adalah alat umum yang digunakan untuk membuat presentasi multimedia.';
        case 4:
            return 'Multimedia biasanya melibatkan interaksi non-linear, berbeda dari konten statis.';
        default:
            return 'Tidak ada penjelasan tersedia.';
    }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
});

// Memulai kuis dengan menampilkan pertanyaan pertama
displayQuestion();
