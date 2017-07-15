import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class LineChar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      ngay: [],
      mach : [],
      nhiet_do : []
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
        let mach = [];
        let nhiet_do = [];
        let ngay = [];
        obj.map(item => {
          let dateStr = item.ngay.split('-');
          let mach_i = (item.mach === '')?null:item.mach;
          let nhiet_do_i = (item.nhiet_do === '')?null:item.nhiet_do;
          mach.push(mach_i);
          nhiet_do.push(nhiet_do_i);
          ngay.push(dateStr[2]+'/'+dateStr[1]+'/'+dateStr[0]);
        });
        this.setState({
          mach: mach,
          nhiet_do: nhiet_do,
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
          label: 'Mạch',
          type:'line',
          data: this.state.mach,
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
          label: 'Nhiệt độ',
          data: this.state.nhiet_do,
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
        <h3 style={{textAlign: 'center'}}><i className="fa fa-line-chart"></i> Bảng theo dõi mạch, nhiệt độ</h3>
        <Bar
          data={data}
          options={options}
        />
      </div>
    );
  }
};