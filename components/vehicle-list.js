import {css, html, LitElement} from 'lit-element';
import '@polymer/paper-spinner/paper-spinner-lite';
import './vehicle-item';

class VehicleList extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 400px 400px;
      column-gap: 20px;
      row-gap: 20px;
    }
  `;

  static properties = {
    loading: {type: Boolean},
    vehicles: {type: Array}
  };

  render() {
    return html`
      ${this.loading ? html`
        <paper-spinner-lite active></paper-spinner-lite>
      ` : html`
        ${this.vehicles && this.vehicles.length !== 0 ? html`
          ${this.vehicles.map(vehicle => html`
            <vehicle-item
              make="${vehicle.make}"
              model="${vehicle.model}"
              vin="${vehicle.vin}"
            ></vehicle-item>
          `)}
        `: html`
          No vehicles found.
        `}
      `}
    `;
  }
}

customElements.define('vehicle-list', VehicleList);