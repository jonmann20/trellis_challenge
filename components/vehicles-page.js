import {css, html, LitElement} from 'lit-element';
import {ROUTES} from '../constants';
import '@polymer/paper-button';
import './vehicle-list';

const BASE_URL = 'https://api.trellisconnect.com/trellis/connect/1.1.0/';
const headers = {
	'Accept': 'application/json',
	'X-API-Client-Id': 'CHALLENGE',
	'X-API-Secret-Key': 'CHALLENGESECRET'
};

class VehiclesPage extends LitElement {
  static styles = css`
    h1 {
      text-align: center;
    }

    paper-button {
      background: var(--button-bg);
      margin-bottom: 35px;
    }
  `;

  static properties = {
    active: {type: Boolean},
    id: {type: String},
    _vehicles: {type: Object},
    _loading: {type: Boolean}
  };

  updated(props) {
    if(props.has('active')) {
      if(this.active) {
        this._loading = true;
        this._vehicles = [];
        this._checkAccount();
      }
    }
  }

  render() {
    return html`
      <h1>Your Vehicles</h1>

      <paper-button
        @click="${() => document.querySelector('app-shell').route = ROUTES.LANDING_PAGE}"
        raised
      >
        Restart
      </paper-button>

      <vehicle-list ?loading="${this._loading}" .vehicles="${this._vehicles}"></vehicle-list>
    `;
  }

  async _checkAccount() {
    const accountResponse = await fetch(`${BASE_URL}account/${this.id}`, {headers});
    const accountData = await accountResponse.json();

    if(!accountData.policiesAvailable) {
      setTimeout(() => this._checkAccount(), 800);
      return;
    }

    // Load Policies
    const policiesResponse = await fetch(`${BASE_URL}account/${this.id}/policies`, {headers});
    const policiesData = await policiesResponse.json();
    //console.log(policiesData);

    this._loading = false;
    this._vehicles = policiesData.policies.flatMap(
      policy => policy.vehicles.flatMap(
        vehicle => {
          return {
            make: vehicle.make,
            model: vehicle.model,
            vin: vehicle.vin
          }
        })
      );
  }
}

customElements.define('vehicles-page', VehiclesPage);