const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const slowReadBtn = document.getElementById("slow-read-btn"); // Add this line to get the slow read button

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('API Response:', data);

            if (data.length > 0 && data[0].phonetics && data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
                const audioURL = `https:${data[0].phonetics[0].audio.replace(/^https:/, '')}`;
                console.log('Audio URL:', audioURL);

                result.innerHTML = `
                    <div class="word1">
                        <h3>${inpWord}</h3>
                        <button onclick="playsound()">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button onclick="readWordSlowly()" <i class="fas fa-volume-up"></i></button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>/${data[0].phonetic || ''}/</p>
                    </div>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </p>`;

                sound.src = audioURL;

                // Adding event listeners to handle audio loading errors
                sound.addEventListener('error', (e) => {
                    console.error('Error loading audio:', e);
                    result.innerHTML = `<h3 class="error">Error loading audio</h3>`;
                });

                sound.addEventListener('loadeddata', () => {
                    console.log('Audio loaded successfully');
                });
            } else {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

function playsound() {
    sound.play().then(() => {
        sound.playbackRate = 1.0;})
    .catch((error) => {
        console.error('Error playing sound:', error);
        result.innerHTML = `<h3 class="error">Error playing sound</h3>`;
    });
}

function readWordSlowly() {
    sound.play().then(() => {
        sound.playbackRate = 0.5;
    }).catch((error) => {
        console.error('Error playing sound:', error);
        result.innerHTML = `<h3 class="error">Error playing sound</h3>`;
    });
}


/*recipe samosa*/

function showRecipe(language) {
    const recipeContainer = document.getElementById("recipe-container");

    if (language === 'hindi') {
        recipeContainer.innerHTML = `
            <h2>समोसा रेसिपी</h2>
           <h2>सामग्री:</h2>
        <ul>
            <li>2 कप मैदा</li>
            <li>1/4 कप घी या तेल</li>
            <li>1/2 छोटी चम्मच अजवाइन</li>
            <li>1 कप उबाले हुए और कद्दुकस किए हुए आलू</li>
            <li>1/2 कप मटर</li>
            <li>1/2 कप कद्दुकस किए हुए प्याज</li>
            <li>1/2 छोटी चम्मच कद्दुकस किया हुआ अदरक</li>
            <li>1/2 छोटी चम्मच जीरा</li>
            <li>1/2 छोटी चम्मच धनिया पाउडर</li>
            <li>1/4 छोटी चम्मच हल्दी पाउडर</li>
            <li>1/2 छोटी चम्मच लाल मिर्च पाउडर</li>
            <li>1 छोटी चम्मच गरम मसाला</li>
            <li>कटा हुआ धनिया पत्ती</li>
            <li>नमक स्वाद के अनुसार</li>
            <li>तेल तलने के लिए</li>
        </ul>

        <h2>निर्देश:</h2>
        <ol>
            <li>एक मिश्रण कटोरी में मैदा, अजवाइन, और घी को मिलाएं। पानी का उपयोग करके एक कठोर आटा बनाएं।</li>
            <li>आटा ढककर 30 मिनट के लिए रखें।</li>
            <li>एक पैन में तेल गरम करें, जीरा, कद्दुकस किए हुए अदरक, और कद्दुकस किए हुए प्याज डालें।<br>प्याज सुनहरा होने तक शांत करें।</li>
            <li>मटर, उबाले हुए और कद्दुकस किए हुए आलू, और सभी मसाले डालें। कुछ मिनट के लिए पकाएं।</li>
            <li>मिश्रण को ठंडा होने दें। कटा हुआ धनिया पत्ती मिलाएं।</li>
            <li>आटा के छोटे गोले बनाएं। प्रत्येक गोले को बेलन से बेलकर बारीक चकली बनाएं।</li>
            <li>चकली को दो टुकड़ों में काटें ताकि दो आधे वृत्त बनें।</li>
            <li>एक आधे वृत्त को हाथ में लें, उसके एक कोने में पानी लगाएं और उसे चकली बनाएं।</li>
            <li>चकली के अंदर आलू का मिश्रण भरें और उसके मुख को बंद करें।</li>
            <li>तेल गरम करें और समोसे को तलें जब तक वे सुनहरे रंग के नहीं हो जाते।</li>
            <li>तले हुए समोसे को तिस्स्यू पेपर पर रखें ताकि अतिरिक्त तेल निकल सके।</li>
            <li>ठंडा होने पर मिंट चटनी या इमली की चटनी के साथ सर्व करें।</li>
        </ol>
        `;
    } else if (language === 'english') {
        recipeContainer.innerHTML = `
            <h2>Samosa Recipe</h2>
            <h2>Ingredients:</h2>
        <ul>
            <li>2 cups all-purpose flour</li>
            <li>1/4 cup ghee or oil</li>
            <li>1/2 teaspoon carom seeds (ajwain)</li>
            <li>1 cup boiled and mashed potatoes</li>
            <li>1/2 cup peas</li>
            <li>1/2 cup finely chopped onions</li>
            <li>1/2 teaspoon grated ginger</li>
            <li>1/2 teaspoon cumin seeds</li>
            <li>1/2 teaspoon coriander powder</li>
            <li>1/4 teaspoon turmeric powder</li>
            <li>1/2 teaspoon red chili powder</li>
            <li>1 teaspoon garam masala</li>
            <li>Chopped coriander leaves</li>
            <li>Salt to taste</li>
            <li>Oil for deep frying</li>
        </ul>

        <h2>Instructions:</h2>
        <ol>
            <li>In a mixing bowl, combine flour, carom seeds, and ghee. Knead into a stiff dough using water.</li>
            <li>Cover the dough and let it rest for 30 minutes.</li>
            <li>Heat oil in a pan, add cumin seeds, grated ginger, and chopped onions.<br>Sauté until onions are golden brown.</li>
            <li>Add peas, boiled mashed potatoes, and all the spices. Cook for a few minutes.</li>
            <li>Let the filling cool. Add chopped coriander leaves.</li>
            <li>Divide the dough into small balls. Roll each ball into a thin oval shape.</li>
            <li>Cut the oval into two halves to form two semi-circles.</li>
            <li>Take one semi-circle, apply water along the edges, and form a cone shape. Seal the edges.</li>
            <li>Stuff the cone with the potato filling. Seal the open edge to form a triangular shape.</li>
            <li>Heat oil in a pan. Deep fry the samosas until they turn golden brown and crispy.</li>
            <li>Remove and place them on absorbent paper to drain excess oil.</li>
            <li>Serve hot with mint chutney or tamarind sauce.</li>
        </ol>
        `;
    }
}


/*images from unsplash*/

const accessKey = '4oCaMfutjwKFoxYyFW_m5NgsqrqYAcoSTQxdYr4BXPU';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imageContainer = document.getElementById('image-container');
const loadMoreBtn = document.getElementById('load-more-btn');
let page = 1;

searchBtn.addEventListener('click', () => {
    page = 1;
    const query = searchInput.value;
    if (query) {
        searchImages(query);
    }
});

loadMoreBtn.addEventListener('click', () => {
    page++;
    const query = searchInput.value;
    if (query) {
        searchImages(query);
    }
});

function searchImages(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayImages(data.results);
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    if (page === 1) {
        imageContainer.innerHTML = '';
    }

    images.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small; // Use 'regular' size image URL
        imgElement.alt = image.alt_description || 'Image';

        const downloadLink = document.createElement('a');
        downloadLink.href = image.urls.full; // Direct link to download the image
        downloadLink.download = 'unsplash_image.jpg';
        downloadLink.innerHTML = 'Download';

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(downloadLink);

        imageContainer.appendChild(imgContainer);
    });

    if (images.length === 0 && page === 1) {
        imageContainer.innerHTML = '<p>No results found.</p>';
    }

    // Show/hide the "Load More" button based on the number of images fetched
    loadMoreBtn.style.display = images.length === 0 ? 'none' : 'block';
}


