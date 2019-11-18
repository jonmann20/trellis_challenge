import {css, html, LitElement} from 'lit-element';
import {ROUTES} from '../constants';
import '@polymer/paper-button';

class LandingPage extends LitElement {
  static styles = css`
    :host {
      margin: 0 auto;
      max-width: 1100px;
    }

    h1 {
      text-align: center;
    }

    paper-button {
      background: var(--button-bg);
      margin-top: 35px;
    }

    p {
      width: 500px;
    }
  `;

  render() {
    return html`
      <h1>Trellis Challenge</h1>
      <p>Welcome to Trellis!</p>
      <p>Lookup your Vehicle VIN number from the comfort of your home.  Select your current insurance provider and we'll do the rest.</p>

      <paper-button @click="${this._handleClick}" raised>
        Connect Your Auto Insurance
      </paper-button>
    `;
  }

  _handleClick() {
    document.querySelector('app-shell').route = ROUTES.WIDGET_PAGE;
  }
}

customElements.define('landing-page', LandingPage);