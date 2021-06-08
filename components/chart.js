import {LitElement, html, css} from 'lit';
import {ChallengeDataService} from './challengeDataService.js';
import '../../challenge-chart/dist/challenge-chart.js';

const dataService = new ChallengeDataService;

export class MyChallengeChart extends LitElement {
  static get properties() {
    return {
      currentData: {type: String},  // chart data & metadata
      currentChart: {type: String}, // 'small', 'medium', or 'large'
      graphPoints: {type: Array},    // array holding the graph points
    };
  }

  static get styles() {
    return css`
    #chart-title {
      text-align: center;
      font-size: 28pt;
      min-height: 34px;
    }

    #buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px;
    }

    .btn {
      margin: auto;
      align: center;
      background-color: #66bac0;
      color: #ffffff;
      padding: 10px;
    }

    .btn:hover {
      background-color: #f79b2e;
      color: #1e1d1d;
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

  /*
   * Retrieves the data set of the given size, passes the x- and y-column data
   * to a function that will convert them to the correct form, then calls
   * the functions that will generate the point table and then update the
   * page's render.
   *
   * @dataSize: a string denoting the data size, either 'small', 'medium',
   *  or 'large'
   */
  async _plotPoints(dataSize) {
    dataService.stopStreaming(); // stops stream if one is running

    this.currentChart = dataSize.toUpperCase(); // set title
    this.currentData = await dataService.getDataSet(dataSize);
    this.graphPoints = this._convertGraphPoints(this.currentData.xColumn.values,
        this.currentData.yColumn.values);
    this._generateTable(this.currentData);
  }

  /*
   * Streams data from the ChallengeDataService streaming API instead of
   * getting all the points generated at once. Streams at a rate of 5 points
   * per second, but can be changed via the first variable of the closure function.
   */
  async _streamData() {
    this.currentChart = "DISCO WORM";
    let xVals = [];
    let yVals = [];

    let self = this;
    dataService.startStreaming(5, function(x, y) {
      xVals.push(x);
      yVals.push(y);
      self.graphPoints = self._convertGraphPoints(xVals, yVals);
      self._generateTable(["x", "y"]);
    });
  }

  /*
   * Converts two arrays of x- and y-column data into the form accepted by
   * challenge-chart, {x: num, y: num}
   *
   * @xColumn: array of x-values
   * @yColumn: array of y-values
   */
  _convertGraphPoints(xColumn, yColumn) {
    let graphPoints = [];

    // ensure arrays aren't invalid
    if (xColumn && yColumn) {
      // add the corresponding points to the new array together
      for (let i = 0; i < xColumn.length; i++) {
        graphPoints.push({x: xColumn[i], y: yColumn[i]});
      }
    }

    return graphPoints;
  }

  /*
   * Generates a table containing each point of data, where one column is
   * x-values and the other is y-values.
   */
  _generateTable() {
    let tableCode = "";
    let vals = this.graphPoints;
    let xColName = "x"; // hard-coded for now
    let yColName = "y";

    // add the column titles
    tableCode += 
      "<table><tr><th>" + xColName + "</th><th>" + yColName + "</th></tr>";

    // for each point of data, add x and then y to a new row
    for (var i = 0; i < vals.length; i++) {
      tableCode +=
        "<tr><td>" + vals[i].x + "</td><td>" + vals[i].y + "</td></tr>";
    }

    // close the table
    tableCode += "</table>";

    // add the full string to the document's HTML
    document.getElementById("table-content").innerHTML = tableCode;
  }

  constructor() {
    super();
    this.currentChart = ' ';
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <div class="chart-container">
        <div id="chart-title">${this.currentChart}</div>
        <challenge-chart .data=${this.graphPoints}></challenge-chart>
        <div id="buttons">
          <button class="btn btn-lg" @click=${this._getSmall}>Small</button>
          <button class="btn btn-lg" @click=${this._getMed}>Medium</button>
          <button class="btn btn-lg" @click=${this._getLarge}>Large</button>
          <button class="btn btn-lg" @click=${this._streamData}>Stream Data</button>
        </div>
      </div>
    `;
  }
}

window.customElements.define('lit-chart', MyChallengeChart)
