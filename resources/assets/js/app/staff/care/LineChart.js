import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class LineChar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      ngay: [],
      huyet_ap : [],
      nhip_tho : []
    }
  }
  componentDidMount(){
    fetch('/care/line-chart/'+this.props.patient_id, {
        credentials: 'same-origin'
      })
      .then(function(response) {
        return response.json()
      }).then(function(obj) {
        //Data Response
        //console.log('Data Response: ', obj);
        let huyet_ap = [];
        let nhip_tho = [];
        let ngay = [];
        obj.map(item => {
          let dateStr = item.ngay.split('-');
          let huyet_ap_i = (item.huyet_ap === '')?null:item.huyet_ap;
          let nhip_tho_i = (item.nhip_tho === '')?null:item.nhip_tho;
          huyet_ap.push(huyet_ap_i);
          nhip_tho.push(nhip_tho_i);
          ngay.push(dateStr[2]+'/'+dateStr[1]+'/'+dateStr[0]);
        });
        this.setState({
          huyet_ap: huyet_ap,
          nhip_tho: nhip_tho,
          ngay: ngay
        });
      }.bind(this))
      .catch(function(ex) {
        //Log Error
        console.log('parsing failed', ex)
      });
  }
  render() {
    let data = {
      labels: this.state.ngay,
      datasets: [{
          label: 'Nhiệt độ',
          type:'line',
          data: this.state.huyet_ap,
          fill: false,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },{
          type: 'line',
          label: 'Mạch',
          data: this.state.nhip_tho,
          fill: false,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C',
          yAxisID: 'y-axis-1'
        }]
    };

    let options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };
    return (
      <div style={{width: '50%', margin: '0 auto'}}>
        <h3 style={{textAlign: 'center'}}>Bảng theo dõi mạch, nhiệt độ</h3>
        <Bar
          data={data}
          options={options}
        />
      </div>
    );
  }
};