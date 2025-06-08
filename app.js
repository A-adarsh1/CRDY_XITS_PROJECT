document.addEventListener("DOMContentLoaded", function () {
  const paymentOption = document.getElementById("paymentOption");
  const qrImage = document.getElementById("qrImage");

  const qrCodes = {
    binance: "assets/bianance.PNG",
    upi: "assets/paytm.jpg",
    gpay: "assets/Gpay.jpg",
  };

  paymentOption.addEventListener("change", function () {
    const selected = paymentOption.value;
    qrImage.src = qrCodes[selected] || "";
  });
});

// discord webhook API for payment

const successBox = document.getElementById("successOverlay");
const createAccountBtn = document.getElementById("okButton");
const panelAccount = document.getElementById("createOverlay");
const createIDBtn = document.getElementById("createID");

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop form from submitting normally

  // Form reference
  const form = e.target;

  // Duration map
  const durationMap = {
    1: "1 Day",
    2: "30 Days",
    3: "Lifetime",
  };

  // Get and map values
  const panelName = form["panel-name"].value;
  const durationRaw = form["panel-duration"].value;
  const duration = durationMap[durationRaw] || durationRaw;
  const price = form["panel-price"].value;
  const paymentMethod = form["payment-method"].value;
  const email = form["email"].value;
  const txnId = form["transaction-id"].value;
  const paymentConfirmed = form["paymentConfirmed"].checked
    ? "Yes ✅"
    : "No ❌";

  // Create embed message
  const embed = {
    title: "🧾 New Payment Submission",
    description: `Owner role: <@&1316778658228076554>\nMod role: <@&1347241343818268733>`,
    color: 0x2ecc71, // Green

    fields: [
      { name: "📌 Panel Name", value: panelName, inline: false },
      { name: "🕒 Duration", value: duration, inline: false },
      { name: "💲 Price", value: price, inline: false },
      { name: "💳 Payment Method", value: paymentMethod, inline: false },
      { name: "📧 Email", value: email, inline: false },
      { name: "🧾 Transaction ID", value: txnId, inline: false },
      { name: "✅ Payment Confirmed", value: paymentConfirmed, inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  const payload = {
    embeds: [embed],
  };

  // webhook general url
  const webhookURL =
    "https://discord.com/api/webhooks/1369955732241387540/R6UVEpSjtfRBQ6VkNJvQsGl2tGaIR3bL9Xb7-s8SILPw-6qeOPb3MG74RxkxziGTSFDX";

  // Send to Discord
  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        successBox.classList.remove("d-none");
        createAccountBtn.addEventListener("click", function () {
          successBox.classList.add("d-none");
          panelAccount.classList.remove("d-none");
        });
        form.reset();
      } else {
        alert("Failed to send data to Discord.");
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// for create panel account

document.forms["create-account"].addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form reload

  const form = e.target;
  const username = form["Username"].value;
  const password = form["password"].value;
  const feedback = document.getElementById("createAccountUpdate");

  // Optional security: mask password in Discord or avoid sending
  const embed = {
    title: "🆕 New Account Created",
    description: `Owner role: <@&1316778658228076554>\nMod role: <@&1347241343818268733>`,
    color: 0x3498db, // Blue
    fields: [
      { name: "👤 Username", value: username, inline: false },
      { name: "🔒 Password", value: password, inline: true },
    ],
    timestamp: new Date().toISOString(),
  };

  const payload = {
    embeds: [embed],
  };

  const webhookURL =
    "https://discord.com/api/webhooks/1369955732241387540/R6UVEpSjtfRBQ6VkNJvQsGl2tGaIR3bL9Xb7-s8SILPw-6qeOPb3MG74RxkxziGTSFDX";

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        feedback.textContent = "Account created";
        setTimeout(function () {
          feedback.innerHTML = "";
          form.reset();
          panelAccount.classList.add("d-none");
        }, 1000);
        form.reset();
      } else {
        feedback.textContent = "Failed to send data";
      }
    })
    .catch((error) => {
      feedback.textContent = "Error: " + error.message;
    });
});
