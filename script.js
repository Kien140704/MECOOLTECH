(function initHVACCalculator() {
  const bldButtons = document.querySelectorAll(".bld-btn");
  const areaInput = document.getElementById("area-range");
  const areaVal = document.getElementById("area-val");
  const resBtu = document.getElementById("res-btu");
  const resHp = document.getElementById("res-hp");
  const resCost = document.getElementById("res-cost");
  const aestheticInputs = document.querySelectorAll('input[name="aesthetic"]');

  let currentBldFactor = 650;
  let currentAesthetic = "wall";

  bldButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bldButtons.forEach((item) => {
        item.classList.remove("active", "bg-surface-container");
        item.classList.add("bg-surface-container-low");
      });

      button.classList.add("active", "bg-surface-container");
      button.classList.remove("bg-surface-container-low");
      currentBldFactor = Number(button.dataset.factor);
      calculate();
    });
  });

  if (areaInput) {
    areaInput.addEventListener("input", (event) => {
      areaVal.textContent = event.target.value;
      calculate();
    });
  }

  aestheticInputs.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      currentAesthetic = event.target.value;
      calculate();
    });
  });

  function calculate() {
    if (!areaInput || !resBtu || !resHp || !resCost) return;

    const area = Number(areaInput.value);
    const totalBtu = Math.round(area * currentBldFactor);
    const hpVal = (totalBtu / 9000).toFixed(2);

    resBtu.textContent = totalBtu.toLocaleString("vi-VN");
    resHp.textContent = `${hpVal} HP (Ngựa)`;

    const costs = {
      wall: 8.5,
      cassette: 13.5,
      ducted: 17.5,
      vrv: 22,
    };

    const baseCostPerHp = costs[currentAesthetic];
    const lowEst = Math.round(hpVal * baseCostPerHp * 0.95);
    const highEst = Math.round(hpVal * baseCostPerHp * 1.25);

    resCost.textContent = `${lowEst} - ${highEst} Triệu`;
  }

  calculate();
})();

const quoteForm = document.getElementById("quote-form");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert(
      "Cảm ơn Quý khách! Kỹ sư trưởng MeCoolTech sẽ liên hệ tư vấn và gửi bảng dự toán chi tiết trong 15 phút.",
    );
  });
}
