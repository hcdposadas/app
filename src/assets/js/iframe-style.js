// When the user scrolls down 50px from the top of the document, change header opacity
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("scoll-opacity").style.background = "linear-gradient(45deg, #199f68 0%,#53cbf1 53%,#4daadb 100%)";
  } else {
    document.getElementById("scoll-opacity").style.background = "rgba(0,0,0,0)";
  }
}