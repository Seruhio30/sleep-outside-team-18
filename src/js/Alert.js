import AlertJson from "../public/json/alert.json" assert { type: "json" };



export default class Alert {
  constructor(mainSelector = "main") {
    this.alerts = [];
    this.mainElement = document.querySelector(mainSelector);
  }

  async init() {
    if (!this.mainElement) return;

    try {
      const response = await fetch("/json/alert.json");
      this.alerts = await response.json();
    } catch (error) {
      console.error("Error loading alerts:", error);
      return;
    }

    if (!this.alerts || this.alerts.length === 0) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    this.alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    this.mainElement.prepend(section);
  }
}
