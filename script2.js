document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.getElementById('search-btn');
    var searchInput = document.getElementById('search-input');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function () {
            var searchTerm = searchInput.value.toLowerCase();
            filterButtons(searchTerm);
        });

        searchInput.addEventListener('input', function () {
            var searchTerm = this.value.toLowerCase();
            filterButtons(searchTerm);
        });

        document.querySelectorAll('.navigate-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                var targetPage = button.getAttribute('data-target');
                window.location.href = targetPage;
            });
        });

        function filterButtons(searchTerm) {
            var buttons = document.querySelectorAll('.navigate-btn');

            buttons.forEach(function (button) {
                var buttonText = button.textContent.toLowerCase();
                var isVisible = buttonText.includes(searchTerm);
                button.style.display = isVisible ? 'inline-block' : 'none';
            });
        }
    }
});