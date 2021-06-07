import {LitElement, html, css} from 'lit';
import {ChallengeDataService} from './challengeDataService.js';
import '../../challenge-chart/dist/challenge-chart.js';

const dataService = new ChallengeDataService;

export class MyChallengeChart extends LitElement {
  static get properties() {
    return {
      /**
       * The chart currently being displayed.
       */
      currentData: {type: String},
      currentChart: {type: String},
      graphPoints: {type: Array}
    };
  }

  static get styles() {
    return css`
    #chart-title {
      text-align: center;
      font-size: 48pt;
    }`;
  }

  _getSmall() {
    this._plotPoints('small');
  }

  _getMed() {
    this._plotPoints('medium');
  }

  _getLarge() {
    this._plotPoints('large');
  }

  async _plotPoints(dataSize) {
    this.currentChart = dataSize;
    this.currentData = await dataService.getDataSet(dataSize);
    console.log(this.currentData);
    this.graphPoints = this._convertGraphPoints(this.currentData.xColumn.values,
        this.currentData.yColumn.values);
    this._generateTable();
    this.requestUpdate();
  }

  _convertGraphPoints(xColumn, yColumn) {
    let graphPoints = [];
    if (xColumn && yColumn) {
      for (let i = 0; i < xColumn.length; i++) {
        graphPoints.push({x: xColumn[i], y: yColumn[i]});
      }
    }

    return graphPoints;
  }

  _generateTable() {
    let tableCode;
    document.getElementById("table-content").innerHTML = "";

    if (this.currentData) {
      let xColVals = this.currentData.xColumn.values;
      let yColVals = this.currentData.yColumn.values;

      tableCode +=
        "<table><tr><th>" + this.currentData.xColumn.name +
        "</th><th>" + this.currentData.yColumn.name
        + "</th></tr>";

      for (var i = 0; i < xColVals.length; i++) {
        tableCode +=
          "<tr><td>" + xColVals[i] + "</td><td>"
          + yColVals[i] + "</td></tr>";
      }

      tableCode += "</table>";

      document.getElementById("table-content").innerHTML = tableCode;
    }
  }

  constructor() {
    super();
    this.currentChart = '';
  }

  render() {
    return html`
      <div class="chart-container">
        <challenge-chart .data=${this.graphPoints}></challenge-chart>
        <div id="chart-title">${this.currentChart}</div>
        <button @click=${this._getSmall}>Small</button>
        <button @click=${this._getMed}>Medium</button>
        <button @click=${this._getLarge}>Large</button>
      </div>
    `;
  }
}

window.customElements.define('lit-chart', MyChallengeChart)
