document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('dropDown').addEventListener('click', function () {
        var x = document.getElementsByClassName('drop-down')[0];
        if (x.style.display === "none") {
            x.classList.add('drop-down--active');
        } else {
            x.classList.remove('drop-down--active');
        }
    })
});
