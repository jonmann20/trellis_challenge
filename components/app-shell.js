import {css, html, LitElement} from 'lit-element';
import '@polymer/iron-pages';
import {ROUTES} from '../constants';
import './landing-page';
import './widget-page';
import './vehicles-page';

/*
 * AppShell is used for basic routing and to hold some simple global state.
 */
class AppShell extends LitElement {
  static properties = {
    route: {type: Number},
    accountId: {type: String, attribute: 'account-id'}
  };

  constructor() {
    super();
    this.route = ROUTES.LANDING_PAGE;
  }

  render() {
    return html`
      <iron-pages selected="${this.route}">
        <landing-page></landing-page>
        <widget-page ?active="${this.route === ROUTES.WIDGET_PAGE}"></widget-page>
        <vehicles-page ?active="${this.route === ROUTES.VEHICLES_PAGE}" id="${this.accountId}"></vehicles-page>
      </iron-pages>
    `;
  }
}

customElements.define('app-shell', AppShell);