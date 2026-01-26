const footer = document.getElementById("site-footer");

const year = new Date().getFullYear();

footer.innerHTML = `
  © ${year} ⛺ SleepOutside ⛺ WDD 330 ⛺ BYU-Idaho for BYU-Pathway Worldwide Online
`;