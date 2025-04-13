// OS Detection
function detectOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("Mac") !== -1) {
    $("body").addClass("macos");
  } else if (userAgent.indexOf("Windows") !== -1) {
    $("body").addClass("windows");
  } else if (
    userAgent.indexOf("Android") !== -1 ||
    userAgent.indexOf("iPhone") !== -1 ||
    userAgent.indexOf("iPad") !== -1
  ) {
    $("body").addClass("mobile");
  } else {
    $("body").addClass("other");
  }
}

// Wait for DOM to be fully loaded
$(document).ready(function () {
  $("footer").load("./footer.html");

  // Run OS detection
  detectOS();

  // Initialize toggles from localStorage
  function initializeToggles() {
    // High contrast toggle
    const highContrast = localStorage.getItem("highContrast") === "true";
    $("#contrastToggle").prop("checked", highContrast);
    $("body").toggleClass("high-contrast", highContrast);

    // Dyslexic font toggle
    const dyslexicFont = localStorage.getItem("dyslexicFont") === "true";
    $("#fontToggle").prop("checked", dyslexicFont);
    $("body").toggleClass("dyslexic-mode", dyslexicFont);
  }

  // Call initialization
  initializeToggles();

  // Font toggle event
  $("#fontToggle").on("change", function () {
    const isChecked = $(this).is(":checked");
    $("body").toggleClass("dyslexic-mode", isChecked);
    localStorage.setItem("dyslexicFont", isChecked.toString());
  });

  // Contrast toggle event
  $("#contrastToggle").on("change", function () {
    const isChecked = $(this).is(":checked");
    $("body").toggleClass("high-contrast", isChecked);
    localStorage.setItem("highContrast", isChecked.toString());

    // Apply high contrast to number comparison elements
    updateNumberItemsContrast(isChecked);
  });

  // Function to update contrast for number items
  function updateNumberItemsContrast(highContrast) {
    if (highContrast) {
      $(".number-item").addClass("high-contrast-number");
    } else {
      $(".number-item").removeClass("high-contrast-number");
    }
  }

  // Apply initial contrast setting to existing number items
  updateNumberItemsContrast($("#contrastToggle").is(":checked"));

  // Monitor for new number items being added (for dynamic content)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        // If high contrast is on, apply it to any newly added number items
        if ($("#contrastToggle").is(":checked")) {
          $(".number-item").addClass("high-contrast-number");
        }
      }
    });
  });

  // Start observing the item display for changes
  const itemDisplayEl = document.getElementById("itemDisplay");

  if (itemDisplayEl) {
    observer.observe(itemDisplayEl, {
      childList: true,
      subtree: true,
    });
  }
});
