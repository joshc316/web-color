document.addEventListener("DOMContentLoaded", () => {

    const red = document.getElementById("red");
    const green = document.getElementById("green");
    const blue = document.getElementById("blue");

    const redInput = document.getElementById("redInput");
    const greenInput = document.getElementById("greenInput");
    const blueInput = document.getElementById("blueInput");

    const colorPicker = document.getElementById("colorPicker");

    const colorBox = document.getElementById("colorBox");
    const rgbText = document.getElementById("rgbText");
    const hexText = document.getElementById("hexText");

    function clamp(value) {
        return Math.min(255, Math.max(0, value));
    }

    function updateAll(r, g, b) {
        red.value = redInput.value = r;
        green.value = greenInput.value = g;
        blue.value = blueInput.value = b;

        const rgb = `rgb(${r}, ${g}, ${b})`;
        const hex = rgbToHex(r, g, b);

        colorBox.style.backgroundColor = rgb;
        rgbText.textContent = rgb;
        hexText.textContent = hex;
        colorPicker.value = hex;
    }

    function rgbToHex(r, g, b) {
        return (
            "#" +
            Number(r).toString(16).padStart(2, "0") +
            Number(g).toString(16).padStart(2, "0") +
            Number(b).toString(16).padStart(2, "0")
        ).toUpperCase();
    }

    function hexToRgb(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

    red.addEventListener("input", () => updateAll(red.value, green.value, blue.value));
    green.addEventListener("input", () => updateAll(red.value, green.value, blue.value));
    blue.addEventListener("input", () => updateAll(red.value, green.value, blue.value));

    redInput.addEventListener("input", () =>
        updateAll(
            clamp(redInput.value),
            green.value,
            blue.value
        )
    );

    greenInput.addEventListener("input", () =>
        updateAll(
            red.value,
            clamp(greenInput.value),
            blue.value
        )
    );

    blueInput.addEventListener("input", () =>
        updateAll(
            red.value,
            green.value,
            clamp(blueInput.value)
        )
    );

    colorPicker.addEventListener("input", () => {
        const { r, g, b } = hexToRgb(colorPicker.value);
        updateAll(r, g, b);
    });

    updateAll(0, 0, 0);
});
