// MainContent.js
import React, { useState, useEffect } from 'react';
import CanvasJSReact_StockChart from '@canvasjs/react-stockcharts';
import CanvasJSReact_Bar from '@canvasjs/react-charts';


import { Routes, Route } from 'react-router-dom';


import ContactList from './ContactList';
import HelpDeskList from './HelpDeskList';
import HelpDeskDetail from './HelpDeskDetail';
import HelpDeskEdit from './HelpDeskEdit';
import UserProfile from './UserProfile';

const MainContent = () => {
  const CanvasJS = CanvasJSReact_StockChart.CanvasJS;
  const CanvasJSStockChart = CanvasJSReact_StockChart.CanvasJSStockChart;
  var CanvasJSChart = CanvasJSReact_Bar.CanvasJSChart;

  //Bar chart start
  const options2 = {
    title: {
      text: "Basic Column Chart in React"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple", y: 10 },
        { label: "Orange", y: 15 },
        { label: "Banana", y: 25 },
        { label: "Mango", y: 30 },
        { label: "Grape", y: 28 }
      ]
    }]
  }
  //Bar chart end

  //StockChart chart start 
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://canvasjs.com/data/gallery/react/btcusd2017-18.json");
        const data = await response.json();

        const dps = data.map(item => ({
          x: new Date(item.date),
          y: Number(item.close)
        }));

        setDataPoints(dps);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: {
      text: "React StockChart with Spline Area Chart"
    },
    theme: "light2",
    subtitles: [{
      text: "BTC/USD"
    }],
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM DD YYYY"
        }
      },
      axisY: {
        title: "Bitcoin Price",
        prefix: "$",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "$#,###.##"
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (in USD)",
        type: "splineArea",
        color: "#3576a8",
        yValueFormatString: "$#,###.##",
        xValueFormatString: "MMM DD YYYY",
        dataPoints: dataPoints
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date("2017-05-01"),
        maximum: new Date("2018-05-01")
      }
    }
  };

  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto"
  };
  //End


  const addSymbols = (e) => {
    const suffixes = ["", "K", "M", "B"];
    let order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);

    if (order > suffixes.length - 1) order = suffixes.length - 1;

    const suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  };

  const options3 = {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Top Free Android Apps - June 2018"
    },
    axisY: {
      title: "Number of Downloads",
      labelFormatter: addSymbols,
      scaleBreaks: {
        autoCalculate: true
      }
    },
    axisX: {
      title: "Apps",
      labelAngle: 0
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "WhatsApp Messenger", y: 68206498 },
        { label: "Facebook Messenger", y: 55897709 },
        { label: "SHAREit", y: 7570438 },
        { label: "UC Browser", y: 17453224 },
        { label: "MX Player", y: 6389443 },
        { label: "Hotstar", y: 4815084 },
        { label: "Truecaller", y: 7631644 }
      ]
    }]
  };

  return (
    <>
      {/* <Routes>
        <Route path="contact-list" element={<ContactList />} />
        <Route path="helpdesk-list" element={<HelpDeskList />} />
        <Route path="helpdesk-detail/:id" element={<HelpDeskDetail />} />
        <Route path="helpdesk-edit/:id" element={<HelpDeskEdit />} />
        <Route path="user-profile/:id" element={<UserProfile />} />
      </Routes> */}
      <div className="content-page">
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="">UBold</a>
                      </li>
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Dashboard</h4>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-md-6 col-xl-3">
                <div className="card-box">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-sm bg-blue rounded">
                        <i className="fe-aperture avatar-title font-22 text-white" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-right">
                        <h3 className="text-dark my-1">
                          $<span data-plugin="counterup">12,145</span>
                        </h3>
                        <p className="text-muted mb-1 text-truncate">Income status</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-uppercase">
                      Target <span className="float-right">60%</span>
                    </h6>
                    <div className="progress progress-sm m-0">
                      <div
                        className="progress-bar bg-blue"
                        role="progressbar"
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "60%" }}
                      >
                        <span className="sr-only">60% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card-box*/}
              </div>
              {/* end col */}
              <div className="col-md-6 col-xl-3">
                <div className="card-box">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-sm bg-success rounded">
                        <i className="fe-shopping-cart avatar-title font-22 text-white" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-right">
                        <h3 className="text-dark my-1">
                          <span data-plugin="counterup">1576</span>
                        </h3>
                        <p className="text-muted mb-1 text-truncate">
                          January's Sales
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-uppercase">
                      Target <span className="float-right">49%</span>
                    </h6>
                    <div className="progress progress-sm m-0">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        aria-valuenow={49}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "49%" }}
                      >
                        <span className="sr-only">49% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card-box*/}
              </div>
              {/* end col */}
              <div className="col-md-6 col-xl-3">
                <div className="card-box">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-sm bg-warning rounded">
                        <i className="fe-bar-chart-2 avatar-title font-22 text-white" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-right">
                        <h3 className="text-dark my-1">
                          $<span data-plugin="counterup">8947</span>
                        </h3>
                        <p className="text-muted mb-1 text-truncate">Payouts</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-uppercase">
                      Target <span className="float-right">18%</span>
                    </h6>
                    <div className="progress progress-sm m-0">
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        aria-valuenow={18}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "18%" }}
                      >
                        <span className="sr-only">18% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card-box*/}
              </div>
              {/* end col */}
              <div className="col-md-6 col-xl-3">
                <div className="card-box">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-sm bg-info rounded">
                        <i className="fe-cpu avatar-title font-22 text-white" />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-right">
                        <h3 className="text-dark my-1">
                          <span data-plugin="counterup">178</span>
                        </h3>
                        <p className="text-muted mb-1 text-truncate">
                          Available Stores
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-uppercase">
                      Target <span className="float-right">74%</span>
                    </h6>
                    <div className="progress progress-sm m-0">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        aria-valuenow={74}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "74%" }}
                      >
                        <span className="sr-only">74% Complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card-box*/}
              </div>
              {/* end col */}
            </div>

            <div className="row">
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-widgets">
                      <a href="" data-toggle="reload">
                        <i className="mdi mdi-refresh" />
                      </a>
                      <a
                        data-toggle="collapse"
                        href="#cardCollpase1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="cardCollpase1"
                      >
                        <i className="mdi mdi-minus" />
                      </a>
                      <a href="" data-toggle="remove">
                        <i className="mdi mdi-close" />
                      </a>
                    </div>
                    <h4 className="header-title mb-0">Stock Market Chart</h4>
                    <div id="cardCollpase1" className="collapse pt-3 show">
                      <div className="text-center">
                        {isLoaded &&
                          <CanvasJSStockChart containerProps={containerProps} options={options} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-widgets">
                      <a href="" data-toggle="reload">
                        <i className="mdi mdi-refresh" />
                      </a>
                      <a
                        data-toggle="collapse"
                        href="#cardCollpase1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="cardCollpase1"
                      >
                        <i className="mdi mdi-minus" />
                      </a>
                      <a href="" data-toggle="remove">
                        <i className="mdi mdi-close" />
                      </a>
                    </div>
                    <h4 className="header-title mb-0">Bar Chart</h4>
                    <div id="cardCollpase1" className="collapse pt-3 show">
                      <div className="text-center">
                        <CanvasJSChart options={options2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <div className="card-widgets">
                      <a href="" data-toggle="reload">
                        <i className="mdi mdi-refresh" />
                      </a>
                      <a
                        data-toggle="collapse"
                        href="#cardCollpase1"
                        role="button"
                        aria-expanded="false"
                        aria-controls="cardCollpase1"
                      >
                        <i className="mdi mdi-minus" />
                      </a>
                      <a href="" data-toggle="remove">
                        <i className="mdi mdi-close" />
                      </a>
                    </div>
                    <h4 className="header-title mb-0">Stock Market Chart</h4>
                    <div id="cardCollpase1" className="collapse pt-3 show">
                      <div className="text-center">
                        <CanvasJSChart options={options3} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
