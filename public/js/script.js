// ==========================================================================
// Wanderlust Airbnb Clone - Interactive Client-Side JavaScript
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. Bootstrap Custom Form Validation
  // ------------------------------------------------------------------------
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // ------------------------------------------------------------------------
  // 2. Tax Switch Toggle (Index Page)
  // ------------------------------------------------------------------------
  const taxSwitch = document.getElementById("flexSwitchCheckDefault");
  if (taxSwitch) {
    // Check saved state in localStorage
    const savedTaxState = localStorage.getItem("taxDisplayState");
    if (savedTaxState === "enabled") {
      taxSwitch.checked = true;
      toggleTaxDisplay(true);
    }

    taxSwitch.addEventListener("change", () => {
      const isChecked = taxSwitch.checked;
      toggleTaxDisplay(isChecked);
      localStorage.setItem("taxDisplayState", isChecked ? "enabled" : "disabled");
    });
  }

  function toggleTaxDisplay(showTax) {
    const taxInfoElements = document.querySelectorAll(".tax-info");
    taxInfoElements.forEach((el) => {
      el.style.display = showTax ? "inline" : "none";
    });
  }

  // ------------------------------------------------------------------------
  // 3. Wishlist Heart Toggle & LocalStorage Persistence
  // ------------------------------------------------------------------------
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");
  let savedWishlist = JSON.parse(localStorage.getItem("wanderlustWishlist") || "[]");

  wishlistButtons.forEach((btn) => {
    const listingId = btn.getAttribute("data-id");
    if (listingId && savedWishlist.includes(listingId)) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute("data-id");
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        if (id && !savedWishlist.includes(id)) {
          savedWishlist.push(id);
        }
      } else {
        savedWishlist = savedWishlist.filter((savedId) => savedId !== id);
      }

      localStorage.setItem("wanderlustWishlist", JSON.stringify(savedWishlist));
    });
  });

  // ------------------------------------------------------------------------
  // 4. Horizontal Categories Scroll Controls
  // ------------------------------------------------------------------------
  const categoriesScroll = document.querySelector(".categories-scroll");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");

  if (categoriesScroll && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener("click", () => {
      categoriesScroll.scrollBy({ left: -240, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", () => {
      categoriesScroll.scrollBy({ left: 240, behavior: "smooth" });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Image File Upload Live Preview
  // ------------------------------------------------------------------------
  const fileInput = document.querySelector("input[name='listing[image]']");
  const previewImg = document.getElementById("imagePreview");

  if (fileInput && previewImg) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImg.src = event.target.result;
          previewImg.style.display = "block";
          const placeholderText = document.getElementById("previewPlaceholder");
          if (placeholderText) placeholderText.style.display = "none";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Category Selection Buttons in Form (New / Edit)
  // ------------------------------------------------------------------------
  const categoryButtons = document.querySelectorAll(".category-select-btn");
  const categoryInput = document.getElementById("categoryInput");

  if (categoryButtons.length > 0 && categoryInput) {
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        categoryInput.value = btn.getAttribute("data-value");
      });
    });
  }

  // ------------------------------------------------------------------------
  // 7. Live Price Calculator in Show Page Booking Widget
  // ------------------------------------------------------------------------
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const guestsInput = document.getElementById("guests");

  const pricePerNightEl = document.getElementById("pricePerNightVal");
  const nightsCountEl = document.getElementById("nightsCount");
  const subtotalEl = document.getElementById("subtotalVal");
  const gstTaxEl = document.getElementById("gstTaxVal");
  const grandTotalEl = document.getElementById("grandTotalVal");
  const breakdownBox = document.getElementById("priceBreakdownBox");

  if (checkInInput && checkOutInput && pricePerNightEl && grandTotalEl) {
    const pricePerNight = parseFloat(pricePerNightEl.getAttribute("data-price")) || 0;

    const calculateTotal = () => {
      const checkInVal = checkInInput.value;
      const checkOutVal = checkOutInput.value;

      if (checkInVal && checkOutVal) {
        const d1 = new Date(checkInVal);
        const d2 = new Date(checkOutVal);

        const timeDiff = d2.getTime() - d1.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (days > 0) {
          const subtotal = days * pricePerNight;
          const gstTax = Math.round(subtotal * 0.18);
          const grandTotal = subtotal + gstTax;

          if (nightsCountEl) nightsCountEl.textContent = days;
          if (subtotalEl) subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
          if (gstTaxEl) gstTaxEl.textContent = "₹" + gstTax.toLocaleString("en-IN");
          if (grandTotalEl) grandTotalEl.textContent = "₹" + grandTotal.toLocaleString("en-IN");
          if (breakdownBox) breakdownBox.style.display = "block";
        } else {
          if (breakdownBox) breakdownBox.style.display = "none";
        }
      }
    };

    checkInInput.addEventListener("change", calculateTotal);
    checkOutInput.addEventListener("change", calculateTotal);
  }
});
