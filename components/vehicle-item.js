import {css, html, LitElement} from 'lit-element';

class VehicleItem extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 128px calc(100% - 128px);
      padding: 15px;
      border-radius: 2px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      background: #fefefe;
      color: #222;
      font-size: 21px;
    }

    img {
      width: 128px;
      height: 88px;
      border-radius: 2px;
      padding-top: 25px;
      opacity: 0.8;
    }

    section {
      padding-left: 25px;
    }

    label {
      color: #666;
      font-size: 12px;
      display: block;
    }
  `;

  static properties = {
    make: {type: String},
    model: {type: String},
    vin: {type: String},
    year: {type: String}
  };

  render() {
    return html`
      <img src="https://cdn3.iconfinder.com/data/icons/car-icons-front-views/480/Sports_Car_Front_View-512.png">

      <section>
        <label>Year</label>
        ${this.year}

        <label>Make / Model</label>
        ${this.make} ${this.model}

        <label>VIN</label>
        ${this.vin}
      </section>
    `;
  }
}

customElements.define('vehicle-item', VehicleItem);