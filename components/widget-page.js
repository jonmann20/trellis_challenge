import {css, html, LitElement} from 'lit-element';
import {ROUTES} from '../constants';
import '@polymer/paper-button';

class WidgetPage extends LitElement {
  static properties = {
    active: {type: Boolean}
  };

  constructor() {
    super();

    this._skipRedirect = false;

    this.trellis = TrellisConnect.configure({
      client_id: 'CHALLENGE',
      features: 'nostickystate',
      webhook: 'http://localhost:8080',
      onSuccess: this._onSuccess.bind(this),
      onFailure: this._onFailure,
      onClose: this._onClose.bind(this)
    });
  }

  updated(props) {
    if(props.has('active')) {
      if(this.active) {
        this.trellis.open();
      }
    }
  }

  _onSuccess(accountId, metadata) {
    this._skipRedirect = true;
    document.querySelector('app-shell').accountId = accountId;
    document.querySelector('app-shell').route = ROUTES.VEHICLES_PAGE;
  }

  _onFailure() {
    document.querySelector('app-shell').route = ROUTES.LANDING_PAGE;
  }

  _onClose() {
    if(!this._skipRedirect) {
      document.querySelector('app-shell').route = ROUTES.LANDING_PAGE;
    }

    this._skipRedirect = false;
  }
}

customElements.define('widget-page', WidgetPage);